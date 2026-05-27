"use client";

import { useState } from "react";

import Link from "next/link";

import { Check, Minus, ChevronDown } from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const tiers = [
    {
        id: "hobby",
        name: "Hobby",
        monthlyPrice: 0,
        yearlyPrice: 0,
        tagline: "For personal projects and side experiments.",
        cta: "Start free",
        ctaVariant: "ghost" as const,
        popular: false,
        features: [
            "3 active forms",
            "100 responses / month",
            "Basic analytics",
            "Formstack branding",
            "Email notifications",
            "CSV export",
        ],
    },

    {
        id: "studio",
        name: "Studio",
        monthlyPrice: 19,
        yearlyPrice: 15,
        tagline: "For freelancers and small teams who need more.",
        cta: "Start trial",
        ctaVariant: "primary" as const,
        popular: true,
        features: [
            "Unlimited active forms",
            "5,000 responses / month",
            "Advanced analytics",
            "Remove branding",
            "Conditional logic",
            "Webhooks & Zapier",
            "Priority email support",
        ],
    },

    {
        id: "workspace",
        name: "Workspace",
        monthlyPrice: 49,
        yearlyPrice: 39,
        tagline: "For growing teams with serious data needs.",
        cta: "Start trial",
        ctaVariant: "ghost" as const,
        popular: false,
        features: [
            "Everything in Studio",
            "Unlimited responses",
            "Team collaboration",
            "Custom domains",
            "API access",
            "SSO / SAML",
            "Dedicated support",
            "SLA guarantee",
        ],
    },
];

type FeatureValue = boolean | string;

interface TableRow {
    label: string;
    hobby: FeatureValue;
    studio: FeatureValue;
    workspace: FeatureValue;
}

interface TableSection {
    section: string;
    rows: TableRow[];
}

const comparisonTable: TableSection[] = [
    {
        section: "FORMS",
        rows: [
            {
                label: "Active forms",
                hobby: "3",
                studio: "Unlimited",
                workspace: "Unlimited",
            },

            {
                label: "Multi-page forms",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "Conditional logic",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "Custom themes",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "Custom domains",
                hobby: false,
                studio: false,
                workspace: true,
            },

            {
                label: "Remove branding",
                hobby: false,
                studio: true,
                workspace: true,
            },
        ],
    },

    {
        section: "RESPONSES",
        rows: [
            {
                label: "Monthly responses",
                hobby: "100",
                studio: "5,000",
                workspace: "Unlimited",
            },

            {
                label: "File uploads",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "Response editing",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "CSV / JSON export",
                hobby: true,
                studio: true,
                workspace: true,
            },
        ],
    },

    {
        section: "INTEGRATIONS",
        rows: [
            {
                label: "Webhooks",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "Zapier",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "REST API",
                hobby: false,
                studio: false,
                workspace: true,
            },

            {
                label: "SSO / SAML",
                hobby: false,
                studio: false,
                workspace: true,
            },
        ],
    },

    {
        section: "SUPPORT",
        rows: [
            {
                label: "Community forum",
                hobby: true,
                studio: true,
                workspace: true,
            },

            {
                label: "Email support",
                hobby: false,
                studio: true,
                workspace: true,
            },

            {
                label: "Priority support",
                hobby: false,
                studio: false,
                workspace: true,
            },

            {
                label: "SLA guarantee",
                hobby: false,
                studio: false,
                workspace: true,
            },
        ],
    },
];

const faqs = [
    {
        q: "Can I cancel anytime?",
        a: "Yes. Cancel from your workspace settings with one click. You keep access until the end of your billing period — no proration, no hassle.",
    },

    {
        q: "What happens to my data if I downgrade?",
        a: "Your forms and responses stay intact. If you exceed the plan limits after downgrading, new responses are paused — not deleted. You can export everything at any time.",
    },

    {
        q: "Do you offer student or nonprofit discounts?",
        a: "Yes. Students with a .edu email get Studio free for one year. Nonprofits get 40% off any paid plan. Email us at hello@formstack.co to apply.",
    },

    {
        q: "How does the API work?",
        a: "The REST API is available on Workspace plans. It gives you full read/write access to forms, fields, and responses. Full documentation is in our developer portal.",
    },

    {
        q: "Is there a self-hosted option?",
        a: "Not yet, but it's on the roadmap. If self-hosting is a hard requirement, join the waitlist and we'll notify you when it's ready.",
    },

    {
        q: "What's included in priority support?",
        a: "Priority support means a response within 4 business hours via email, plus access to our private Slack channel for Workspace customers.",
    },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function FeatureValue({ value }: { value: FeatureValue }) {
    if (value === true) {
        return <Check className="w-4 h-4 text-success mx-auto" strokeWidth={1.75} />;
    }

    if (value === false) {
        return <Minus className="w-4 h-4 text-muted-2 mx-auto" strokeWidth={1.75} />;
    }

    return <span className="text-[13px] text-ink-2 nums">{value}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-line last:border-0">
            <button
                className="w-full flex items-center justify-between py-4 text-left gap-4"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className="text-[14px] font-medium text-ink">{q}</span>

                <ChevronDown
                    className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.75}
                />
            </button>

            {open && (
                <p className="text-[13.5px] text-muted leading-relaxed pb-4 max-w-[600px]">{a}</p>
            )}
        </div>
    );
}

// ─── Main screen ────────────────────────────────────────────────────────────

export default function PricingPage() {
    const [yearly, setYearly] = useState(false);

    return (
        <div className="pb-24">
            {/* Header */}
            <section className="pt-20 pb-16 text-center">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h1
                        className="font-display text-ink leading-[1.0] tracking-[-0.03em] mb-4"
                        style={{
                            fontSize: "clamp(40px, 5.5vw, 68px)",
                        }}
                    >
                        Pricing built like
                        <br />
                        <span className="italic">the product.</span>
                    </h1>

                    <p className="text-[16px] text-muted max-w-[400px] mx-auto mb-8">
                        Simple tiers. No seat fees. No surprise overages. Cancel whenever.
                    </p>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-1 bg-surface-2 border border-line rounded-lg p-1">
                        <button
                            onClick={() => setYearly(false)}
                            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                                !yearly
                                    ? "bg-surface text-ink shadow-[0_1px_2px_rgba(20,23,28,0.06)]"
                                    : "text-muted hover:text-ink-2"
                            }`}
                        >
                            Monthly
                        </button>

                        <button
                            onClick={() => setYearly(true)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                                yearly
                                    ? "bg-surface text-ink shadow-[0_1px_2px_rgba(20,23,28,0.06)]"
                                    : "text-muted hover:text-ink-2"
                            }`}
                        >
                            Yearly
                            <span className="text-[11px] font-semibold text-success bg-success-soft px-1.5 py-0.5 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

