import type { CookieOptions } from "express";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import {
    setCookie as setCookieUtil,
    getCookie as getCookieUtil,
    clearCookie as clearCookieUtil,
} from "./utils/cookie";

export interface TRPCContextUser {
    id: string;
}

export interface TRPCContext {
    setCookie(name: string, value: string, options?: CookieOptions): void;
    getCookie(name: string): string | undefined;
    clearCookie(name: string): void;

    user?: TRPCContextUser;
}

export async function createContext({ req, res }: CreateExpressContextOptions) {
    const ctx: TRPCContext = {
        setCookie(name: string, value: string, options: CookieOptions = {}) {
            return setCookieUtil(res, name, value, options);
        },
        getCookie(name: string) {
            return getCookieUtil(req, name);
        },
        clearCookie(name: string) {
            return clearCookieUtil(res, name);
        },

        user: undefined,
    };
    return ctx;
}

export type Context = Awaited<ReturnType<typeof createContext>>;
