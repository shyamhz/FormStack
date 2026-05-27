import Link from "next/link";

import { CalendarX2, ArrowRight } from "lucide-react";

type ClosedReason = "expired" | "limit" | "unpublished";

const REASON_CONFIG: Record<
    ClosedReason,
    {
        subline: string;
    }
> = {
    expired: {
        subline: "It closed on Dec 8, 2025.",
    },

    limit: {
        subline: "It reached its 150 response limit.",
    },

    unpublished: {
        subline: "It's been unpublished by the creator.",
    },
};

export default function ClosedPage({
    searchParams,
}: {
    searchParams?: {
        reason?: ClosedReason;
    };
}) {
    const reason = searchParams?.reason ?? "expired";

    const config = REASON_CONFIG[reason];

    return (
        <div className="flex flex-col items-center text-center gap-8 py-8">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center">
                <CalendarX2 className="w-6 h-6 text-muted" strokeWidth={1.75} />
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center gap-3">
                <h1 className="font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-ink">
                    This form is closed.
                </h1>

                <p className="text-[15.5px] text-muted leading-relaxed max-w-[380px]">
                    {config.subline}
                </p>
            </div>

            {/* Action row */}
            <div className="flex items-center gap-5 flex-wrap justify-center">
                <Link
                    href="/explore"
                    className="flex items-center gap-1.5 text-[13.5px] text-ink-2 border border-line rounded-md px-4 py-2.5 hover:border-line-strong hover:text-ink transition-all"
                >
                    Browse other forms
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>

                <Link
                    href="/signup"
                    className="flex items-center gap-1.5 text-[13.5px] text-primary font-medium hover:text-primary-hover transition-colors"
                >
                    Create your own
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-line w-full max-w-[400px]" />

            {/* Form context card */}
            <div className="w-full max-w-[400px] bg-surface border border-line rounded-xl px-5 py-4 text-left">
                <p className="text-[10.5px] font-semibold tracking-[0.1em] text-muted-2 uppercase mb-2.5">
                    About this form
                </p>

                <p className="text-[15px] font-medium text-ink leading-snug mb-1">
                    Customer feedback — Q4
                </p>

                <p className="text-[12.5px] text-muted">by Studio North</p>
            </div>
        </div>
    );
}

