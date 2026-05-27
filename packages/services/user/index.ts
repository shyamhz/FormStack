import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";

import {
    createUserWithEmailAndPassword,
    type CreateUserWithEmailAndPassword,
    generateUserTokenPayload,
    type GenerateUserTokenPayloadType,
} from "./model";
import { env } from "../env";

export default class UserService {
    private async getUserByEmail(email: string) {
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!result || result.length === 0) {
            return null;
        } else {
            return result[0];
        }
    }

    private async generateUserToken(payload: GenerateUserTokenPayloadType) {
        const { id } = await generateUserTokenPayload.parseAsync(payload);

        const token = JWT.sign({ id }, env.JWT_SECRET);

        return { token };
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPassword) {
        const { fullName, email, password, workspaceName } =
            await createUserWithEmailAndPassword.parseAsync(payload);

        const userEmail = await this.getUserByEmail(email);

        if (userEmail) {
            throw new Error("Another user with same email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const dbInsertRestlt = await db
            .insert(usersTable)
            .values({ fullName, email, passwordHash: hashedPassword, workspaceName })
            .returning({ id: usersTable.id });

        if (!dbInsertRestlt || dbInsertRestlt.length === 0 || !dbInsertRestlt[0]?.id) {
            throw new Error("Error creating user!");
        }

        const { token } = await this.generateUserToken({ id: dbInsertRestlt[0].id });

        return {
            id: dbInsertRestlt[0].id,
            token,
        };
    }
}
