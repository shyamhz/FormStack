"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ChevronRight, Check } from "lucide-react";

import { BrandMark } from "@/components/branding/BrandMark";

type BuilderTab = "build" | "logic" | "design" | "settings";

const builderTabs: {
    key: BuilderTab;
    label: string;
}[] = [
    { key: "build", label: "Build" },
    { key: "logic", label: "Logic" },
    { key: "design", label: "Design" },
    { key: "settings", label: "Settings" },
];

function StatusPill({ status }: { status: "published" | "draft" }) {
    const isDraft = status === "draft";

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium ${
                isDraft ? "bg-amber-soft text-[#9F8254]" : "bg-success-soft text-success"
            }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isDraft ? "bg-amber" : "bg-success"}`} />

            {isDraft ? "Draft" : "Published"}
        </span>
    );
}

type EditableFormNameProps = {
    name: string;
    onChange: (v: string) => void;
};

function EditableFormName({ name, onChange }: EditableFormNameProps) {
    const [editing, setEditing] = useState(false);

    const [draft, setDraft] = useState(name);

    function commit() {
        setEditing(false);

        if (draft.trim()) {
            onChange(draft.trim());
        } else {
            setDraft(name);
        }
    }

    if (editing) {
        return (
            <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") commit();

                    if (e.key === "Escape") {
                        setDraft(name);
                        setEditing(false);
                    }
                }}
                className="text-[12.5px] font-medium text-ink bg-surface border border-primary rounded px-1.5 py-0.5 outline-none max-w-[220px]"
            />
        );
    }

    return (
        <button
            onClick={() => setEditing(true)}
            className="text-[12.5px] font-medium text-ink hover:text-primary transition-colors max-w-[220px] truncate"
            title="Click to rename"
        >
            {name}
        </button>
    );
}

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<BuilderTab>("build");

    const [formName, setFormName] = useState("Customer feedback — Q4");

    const [published, setPublished] = useState(true);

    return (
        <div className="h-screen flex flex-col bg-bg overflow-hidden">
            {/* Builder topbar */}
            <header className="h-[54px] shrink-0 bg-bg border-b border-line flex items-center px-5 gap-4">
                {/* Left — brand + breadcrumb */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Link href="/dashboard" className="shrink-0">
                        <BrandMark size={22} />
                    </Link>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-[12.5px] min-w-0">
                        <Link
                            href="/dashboard"
                            className="text-muted hover:text-ink transition-colors shrink-0"
                        >
                            Studio North
                        </Link>

                        <ChevronRight
                            className="w-3 h-3 text-muted-2 shrink-0"
                            strokeWidth={1.75}
                        />

                        <Link
                            href="/dashboard"
                            className="text-muted hover:text-ink transition-colors shrink-0"
                        >
                            Forms
                        </Link>

                        <ChevronRight
                            className="w-3 h-3 text-muted-2 shrink-0"
                            strokeWidth={1.75}
                        />

                        <EditableFormName name={formName} onChange={setFormName} />
                    </div>
                </div>

                {/* Center — page tabs */}
                <div className="flex items-center gap-0.5 bg-surface-2 p-0.5 rounded-lg shrink-0">
                    {builderTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-3.5 py-1.5 rounded-md text-[12px] transition-all ${
                                activeTab === tab.key
                                    ? "bg-surface text-ink font-medium shadow-[0_1px_2px_rgba(20,23,28,0.04)]"
                                    : "text-muted hover:text-ink-2"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Right — status + actions */}
                <div className="flex items-center gap-2.5 flex-1 justify-end">
                    <StatusPill status={published ? "published" : "draft"} />

                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-line rounded-md text-[12px] text-ink-2 hover:border-line-strong transition-colors">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Preview
                    </button>

                    <button
                        onClick={() => setPublished(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-fg rounded-md text-[12px] font-medium hover:bg-primary-hover transition-colors"
                    >
                        {published && <Check className="w-3.5 h-3.5" strokeWidth={2.25} />}

                        {published ? "Published" : "Publish"}
                    </button>
                </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-hidden">
                {activeTab === "build" ? (
                    children
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-bg h-full">
                        <div className="text-center">
                            <div className="font-display text-[28px] text-ink mb-2 tracking-[-0.02em]">
                                {builderTabs.find((t) => t.key === activeTab)?.label}
                            </div>

                            <div className="text-[13px] text-muted">This panel is coming soon.</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
