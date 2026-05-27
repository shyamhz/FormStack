import { publicProcedure, router } from "../../trpc";

import {
    createUserWithEmailAndPasswordInputModel,
    createUserWithEmailAndPasswordOutputModel,
} from "./model";

import { userService } from "../../services";

import { generatePath } from "../../utils/path-generator";

const getPath = generatePath("/authentication");
const TAGS = ["authentication"];

export const authRouter = router({
    createUserWithEmailAndPassword: publicProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/createUserWithEmailAndPassword"),
                tags: TAGS,
            },
        })
        .input(createUserWithEmailAndPasswordInputModel)
        .output(createUserWithEmailAndPasswordOutputModel)
        .mutation(async ({ input, ctx }) => {
            const { fullName, email, password, workspaceName } = input;

            const { id, token } = await userService.createUserWithEmailAndPassword({
                fullName,
                email,
                password,
                workspaceName,
            });

            ctx.setCookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30,
            });

            return { id };
        }),
});
