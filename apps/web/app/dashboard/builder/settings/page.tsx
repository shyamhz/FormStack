"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Copy, Check, Globe, EyeOff, Code, ExternalLink, Layers } from "lucide-react";

import { QRCode } from "@/components/ui/QRCode";

import { Toggle, SettingToggle } from "@/components/ui/Toggle";

type SubSection = "share" | "settings" | "theme";

const NAV_ITEMS: {
    key: SubSection;
    label: string;
}[] = [
    {
        key: "share",
        label: "Share",
    },

    {
        key: "settings",
        label: "Settings",
    },

    {
        key: "theme",
        label: "Theme",
    },
];

// ── Share section ─────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch {}
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-surface text-[12.5px] text-ink-2 hover:border-line-strong transition-colors shrink-0"
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5 text-success" strokeWidth={2} />
                    Copied
                </>
            ) : (
                <>
                    <Copy className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                    Copy
                </>
            )}
        </button>
    );
}

function CodeBlock({ code }: { code: string }) {
    return (
        <div className="relative bg-bg border border-line rounded-lg p-3.5 font-mono text-[11.5px] text-ink-2 overflow-x-auto">
            <pre className="whitespace-pre-wrap break-all leading-relaxed">{code}</pre>

            <div className="absolute top-2.5 right-2.5">
                <CopyButton text={code} />
            </div>
        </div>
    );
}

function ShareSection({ formId }: { formId: string }) {
    const [visibility, setVisibility] = useState<"public" | "unlisted">("public");

    const [slug, setSlug] = useState("cf-q4-2026");

    const [embedType, setEmbedType] = useState<"inline" | "popup" | "link">("inline");

    const formUrl = `https://formstack.co/f/${slug}`;

    const embedCode = {
        inline: `<iframe\n  src="${formUrl}"\n  width="100%"\n  height="600"\n  frameborder="0"\n  style="border:none;"\n></iframe>`,

        popup: `<script src="https://formstack.co/embed.js"></script>\n<button data-formstack="${slug}">\n  Open form\n</button>`,

        link: formUrl,
    }[embedType];

    return (
        <div className="flex flex-col gap-6">
            {/* Share URL card */}
            <div className="bg-surface border border-line rounded-xl p-5">
                <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-4">
                    Form URL
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-bg border border-line rounded-lg">
                        <Globe className="w-3.5 h-3.5 text-muted-2 shrink-0" strokeWidth={2} />

                        <span className="text-[13px] text-ink font-mono truncate">{formUrl}</span>
                    </div>

                    <CopyButton text={formUrl} />

                    <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-surface text-[12.5px] text-ink-2 hover:border-line-strong transition-colors shrink-0"
                    >
                        <ExternalLink className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                        Open
                    </a>
                </div>

                {/* QR code */}
                <div className="flex items-start gap-5 pt-4 border-t border-line-2">
                    <div className="p-2 border border-line rounded-lg bg-white">
                        <QRCode size={96} />
                    </div>

                    <div className="flex-1">
                        <div className="text-[13px] font-medium text-ink mb-1">QR Code</div>

                        <div className="text-[12px] text-muted mb-3">
                            Scan to open the form on any device. Download for print or digital use.
                        </div>

                        <button className="text-[12.5px] text-primary hover:text-primary-hover transition-colors">
                            Download PNG
                        </button>
                    </div>
                </div>
            </div>

            {/* Visibility */}
            <div className="bg-surface border border-line rounded-xl p-5">
                <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-4">
                    Visibility
                </div>

                <div className="flex flex-col gap-2">
                    {[
                        {
                            key: "public" as const,
                            label: "Public",
                            icon: Globe,
                            desc: "Anyone with the link can view and submit this form.",
                        },

                        {
                            key: "unlisted" as const,
                            label: "Unlisted",
                            icon: EyeOff,
                            desc: "Only people with the direct link can access it. Not indexed.",
                        },
                    ].map(({ key, label, icon: Icon, desc }) => (
                        <button
                            key={key}
                            onClick={() => setVisibility(key)}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-colors ${
                                visibility === key
                                    ? "border-primary bg-primary-soft"
                                    : "border-line bg-bg hover:border-line-strong"
                            }`}
                        >
                            <div
                                className={`mt-0.5 p-1.5 rounded-md ${
                                    visibility === key
                                        ? "bg-primary text-primary-fg"
                                        : "bg-surface-2 text-muted"
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                            </div>

                            <div>
                                <div
                                    className={`text-[13px] font-medium ${
                                        visibility === key ? "text-primary" : "text-ink"
                                    }`}
                                >
                                    {label}
                                </div>

                                <div className="text-[12px] text-muted mt-0.5">{desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Settings section ──────────────────────────────────────────

function SettingsSection() {
    return (
        <div className="flex flex-col gap-5">
            <div className="bg-surface border border-line rounded-xl p-5">
                <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-4">
                    Visibility & access
                </div>

                <div className="flex flex-col gap-4 divide-y divide-line-2">
                    <SettingToggle
                        label="Public"
                        description="Form is visible to anyone with the link."
                        defaultChecked={true}
                    />

                    <div className="pt-4">
                        <SettingToggle
                            label="Require login"
                            description="Respondents must sign in to submit."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Theme section ─────────────────────────────────────────────

function ThemeSection() {
    return (
        <div className="bg-surface border border-line rounded-xl p-5">
            <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-4">
                Theme
            </div>

            <div className="text-[13px] text-muted">Theme customization panel.</div>
        </div>
    );
}

// ── Main screen ───────────────────────────────────────────────

export default function BuilderSettingsPage() {
    const params = useParams();

    const formId = typeof params?.id === "string" ? params.id : "";

    const [section, setSection] = useState<SubSection>("share");

    return (
        <div className="px-8 pt-8 pb-16 max-w-[1320px] mx-auto">
            {/* Header */}
            <div className="mb-7">
                <h1 className="font-display text-[32px] leading-[1.1] tracking-[-0.02em] text-ink">
                    Customer feedback — Q4
                </h1>

                <p className="text-[13px] text-muted mt-1.5">
                    Share, configure, and theme your form.
                </p>
            </div>

            <div className="flex gap-6 items-start">
                {/* Left nav */}
                <div className="w-44 shrink-0">
                    <nav className="flex flex-col gap-0.5">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => setSection(item.key)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                                    section === item.key
                                        ? "bg-primary-soft text-primary font-medium"
                                        : "text-muted hover:text-ink hover:bg-surface-2"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {section === "share" && <ShareSection formId={formId} />}

                    {section === "settings" && <SettingsSection />}

                    {section === "theme" && <ThemeSection />}
                </div>
            </div>
        </div>
    );
}

