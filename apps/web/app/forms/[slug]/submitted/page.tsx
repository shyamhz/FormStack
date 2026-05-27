"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, RotateCcw } from "lucide-react";

export default function SubmittedPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const [email, setEmail] = useState("");

    const [subscribed, setSubscribed] = useState(false);

    function handleSubscribe() {
        if (email.trim()) {
            setSubscribed(true);
        }
    }

    return (
        <div className="flex flex-col items-center text-center gap-10 py-8">
            {/* Display heading */}
            <div className="flex flex-col items-center gap-5">
                <h1 className="font-display text-[64px] leading-[1.0] tracking-[-0.03em] text-ink">
                    Thank you, Maya.
                </h1>

                {/* Ornament */}
                <div className="flex items-center gap-4 w-full max-w-[240px]">
                    <div className="flex-1 h-px bg-primary/30" />

                    <span className="font-display italic text-[18px] text-primary/50 leading-none">
                        —
                    </span>

                    <div className="flex-1 h-px bg-primary/30" />
                </div>

                <p className="text-[16px] text-muted leading-relaxed max-w-[400px]">
                    Your response has been recorded. Studio North will be in touch if needed.
                </p>
            </div>

            {/* Response summary card */}
            <div className="w-full bg-surface border border-line rounded-xl px-6 py-4">
                <div className="flex items-center justify-center gap-2.5 text-[12.5px] text-muted nums flex-wrap">
                    <span className="font-medium text-ink-2">Response #RSP-1043</span>

                    <span className="text-line-strong">·</span>

                    <span>Submitted Dec 4, 11:22 AM</span>

                    <span className="text-line-strong">·</span>

                    <span>2m 14s to complete</span>
                </div>
            </div>

            {/* Action row */}
            <div className="flex items-center gap-6 flex-wrap justify-center">
                <Link
                    href={`/forms/${params.slug}`}
                    className="flex items-center gap-2 text-[13.5px] text-ink-2 border border-line rounded-md px-4 py-2.5 hover:border-line-strong hover:text-ink transition-all"
                >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Take the form again
                </Link>

                <Link
                    href="/signup"
                    className="flex items-center gap-1.5 text-[13.5px] text-primary font-medium hover:text-primary-hover transition-colors"
                >
                    Create your own form
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-line w-full" />

            {/* Follow-up subscription card */}
            <div className="w-full bg-surface border border-line rounded-xl px-6 py-5">
                <p className="text-[13px] font-medium text-ink mb-1">
                    Want updates from Studio North?
                </p>

                <p className="text-[12.5px] text-muted mb-4">
                    Get occasional news and announcements directly in your inbox.
                </p>

                {subscribed ? (
                    <div className="flex items-center justify-center gap-2 text-[13px] text-success font-medium py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                        You're subscribed. Thanks!
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 h-10 px-3.5 bg-bg border border-line rounded-md text-[13.5px] text-ink placeholder:text-muted-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />

                        <button
                            onClick={handleSubscribe}
                            className="px-4 h-10 rounded-md bg-primary text-primary-fg text-[13px] font-medium hover:bg-primary-hover transition-colors shrink-0"
                        >
                            Subscribe
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

