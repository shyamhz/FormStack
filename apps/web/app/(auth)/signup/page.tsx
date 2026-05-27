"use client";

import { useState } from "react";

import Link from "next/link";

import { Eye, EyeOff, Check } from "lucide-react";

import { useSignUp } from "@/hooks/api/auth";
import { useRouter } from "next/navigation";

function getPasswordStrength(password: string): {
    level: "weak" | "ok" | "strong";
    label: string;
    width: string;
    color: string;
} {
    if (password.length === 0) {
        return {
            level: "weak",
            label: "",
            width: "w-0",
            color: "bg-line",
        };
    }

    const hasUpper = /[A-Z]/.test(password);

    const hasNumber = /[0-9]/.test(password);

    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const score = [password.length >= 8, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

    if (score <= 1) {
        return {
            level: "weak",
            label: "Weak",
            width: "w-1/3",
            color: "bg-danger",
        };
    }

    if (score <= 3) {
        return {
            level: "ok",
            label: "OK",
            width: "w-2/3",
            color: "bg-amber",
        };
    }

    return {
        level: "strong",
        label: "Strong",
        width: "w-full",
        color: "bg-success",
    };
}

export default function SignupPage() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [workspaceName, setWorkspaceName] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [agreed, setAgreed] = useState(false);

    const strength = getPasswordStrength(password);

    const { mutateAsync, isPending, isSuccess, error } = useSignUp();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            console.warn("Must agree to terms");
            return;
        }
        // TODO: Call tRPC auth.signup mutation
        await mutateAsync({
            fullName,
            email,
            password,
            workspaceName,
        });

        router.push("/dashboard");
    };

    return (
        <div>
            {/* Heading */}
            <div className="mb-8">
                <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.025em] text-ink mb-1.5">
                    Start for free.
                </h1>

                <p className="text-[14px] text-muted">
                    No credit card. Free forever for hobby projects.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSignUp}>
                {/* Full name */}
                <div>
                    <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                        Full name
                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sara Chen"
                        className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[13.5px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-primary transition-colors"
                    />
                </div>

                {/* Work email */}
                <div>
                    <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                        Work email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.co"
                        className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[13.5px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-primary transition-colors"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 8 characters"
                            className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[13.5px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-primary transition-colors pr-10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-muted transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                            ) : (
                                <Eye className="w-4 h-4" strokeWidth={1.75} />
                            )}
                        </button>
                    </div>

                    {/* Strength indicator */}
                    {password.length > 0 && (
                        <div className="mt-2">
                            <div className="h-1 bg-line rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${strength.width} ${strength.color}`}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-1">
                                <span
                                    className={`text-[11px] font-medium ${
                                        strength.level === "weak"
                                            ? "text-danger"
                                            : strength.level === "ok"
                                              ? "text-amber"
                                              : "text-success"
                                    }`}
                                >
                                    {strength.label}
                                </span>

                                {strength.level === "strong" && (
                                    <span className="flex items-center gap-1 text-[11px] text-success">
                                        <Check className="w-3 h-3" strokeWidth={2.5} />
                                        Looks good
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Workspace name */}
                <div>
                    <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                        Workspace name
                    </label>

                    <input
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        placeholder="Studio North"
                        className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[13.5px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-primary transition-colors"
                    />

                    <p className="text-[11.5px] text-muted-2 mt-1">
                        This becomes your team's home in Formstack.
                    </p>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                    <button
                        type="button"
                        onClick={() => setAgreed((prev) => !prev)}
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            agreed
                                ? "bg-primary border-primary"
                                : "bg-surface border-line hover:border-line-strong"
                        }`}
                    >
                        {agreed && (
                            <Check className="w-2.5 h-2.5 text-primary-fg" strokeWidth={2.5} />
                        )}
                    </button>

                    <span className="text-[12.5px] text-muted leading-snug">
                        I agree to the{" "}
                        <a
                            href="#"
                            className="text-ink underline underline-offset-2 hover:text-primary transition-colors"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            className="text-ink underline underline-offset-2 hover:text-primary transition-colors"
                        >
                            Privacy Policy
                        </a>
                        .
                    </span>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2.5 bg-primary text-primary-fg text-[13.5px] font-medium rounded-lg hover:bg-primary-hover transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Create workspace
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-line" />

                <span className="text-[12px] text-muted-2">or</span>

                <div className="flex-1 h-px bg-line" />
            </div>

            {/* SSO buttons */}

            {/* Bottom link */}
            <p className="text-center text-[13px] text-muted mt-6">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-ink font-medium hover:text-primary transition-colors"
                >
                    Sign in
                </Link>{" "}
                →
            </p>
        </div>
    );
}
