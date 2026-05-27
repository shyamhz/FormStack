"use client";

import { useState } from "react";

import Link from "next/link";

import {
    Globe,
    Search,
    ChevronDown,
    ChevronRight,
    Download,
    ArrowUpRight,
    Filter,
    Tag,
    CheckCircle,
    Trash2,
    ChevronLeft,
} from "lucide-react";

import { mockResponses } from "@/lib/mock/responses";

import type { FormResponse } from "@/lib/mock/responses";

type TabKey = "all" | "completed" | "partial";

function StatusChip({ status }: { status: FormResponse["status"] }) {
    if (status === "completed") {
        return (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-success-soft text-success">
                Completed
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-amber-soft text-amber">
            Partial
        </span>
    );
}

function firstAnswerPreview(r: FormResponse): string {
    const first = r.answers.find((a) => !a.skipped && a.answer !== null);

    if (!first) return "—";

    if (Array.isArray(first.answer)) {
        return first.answer.join(", ");
    }

    if (typeof first.answer === "number") {
        return String(first.answer);
    }

    return String(first.answer).slice(0, 48) + (String(first.answer).length > 48 ? "…" : "");
}

export default function ResponsesPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("all");

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Calculate tab counts dynamically from mock data
    const allCount = mockResponses.length;
    const completedCount = mockResponses.filter((r) => r.status === "completed").length;
    const partialCount = mockResponses.filter((r) => r.status === "partial").length;

    // Update tabs with calculated counts
    const tabs: {
        key: TabKey;
        label: string;
        count: number;
    }[] = [
        {
            key: "all",
            label: "All",
            count: allCount,
        },
        {
            key: "completed",
            label: "Completed",
            count: completedCount,
        },
        {
            key: "partial",
            label: "Partial",
            count: partialCount,
        },
    ];

    const filtered =
        activeTab === "all" ? mockResponses : mockResponses.filter((r) => r.status === activeTab);

    const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));

    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filtered.map((r) => r.id)));
        }
    };

    const toggleRow = (rid: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);

            if (next.has(rid)) {
                next.delete(rid);
            } else {
                next.add(rid);
            }

            return next;
        });
    };

    const selCount = selectedIds.size;

    return (
        <div className="px-8 pt-8 pb-16 max-w-[1320px] mx-auto">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4 mb-7">
                <div>
                    <div className="flex items-center gap-2.5 mb-2">
                        <h1 className="font-display text-[32px] leading-[1.1] tracking-[-0.02em] text-ink">
                            Customer feedback — Q4
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-primary-soft text-primary">
                            <Globe className="w-2.5 h-2.5" strokeWidth={2.25} />
                            Public
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-surface-2 text-muted">
                            <span className="nums">247</span> responses
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-success-soft text-success">
                            <span className="nums">78%</span> completion
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 mt-1">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-md bg-surface text-[12.5px] text-ink-2 hover:border-line-strong transition-colors">
                        <Download className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                        Export CSV
                    </button>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-md bg-surface text-[12.5px] text-ink-2 hover:border-line-strong transition-colors">
                        Open form
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[12.5px] transition-all ${
                                    activeTab === t.key
                                        ? "bg-surface text-ink font-medium shadow-[0_1px_2px_rgba(20,23,28,0.04)]"
                                        : "text-muted hover:text-ink-2"
                                }`}
                            >
                                {t.label}

                                <span
                                    className={`text-[11px] nums ${
                                        activeTab === t.key ? "text-muted" : "text-muted-2"
                                    }`}
                                >
                                    {t.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-2"
                            strokeWidth={2}
                        />

                        <input
                            type="text"
                            placeholder="Search respondents…"
                            className="pl-8 pr-3 py-1.5 border border-line rounded-md bg-surface text-[12.5px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-primary w-52 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line rounded-md bg-surface text-[12px] text-ink-2 hover:border-line-strong transition-colors">
                        Nov 7 – Dec 6
                        <ChevronDown className="w-3 h-3 text-muted" strokeWidth={2} />
                    </button>

                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line rounded-md bg-surface text-[12px] text-ink-2 hover:border-line-strong transition-colors">
                        <Filter className="w-3 h-3 text-muted" strokeWidth={2} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Selection action bar */}
            {selCount > 0 && (
                <div className="flex items-center gap-3 px-4 py-2.5 mb-3 bg-primary-soft border border-primary/20 rounded-lg">
                    <span className="text-[12.5px] font-medium text-primary nums">
                        {selCount} selected
                    </span>

                    <span className="w-px h-4 bg-primary/20" />

                    <button className="flex items-center gap-1.5 text-[12px] text-primary hover:text-primary-hover transition-colors">
                        <Tag className="w-3.5 h-3.5" strokeWidth={2} />
                        Tag
                    </button>

                    <button className="flex items-center gap-1.5 text-[12px] text-primary hover:text-primary-hover transition-colors">
                        <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
                        Mark complete
                    </button>

                    <button className="flex items-center gap-1.5 text-[12px] text-primary hover:text-primary-hover transition-colors">
                        <Download className="w-3.5 h-3.5" strokeWidth={2} />
                        Export
                    </button>

                    <button className="flex items-center gap-1.5 text-[12px] text-danger hover:text-danger/80 transition-colors ml-auto">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                        Delete
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
                {/* Header */}
                <div
                    className="grid items-center px-5 py-2.5 bg-bg border-b border-line text-[10px] font-semibold text-muted-2 tracking-[0.1em]"
                    style={{
                        gridTemplateColumns: "32px 160px 200px 110px 90px 1fr 28px",
                    }}
                >
                    <div>
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleAll}
                            className="w-3.5 h-3.5 rounded accent-primary cursor-pointer"
                        />
                    </div>

                    <div>SUBMITTED</div>

                    <div>RESPONDENT</div>

                    <div>STATUS</div>

                    <div>DURATION</div>

                    <div>FIRST ANSWER</div>

                    <div />
                </div>

                {/* Rows */}
                {filtered.map((r, i) => (
                    <Link
                        key={r.id}
                        href={`/dashboard/responses/${r.id}`}
                        className={`grid items-center px-5 py-3.5 hover:bg-bg/70 transition-colors group cursor-pointer ${
                            selectedIds.has(r.id) ? "bg-primary-soft/40" : ""
                        } ${i !== filtered.length - 1 ? "border-b border-line-2" : ""}`}
                        style={{
                            gridTemplateColumns: "32px 160px 200px 110px 90px 1fr 28px",
                        }}
                    >
                        <div
                            onClick={(e) => {
                                e.preventDefault();

                                toggleRow(r.id);
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedIds.has(r.id)}
                                onChange={() => toggleRow(r.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-3.5 h-3.5 rounded accent-primary cursor-pointer"
                            />
                        </div>

                        <div className="text-[12.5px] text-muted nums">{r.submittedAt}</div>

                        <div className="text-[13px] text-ink truncate">
                            {r.respondent ?? <span className="text-muted-2 italic">Anonymous</span>}
                        </div>

                        <div>
                            <StatusChip status={r.status} />
                        </div>

                        <div className="text-[12.5px] text-muted nums">{r.duration}</div>

                        <div className="text-[12.5px] text-muted truncate pr-2">
                            {firstAnswerPreview(r)}
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity justify-self-end">
                            <ChevronRight className="w-4 h-4 text-muted-2" strokeWidth={1.75} />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-[12px] text-muted">
                <div className="nums">Showing 1–15 of 247 responses</div>

                <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded border border-line bg-surface text-muted-2 hover:border-line-strong hover:text-ink transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>

                    {[1, 2, 3, "…", 17].map((p, i) => (
                        <button
                            key={i}
                            className={`min-w-[28px] h-7 px-2 rounded border text-[12px] nums transition-colors ${
                                p === 1
                                    ? "border-primary bg-primary text-primary-fg font-medium"
                                    : "border-line bg-surface text-muted-2 hover:border-line-strong hover:text-ink"
                            }`}
                        >
                            {p}
                        </button>
                    ))}

                    <button className="p-1.5 rounded border border-line bg-surface text-muted-2 hover:border-line-strong hover:text-ink transition-colors">
                        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}

