"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
    Globe,
    EyeOff,
    Lock,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    ArrowUpRight,
    LayoutList,
    LayoutGrid,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { forms, statusDotColor, workspaceStats } from "@/lib/mock/forms";

type Filter = "all" | "published" | "draft" | "unlisted" | "archived";

const filterTabs: {
    key: Filter;
    label: string;
    count?: number;
}[] = [
    {
        key: "all",
        label: "All",
        count: forms.length,
    },
    {
        key: "published",
        label: "Published",
        count: forms.filter((f) => f.status === "published" && f.visibility === "public").length,
    },
    {
        key: "draft",
        label: "Draft",
        count: forms.filter((f) => f.status === "draft").length,
    },
    {
        key: "unlisted",
        label: "Unlisted",
        count: forms.filter((f) => f.visibility === "unlisted").length,
    },
    {
        key: "archived",
        label: "Archived",
        count: forms.filter((f) => f.status === "archived").length,
    },
];

export default function DashboardPage() {
    const [filter, setFilter] = useState<Filter>("all");

    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    const filteredForms = useMemo(() => {
        if (filter === "all") return forms;

        if (filter === "published") {
            return forms.filter((f) => f.status === "published" && f.visibility === "public");
        }

        if (filter === "draft") {
            return forms.filter((f) => f.status === "draft");
        }

        if (filter === "unlisted") {
            return forms.filter((f) => f.visibility === "unlisted");
        }

        if (filter === "archived") {
            return forms.filter((f) => f.status === "archived");
        }

        return forms;
    }, [filter]);

    return (
        <div className="px-8 pt-8 pb-16 max-w-[1320px] mx-auto">
            {/* Greeting */}
            <div className="flex items-end justify-between mb-7 gap-4">
                <div>
                    <h1 className="font-display text-[44px] leading-[1.05] tracking-[-0.02em] text-ink">
                        Good morning, Sara.
                    </h1>

                    <p className="text-[13px] text-muted mt-2">
                        <span className="nums">7</span> forms · <span className="nums">1,592</span>{" "}
                        responses this month ·{" "}
                        <span className="text-success font-medium nums">+18.4%</span> vs last month
                    </p>
                </div>

                <Select defaultValue="30d">
                    <SelectTrigger className="w-[140px] h-[36px] bg-surface border border-line rounded-md text-[12px] text-ink shadow-none focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent
                        align="end"
                        className="min-w-[140px] bg-surface border border-line rounded-xl shadow-[0_10px_30px_rgba(20,23,28,0.08)] p-1"
                    >
                        <SelectItem
                            value="7d"
                            className="text-[12.5px] text-ink rounded-md focus:bg-surface-2 focus:text-ink"
                        >
                            Last 7 days
                        </SelectItem>

                        <SelectItem
                            value="30d"
                            className="text-[12.5px] text-ink rounded-md focus:bg-surface-2 focus:text-ink"
                        >
                            Last 30 days
                        </SelectItem>

                        <SelectItem
                            value="90d"
                            className="text-[12.5px] text-ink rounded-md focus:bg-surface-2 focus:text-ink"
                        >
                            Last 90 days
                        </SelectItem>

                        <SelectItem
                            value="1y"
                            className="text-[12.5px] text-ink rounded-md focus:bg-surface-2 focus:text-ink"
                        >
                            Last year
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-7">
                <StatCard
                    label="Active forms"
                    value="7"
                    delta={`+${workspaceStats.activeFormsDelta}`}
                    deltaDirection="up"
                />

                <StatCard
                    label="Responses"
                    value="1,592"
                    delta={`+${workspaceStats.responsesDelta}%`}
                    deltaDirection="up"
                />

                <StatCard
                    label="Completion"
                    value="78"
                    unit="%"
                    delta={`${workspaceStats.completionDelta}%`}
                    deltaDirection="down"
                />

                <StatCard label="Avg. time" value={workspaceStats.avgTime} unit="min" spark />
            </div>

            {/* Filter bar */}
            <div className="flex items-center justify-between mb-3.5 gap-3">
                <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg">
                    {filterTabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setFilter(t.key)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[12.5px] transition-all ${
                                filter === t.key
                                    ? "bg-surface text-ink font-medium shadow-[0_1px_2px_rgba(20,23,28,0.04)]"
                                    : "text-muted hover:text-ink-2"
                            }`}
                        >
                            {t.label}

                            {t.count !== undefined && t.count > 0 && (
                                <span
                                    className={`text-[11px] nums ${
                                        filter === t.key ? "text-muted" : "text-muted-2"
                                    }`}
                                >
                                    {t.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Select defaultValue="edited">
                        <SelectTrigger className="w-[160px] h-[34px] border-line bg-surface text-[12px] text-ink-2">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="edited">Last edited</SelectItem>
                            <SelectItem value="responses">Most responses</SelectItem>
                            <SelectItem value="created">Newest created</SelectItem>
                            <SelectItem value="name">Alphabetical</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center bg-surface border border-line rounded-md p-0.5">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded transition-colors ${
                                viewMode === "list"
                                    ? "bg-surface-2 text-ink"
                                    : "text-muted hover:text-ink"
                            }`}
                            title="List view"
                        >
                            <LayoutList className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>

                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded transition-colors ${
                                viewMode === "grid"
                                    ? "bg-surface-2 text-ink"
                                    : "text-muted hover:text-ink"
                            }`}
                            title="Grid view"
                        >
                            <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Forms list */}
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
                <div
                    className="grid items-center px-5 py-2.5 bg-bg border-b border-line text-[10px] font-semibold text-muted-2 tracking-[0.1em]"
                    style={{
                        gridTemplateColumns: "1fr 140px 160px 140px 40px",
                    }}
                >
                    <div>FORM</div>
                    <div>VISIBILITY</div>
                    <div>RESPONSES</div>
                    <div>LAST EDITED</div>
                    <div></div>
                </div>

                {filteredForms.map((f, i) => (
                    <Link
                        key={f.id}
                        href="/dashboard/builder"
                        className={`grid items-center px-5 py-3.5 hover:bg-bg/70 transition-colors group ${
                            i !== filteredForms.length - 1 ? "border-b border-line-2" : ""
                        }`}
                        style={{
                            gridTemplateColumns: "1fr 140px 160px 140px 40px",
                        }}
                    >
                        <div className="min-w-0">
                            <div className="flex items-center gap-2.5">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDotColor(
                                        f.status,
                                    )}`}
                                />

                                <span className="text-[13.5px] font-medium text-ink truncate">
                                    {f.name}
                                </span>

                                {f.status === "draft" && <Chip color="amber">DRAFT</Chip>}

                                {f.status === "archived" && <Chip color="muted">ARCHIVED</Chip>}

                                {f.fieldsCount > 0 && f.status !== "draft" && (
                                    <Chip color="neutral">{f.fieldsCount} fields</Chip>
                                )}

                                {f.locked && (
                                    <Chip
                                        color="danger"
                                        icon={<Lock className="w-2.5 h-2.5" strokeWidth={2.25} />}
                                    >
                                        Locked
                                    </Chip>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-[11.5px] text-muted ml-4 mt-1">
                                {f.slug ? (
                                    <>
                                        <span className="font-mono">formstack.co/f/{f.slug}</span>

                                        {f.closesAt && (
                                            <>
                                                <span className="text-muted-2">·</span>

                                                <span>closes {f.closesAt}</span>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <span>Not published yet</span>
                                )}
                            </div>
                        </div>

                        <div className="text-[12px] text-ink-2">
                            {f.visibility === "public" && (
                                <span className="flex items-center gap-1.5">
                                    <Globe className="w-3 h-3 text-primary" strokeWidth={2} />
                                    Public
                                </span>
                            )}

                            {f.visibility === "unlisted" && (
                                <span className="flex items-center gap-1.5">
                                    <EyeOff className="w-3 h-3 text-muted-2" strokeWidth={2} />
                                    Unlisted
                                </span>
                            )}

                            {f.visibility === null && <span className="text-muted-2">—</span>}
                        </div>

                        <div className="flex items-baseline gap-1.5 nums">
                            <span
                                className={`text-[14px] ${
                                    f.responses === 0 ? "text-muted-2" : "text-ink font-medium"
                                }`}
                            >
                                {f.responses.toLocaleString()}
                            </span>

                            {f.responseLimit && (
                                <span className="text-[11px] text-muted">/ {f.responseLimit}</span>
                            )}

                            {f.responsesDelta !== undefined && (
                                <span className="text-[11px] text-success font-medium ml-1 flex items-center">
                                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" strokeWidth={2.25} />
                                    {f.responsesDelta}
                                </span>
                            )}
                        </div>

                        <div className="text-[12.5px] text-muted">{f.lastEdited}</div>

                        <button
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded text-muted-2 hover:text-ink hover:bg-surface-2 justify-self-end"
                            onClick={(e) => e.preventDefault()}
                        >
                            <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                    </Link>
                ))}

                {filteredForms.length === 0 && (
                    <div className="px-5 py-16 text-center">
                        <div className="font-display text-2xl text-ink mb-1">
                            No forms here yet.
                        </div>

                        <div className="text-sm text-muted">
                            Forms with this status will appear here.
                        </div>
                    </div>
                )}
            </div>

            {/* Footnote */}
            <div className="flex items-center justify-between mt-4 text-[12px] text-muted">
                <div className="nums">
                    {filteredForms.length} of {forms.length} forms
                </div>

                <Link
                    href="/dashboard/explore"
                    className="flex items-center gap-1 text-ink-2 hover:text-primary transition-colors"
                >
                    Browse template gallery
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                </Link>
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    unit,
    delta,
    deltaDirection,
    spark,
}: {
    label: string;
    value: string;
    unit?: string;
    delta?: string;
    deltaDirection?: "up" | "down";
    spark?: boolean;
}) {
    return (
        <div className="bg-surface border border-line rounded-xl px-4 py-3.5">
            <div className="flex items-center justify-between">
                <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase">
                    {label}
                </div>

                {spark && <Sparkline />}
            </div>

            <div className="flex items-baseline gap-1.5 mt-2.5">
                <div className="text-[28px] nums font-medium text-ink leading-none">{value}</div>

                {unit && <div className="text-[15px] text-muted nums">{unit}</div>}

                {delta && (
                    <div
                        className={`ml-auto flex items-center gap-0.5 text-[11px] font-medium nums ${
                            deltaDirection === "up" ? "text-success" : "text-danger"
                        }`}
                    >
                        {deltaDirection === "up" ? (
                            <TrendingUp className="w-2.5 h-2.5" strokeWidth={2.25} />
                        ) : (
                            <TrendingDown className="w-2.5 h-2.5" strokeWidth={2.25} />
                        )}

                        {delta}
                    </div>
                )}
            </div>
        </div>
    );
}

function Sparkline() {
    const points = [12, 8, 14, 10, 13, 9, 11, 15, 12, 14];

    const max = Math.max(...points);

    const w = 60;

    const h = 18;

    const step = w / (points.length - 1);

    const path = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`)
        .join(" ");

    return (
        <svg width={w} height={h} className="overflow-visible">
            <path
                d={path}
                stroke="var(--amber)"
                strokeWidth="1.25"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
}

function Chip({
    children,
    color,
    icon,
}: {
    children: React.ReactNode;
    color: "neutral" | "amber" | "danger" | "muted";
    icon?: React.ReactNode;
}) {
    const styles = {
        neutral: "bg-surface-2 text-muted",
        amber: "bg-amber-soft text-[#9F8254]",
        danger: "bg-danger-soft text-danger",
        muted: "bg-surface-2 text-muted-2",
    }[color];

    return (
        <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded ${styles}`}
        >
            {icon}
            {children}
        </span>
    );
}
