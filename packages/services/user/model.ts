import { z } from "zod";

export const createUserWithEmailAndPassword = z.object({
    fullName: z.string().describe("Name of the user"),
    email: z.string().describe("Email of the user"),
    password: z.string().describe("Password of the user"),
    workspaceName: z.string().describe("Name of the workspace"),
});

export type CreateUserWithEmailAndPassword = z.infer<typeof createUserWithEmailAndPassword>;

export const generateUserTokenPayload = z.object({
    id: z.string().describe("User id"),
});

export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>;
