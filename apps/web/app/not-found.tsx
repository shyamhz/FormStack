import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center text-center gap-7 py-8">
            {/* Ornament */}
            <div className="font-display italic text-[72px] leading-none text-line-strong select-none">
                ?
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center gap-3">
                <h1 className="font-display text-[38px] leading-[1.05] tracking-[-0.02em] text-ink">
                    We couldn't find that form.
                </h1>

                <p className="text-[15.5px] text-muted leading-relaxed max-w-[380px]">
                    It may have been deleted, or the link is incorrect. Double-check the URL and try
                    again.
                </p>
            </div>

            {/* Action */}
            <Link
                href="/dashboard/explore"
                className="flex items-center gap-1.5 text-[13.5px] text-primary font-medium hover:text-primary-hover transition-colors"
            >
                Go to explore
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>

            {/* Divider */}
            <div className="h-px bg-line w-full max-w-[320px]" />

            {/* Helpful note */}
            <p className="text-[12px] text-muted-2 max-w-[320px] leading-relaxed">
                If you followed a link from somewhere, the form owner may have removed or
                unpublished it.
            </p>
        </div>
    );
}

