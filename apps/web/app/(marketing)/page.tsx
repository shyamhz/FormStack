import type { ElementType } from "react";

import Link from "next/link";

import {
    Layers,
    GitBranch,
    BarChart3,
    Palette,
    Shield,
    Download,
    ArrowUpRight,
    ArrowRight,
} from "lucide-react";

// ─── Feature data ────────────────────────────────────────────────────────────

const features = [
    {
        icon: Layers,
        title: "Multi-page forms",
        body: "Break long forms into focused steps. Respondents see one thing at a time.",
    },

    {
        icon: GitBranch,
        title: "Conditional logic",
        body: "Show or hide fields based on previous answers. No code, no workarounds.",
    },

    {
        icon: BarChart3,
        title: "Smart analytics",
        body: "Drop-off rates, completion times, field-level heatmaps — all in one view.",
    },

    {
        icon: Palette,
        title: "Theme & branding",
        body: "Match your brand exactly. Fonts, colors, corner radii — all yours.",
    },

    {
        icon: Shield,
        title: "Spam protection",
        body: "Honeypots, rate limiting, and reCAPTCHA — without annoying your users.",
    },

    {
        icon: Download,
        title: "Export anywhere",
        body: "CSV, JSON, Webhooks, Zapier. Your data leaves when you say so.",
    },
];

const trustNames = ["Lattice Studios", "Roam Health", "North Type", "Pebble & Co", "Folio Labs"];

