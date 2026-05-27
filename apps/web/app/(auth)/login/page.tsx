"use client";

import { useState } from "react";

import Link from "next/link";

import { Eye, EyeOff, Github } from "lucide-react";

// Google icon as SVG
function GoogleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.67 3.67 0 0 1-1.59 2.41v2h2.57c1.5-1.38 2.4-3.42 2.4-5.87z"
                fill="#4285F4"
            />

            <path
                d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.57-2a4.8 4.8 0 0 1-7.15-2.52H.96v2.07A8 8 0 0 0 8 16z"
                fill="#34A853"
            />

            <path
                d="M3.57 9.54A4.8 4.8 0 0 1 3.32 8c0-.53.09-1.05.25-1.54V4.39H.96A8 8 0 0 0 0 8c0 1.29.31 2.51.96 3.61l2.61-2.07z"
                fill="#FBBC05"
            />

            <path
                d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.37-2.37A8 8 0 0 0 .96 4.39L3.57 6.46A4.8 4.8 0 0 1 8 3.18z"
                fill="#EA4335"
            />
        </svg>
    );
}

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    // TODO: Integrate with OAuth providers (Google, GitHub)
    const handleGoogleSignIn = () => {
        // TODO: Implement Google OAuth
        console.warn("Google OAuth not yet implemented");
    };

    const handleGithubSignIn = () => {
        // TODO: Implement GitHub OAuth
        console.warn("GitHub OAuth not yet implemented");
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call tRPC auth.login mutation
        console.warn("Form submission not yet integrated with backend");
    };

    const fillDemo = () => {
        setEmail("demo@example.com");
        setPassword("password123");
    };

    return (
        <div>
            {/* Heading */}
            <div className="mb-8">
                <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.025em] text-ink mb-1.5">
                    Welcome back.
                </h1>

                <p className="text-[14px] text-muted">Sign in to your workspace.</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSignIn}>
                {/* Email */}
                <div>
                    <label className="block text-[12.5px] font-medium text-ink mb-1.5">Email</label>

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
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[12.5px] font-medium text-ink">Password</label>

                        <a
                            href="#"
                            className="text-[12px] text-muted hover:text-ink transition-colors"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
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
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2.5 bg-primary text-primary-fg text-[13.5px] font-medium rounded-lg hover:bg-primary-hover transition-colors mt-1"
                >
                    Sign in
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-line" />

                <span className="text-[12px] text-muted-2">or</span>

                <div className="flex-1 h-px bg-line" />
            </div>

            {/* SSO buttons */}
            <div className="space-y-2.5">
                <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-surface border border-line rounded-lg text-[13.5px] text-ink hover:bg-surface-2 hover:border-line-strong transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    <GoogleIcon />
                    Continue with Google
                </button>

                <button type="button" onClick={handleGithubSignIn} className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-surface border border-line rounded-lg text-[13.5px] text-ink hover:bg-surface-2 hover:border-line-strong transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    <Github className="w-4 h-4" strokeWidth={1.75} />
                    Continue with GitHub
                </button>
            </div>

            {/* Bottom link */}
            <p className="text-center text-[13px] text-muted mt-6">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="text-ink font-medium hover:text-primary transition-colors"
                >
                    Create one
                </Link>{" "}
                →
            </p>

            {/* Development helper - fill demo form */}
            {process.env.NODE_ENV === "development" && (
                <div className="mt-6 p-4 bg-surface-2 border border-line rounded-xl">
                    <div className="text-[11px] font-semibold text-muted-2 tracking-[0.08em] uppercase mb-2.5">
                        Development only
                    </div>

                    <p className="text-[12px] text-muted mb-3">
                        Use this button to quickly fill the form in development mode.
                    </p>

                    <button
                        type="button"
                        onClick={fillDemo}
                        className="w-full py-1.5 bg-surface border border-line rounded-lg text-[12.5px] text-ink-2 font-medium hover:bg-surface-3 hover:border-line-strong transition-colors"
                    >
                        Fill demo form
                    </button>
                </div>
            )}
        </div>
    );
}

