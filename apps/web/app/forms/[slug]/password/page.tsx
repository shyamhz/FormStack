"use client";

import { useState } from "react";

import type { KeyboardEvent } from "react";

import { useRouter } from "next/navigation";

import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const router = useRouter();

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(false);

    function handleUnlock() {
        if (password.trim() === "") {
            return;
        }

        // TODO: Validate password against backend
        // This should call a tRPC procedure that:
        // 1. Takes form slug and password
        // 2. Validates against the form's password hash
        // 3. Returns success/failure
        // For now, any non-empty password is accepted
        
        router.push(`/forms/${params.slug}`);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleUnlock();
        }
    }

    return (
        <div className="flex flex-col items-center text-center gap-8 py-8">
            {/* Lock icon */}
            <div className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" strokeWidth={1.75} />
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center gap-2.5">
                <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-ink">
                    This form is protected.
                </h1>

                <p className="text-[15px] text-muted leading-relaxed max-w-[360px]">
                    Enter the password to continue to the form.
                </p>
            </div>

            {/* Password input */}
            <div className="w-full max-w-[400px] flex flex-col gap-3">
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                            setError(false);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter password"
                        className={`w-full h-12 px-4 pr-11 bg-surface border rounded-md text-[15px] text-ink placeholder:text-muted-2 outline-none transition-all ${
                            error
                                ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                                : "border-line focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2 hover:text-muted transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                        ) : (
                            <Eye className="w-4 h-4" strokeWidth={1.75} />
                        )}
                    </button>
                </div>

                {error && (
                    <p className="text-[12.5px] text-danger text-left">
                        That password isn't correct. Please try again.
                    </p>
                )}

                <button
                    onClick={handleUnlock}
                    className="w-full h-12 rounded-md bg-primary text-primary-fg text-[14px] font-medium hover:bg-primary-hover transition-colors"
                >
                    Unlock
                </button>

                <p className="text-[12px] text-muted-2 mt-1">
                    Don't have the password?{" "}
                    <button className="text-muted hover:text-ink-2 underline underline-offset-2 transition-colors">
                        Contact the form owner
                    </button>
                </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-line w-full max-w-[400px]" />

            {/* Form preview card */}
            <div className="w-full max-w-[400px] bg-surface border border-line rounded-xl px-5 py-4 text-left">
                <p className="text-[10.5px] font-semibold tracking-[0.1em] text-muted-2 uppercase mb-2.5">
                    You're unlocking
                </p>

                <p className="text-[15px] font-medium text-ink leading-snug mb-1">
                    Customer feedback — Q4
                </p>

                <p className="text-[12.5px] text-muted mb-3">by Studio North</p>

                <div className="flex items-center gap-2 text-[12px] text-muted-2 nums">
                    <span>5 questions</span>

                    <span className="text-line-strong">·</span>

                    <span>~3 min</span>
                </div>
            </div>
        </div>
    );
}

