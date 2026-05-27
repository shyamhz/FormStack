import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string().describe("Name of the user"),
    email: z.string().describe("Email of the user"),
    password: z.string().describe("Raw password of the user"),
    workspaceName: z.string().describe("Name of the workspace"),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe("User id"),
});