const showcaseForms = [
    {
        label: "Feedback",
        color: "from-primary-soft to-surface-2",
        fields: ["Overall rating", "What worked?", "Suggestions"],
    },

    {
        label: "Job application",
        color: "from-amber-soft to-surface-2",
        fields: ["Full name", "Portfolio URL", "Cover note"],
    },

    {
        label: "Event RSVP",
        color: "from-success-soft to-surface-2",
        fields: ["Name", "Attendance", "Dietary needs"],
    },

    {
        label: "Newsletter",
        color: "from-surface-3 to-surface-2",
        fields: ["Email", "Interests", "Frequency"],
    },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function MockBrowser() {
    return (
        <div
            className="w-full max-w-[720px] mx-auto rounded-xl border border-line bg-surface overflow-hidden"
            style={{
                transform: "rotate(-1.5deg)",
                boxShadow: "0 24px 60px rgba(20,23,28,0.10), 0 0 0 1px rgba(20,23,28,0.04)",
            }}
        >
            {/* Browser chrome */}
            <div className="bg-surface-2 border-b border-line px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-line-strong" />

                    <div className="w-2.5 h-2.5 rounded-full bg-line-strong" />

                    <div className="w-2.5 h-2.5 rounded-full bg-line-strong" />
                </div>

                <div className="flex-1 bg-surface rounded-md px-3 py-1 text-[11px] text-muted font-mono border border-line">
                    formstack.co/f/customer-feedback-q4
                </div>
            </div>

            {/* Form content */}
            <div className="p-8 bg-bg">
                <div className="max-w-[480px] mx-auto">
                    <div className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-1">
                        Step 1 of 3
                    </div>

                    <h2 className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink mb-1">
                        Customer feedback — Q4
                    </h2>

                    <p className="text-[13px] text-muted mb-7">
                        Takes about 3 minutes. Your answers help us improve.
                    </p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                                How satisfied are you with the product?
                            </label>

                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <div
                                        key={n}
                                        className={`w-10 h-10 rounded-lg border text-[13px] flex items-center justify-center font-medium transition-colors ${
                                            n === 4
                                                ? "bg-primary text-primary-fg border-primary"
                                                : "border-line text-muted bg-surface hover:border-line-strong"
                                        }`}
                                    >
                                        {n}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                                What's working well?
                            </label>

                            <div className="w-full h-20 rounded-lg border border-line bg-surface" />
                        </div>

                        <div>
                            <label className="block text-[12.5px] font-medium text-ink mb-1.5">
                                Your role
                            </label>

                            <div className="w-full h-9 rounded-lg border border-line bg-surface flex items-center px-3">
                                <span className="text-[12.5px] text-muted-2">Select one…</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex gap-1">
                                {[1, 2, 3].map((n) => (
                                    <div
                                        key={n}
                                        className={`h-1 rounded-full transition-all ${
                                            n === 1 ? "w-6 bg-primary" : "w-2 bg-line-strong"
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-fg text-[13px] font-medium rounded-lg">
                                Continue
                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    body,
}: {
    icon: ElementType;
    title: string;
    body: string;
}) {
    return (
        <div className="bg-surface border border-line rounded-xl p-6 hover:border-line-strong transition-colors">
            <div className="w-9 h-9 rounded-lg bg-primary-soft flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-[18px] leading-snug tracking-[-0.01em] text-ink mb-1.5">
                {title}
            </h3>

            <p className="text-[13.5px] text-muted leading-relaxed">{body}</p>
        </div>
    );
}

function ShowcaseCard({
    label,
    color,
    fields,
}: {
    label: string;
    color: string;
    fields: string[];
}) {
    return (
        <div className="bg-surface border border-line rounded-xl overflow-hidden hover:border-line-strong transition-colors group cursor-pointer">
            {/* Thumbnail */}
            <div className={`h-28 bg-gradient-to-br ${color} p-4 relative`}>
                <div className="space-y-1.5">
                    {fields.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-line-strong shrink-0" />

                            <div
                                className="h-1.5 bg-line-strong/60 rounded-full"
                                style={{
                                    width: `${40 + f.length * 3}px`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Label */}
            <div className="px-4 py-3">
                <div className="text-[13px] font-medium text-ink">{label}</div>

                <div className="text-[11.5px] text-muted mt-0.5">Template</div>
            </div>
        </div>
    );
}

// ─── Main screen ────────────────────────────────────────────────────────────

export default function MarketingPage() {
    return (
        <div className="overflow-x-hidden">
            {/* ── Hero ── */}
            <section className="relative pt-20 pb-16 dot-grid">
                <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg pointer-events-none" />

                <div className="relative max-w-[1200px] mx-auto px-6">
                    <div className="max-w-[760px]">
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-line rounded-full text-[12px] text-muted mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                            Now in public beta — free forever for hobby projects
                        </div>

                        {/* Headline */}
                        <h1
                            className="font-display text-ink leading-[0.93] tracking-[-0.03em] mb-6"
                            style={{
                                fontSize: "clamp(52px, 7vw, 88px)",
                            }}
                        >
                            Forms, designed
                            <br />
                            <span className="italic">like documents.</span>
                        </h1>

                        {/* Subhead */}
                        <p className="text-[17px] text-muted leading-relaxed max-w-[480px] mb-8">
                            Build, share, and analyze forms that actually feel made with care.
                            Multi-page, conditional logic, theme-able — without the bloat.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <Link
                                href="/signup"
                                className="px-5 py-2.5 bg-primary text-primary-fg text-[14px] font-medium rounded-lg hover:bg-primary-hover transition-colors"
                            >
                                Start for free
                            </Link>

                            <a
                                href="#features"
                                className="flex items-center gap-1.5 px-5 py-2.5 text-[14px] text-ink-2 hover:text-ink transition-colors"
                            >
                                See it in action
                                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                            </a>
                        </div>

                        {/* Trust signals */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted-2">
                            <span>No credit card</span>

                            <span className="text-line-strong">·</span>

                            <span>Free for hobby projects</span>

                            <span className="text-line-strong">·</span>

                            <span>Open source friendly</span>
                        </div>
                    </div>

                    {/* Hero visual */}
                    <div className="mt-16">
                        <MockBrowser />
                    </div>
                </div>
            </section>
        </div>
    );
}

