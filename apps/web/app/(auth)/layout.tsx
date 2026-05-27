import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BrandLockup } from "@/components/branding/BrandMark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            {/* Left panel — calm visual */}
            <div className="hidden lg:flex lg:w-[45%] relative flex-col bg-surface-2 dot-grid overflow-hidden">
                {/* Subtle overlay to soften the dot grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-bg/60 via-transparent to-primary-soft/20 pointer-events-none" />

                {/* Brand top-left */}
                <div className="relative z-10 p-8">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <BrandLockup />
                    </Link>
                </div>

                {/* Quote — centered */}
                <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-12 pb-16">
                    <blockquote className="font-display text-[32px] leading-[1.2] tracking-[-0.02em] text-ink max-w-[340px]">
                        "The fastest way to ask, the calmest way to answer."
                    </blockquote>

                    <p className="mt-5 text-[13px] text-muted max-w-[280px] leading-relaxed">
                        Formstack helps teams collect what they need — without the noise.
                    </p>

                    {/* Decorative form mock */}
                    <div
                        className="mt-12 w-full max-w-[320px] bg-surface rounded-xl border border-line p-5"
                        style={{
                            boxShadow: "0 16px 40px rgba(20,23,28,0.08)",
                        }}
                    >
                        <div className="text-[11px] font-semibold text-muted-2 tracking-[0.08em] uppercase mb-3">
                            Customer feedback — Q4
                        </div>

                        <div className="space-y-3">
                            <div>
                                <div className="text-[11px] text-muted mb-1">
                                    How satisfied are you?
                                </div>

                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <div
                                            key={n}
                                            className={`w-7 h-7 rounded-md border text-[11px] flex items-center justify-center font-medium ${
                                                n === 4
                                                    ? "bg-primary text-primary-fg border-primary"
                                                    : "border-line text-muted bg-surface"
                                            }`}
                                        >
                                            {n}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="text-[11px] text-muted mb-1">
                                    What can we improve?
                                </div>

                                <div className="h-12 rounded-md border border-line bg-bg" />
                            </div>

                            <div className="h-7 w-20 rounded-md bg-primary opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Back link */}
                <div className="relative z-10 p-8 pt-0">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-[12.5px] text-muted hover:text-ink transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Back to home
                    </Link>
                </div>
            </div>

            {/* Right panel — auth form */}
            <div className="flex-1 flex flex-col bg-bg">
                {/* Mobile brand + back */}
                <div className="lg:hidden flex items-center justify-between p-5 border-b border-line">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <BrandLockup />
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-1 text-[12.5px] text-muted hover:text-ink transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Home
                    </Link>
                </div>

                {/* Centered content */}
                <div className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-[400px]">{children}</div>
                </div>
            </div>
        </div>
    );
}

