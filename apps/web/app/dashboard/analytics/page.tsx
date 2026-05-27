"use client";

import { useState } from "react";

import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    timeSeriesData,
    funnelData,
    fieldStats,
    deviceBreakdown,
    trafficSources,
    analyticsStats,
} from "@/lib/mock/analytics";

import type { FieldStat } from "@/lib/mock/analytics";

// ── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
    label,
    value,
    unit,
    delta,
    deltaDirection,
}: {
    label: string;
    value: string;
    unit?: string;
    delta?: string;
    deltaDirection?: "up" | "down";
}) {
    return (
        <div className="bg-surface border border-line rounded-xl px-4 py-3.5">
            <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-2.5">
                {label}
            </div>

            <div className="flex items-baseline gap-1.5">
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

// ── Tooltip ──────────────────────────────────────────────────────────────────

function ChartTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: {
        value: number;
        name: string;
        color: string;
    }[];
    label?: string;
}) {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div
            className="px-3 py-2 rounded-lg border border-line text-[12px]"
            style={{
                background: "var(--surface)",
            }}
        >
            <div className="text-muted mb-1.5">{label}</div>

            {payload.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: p.color,
                        }}
                    />

                    <span className="text-muted-2 capitalize">{p.name}:</span>

                    <span className="font-medium text-ink nums">{p.value}</span>
                </div>
            ))}
        </div>
    );
}

// ── Funnel ───────────────────────────────────────────────────────────────────

function FunnelChart() {
    const maxVal = funnelData[0].value;

    return (
        <div className="flex flex-col gap-2.5">
            {funnelData.map((step, i) => {
                const barPct = (step.value / maxVal) * 100;

                return (
                    <div key={step.label}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[12.5px] text-ink">{step.label}</span>

                            <div className="flex items-center gap-2">
                                <span className="text-[12px] text-muted nums">
                                    {step.value.toLocaleString()}
                                </span>

                                <span className="text-[11px] font-medium text-muted-2 nums w-10 text-right">
                                    {step.pct}%
                                </span>
                            </div>
                        </div>

                        <div className="h-6 bg-surface-2 rounded overflow-hidden">
                            <div
                                className="h-full rounded transition-all"
                                style={{
                                    width: `${barPct}%`,
                                    background:
                                        i === 0
                                            ? "var(--primary)"
                                            : `rgba(43,63,224,${0.85 - i * 0.14})`,
                                }}
                            />
                        </div>

                        {step.dropOff !== undefined && (
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10.5px] text-danger nums">
                                    -{step.dropOff}% drop-off
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Field stats ──────────────────────────────────────────────────────────────

type SortKey = "completionPct" | "avgTimeSec" | "skipRate";

function FieldStatsTable() {
    const [sortKey, setSortKey] = useState<SortKey>("completionPct");

    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const sorted = [...fieldStats].sort((a, b) => {
        const diff = a[sortKey] - b[sortKey];

        return sortDir === "desc" ? -diff : diff;
    });

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "desc" ? "asc" : "desc"));
        } else {
            setSortKey(key);

            setSortDir("desc");
        }
    };

    const SortIcon = ({ col }: { col: SortKey }) => {
        if (sortKey !== col) {
            return <ChevronDown className="w-3 h-3 text-muted-2 opacity-40" strokeWidth={2} />;
        }

        return sortDir === "desc" ? (
            <ChevronDown className="w-3 h-3 text-primary" strokeWidth={2} />
        ) : (
            <ChevronUp className="w-3 h-3 text-primary" strokeWidth={2} />
        );
    };

    return (
        <div className="bg-surface border border-line rounded-xl overflow-hidden">
            <div
                className="grid items-center px-5 py-2.5 bg-bg border-b border-line text-[10px] font-semibold text-muted-2 tracking-[0.1em]"
                style={{
                    gridTemplateColumns: "1fr 80px 120px 100px 80px",
                }}
            >
                <div>FIELD</div>

                <div>TYPE</div>

                <button
                    onClick={() => handleSort("completionPct")}
                    className="flex items-center gap-1 hover:text-ink transition-colors"
                >
                    COMPLETION
                    <SortIcon col="completionPct" />
                </button>

                <button
                    onClick={() => handleSort("avgTimeSec")}
                    className="flex items-center gap-1 hover:text-ink transition-colors"
                >
                    AVG TIME
                    <SortIcon col="avgTimeSec" />
                </button>

                <button
                    onClick={() => handleSort("skipRate")}
                    className="flex items-center gap-1 hover:text-ink transition-colors"
                >
                    SKIP RATE
                    <SortIcon col="skipRate" />
                </button>
            </div>

            {sorted.map((f: FieldStat, i) => (
                <div
                    key={f.id}
                    className={`grid items-center px-5 py-3 ${
                        i !== sorted.length - 1 ? "border-b border-line-2" : ""
                    }`}
                    style={{
                        gridTemplateColumns: "1fr 80px 120px 100px 80px",
                    }}
                >
                    <div className="text-[13px] text-ink truncate pr-4">{f.label}</div>

                    <div>
                        <span className="text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-surface-2 text-muted-2 uppercase">
                            {f.type}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden max-w-[60px]">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${f.completionPct}%`,
                                    background:
                                        f.completionPct >= 80
                                            ? "var(--success)"
                                            : f.completionPct >= 60
                                              ? "var(--amber)"
                                              : "var(--danger)",
                                }}
                            />
                        </div>

                        <span
                            className={`text-[12.5px] font-medium nums ${
                                f.completionPct >= 80
                                    ? "text-success"
                                    : f.completionPct >= 60
                                      ? "text-amber"
                                      : "text-danger"
                            }`}
                        >
                            {f.completionPct}%
                        </span>
                    </div>

                    <div className="text-[12.5px] text-muted nums">
                        {f.avgTimeSec >= 60
                            ? `${Math.floor(f.avgTimeSec / 60)}m ${f.avgTimeSec % 60}s`
                            : `${f.avgTimeSec}s`}
                    </div>

                    <div
                        className={`text-[12.5px] nums font-medium ${
                            f.skipRate >= 25
                                ? "text-danger"
                                : f.skipRate >= 15
                                  ? "text-amber"
                                  : "text-muted"
                        }`}
                    >
                        {f.skipRate}%
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Device donut ─────────────────────────────────────────────────────────────

function DeviceDonut() {
    const colors = ["var(--primary)", "var(--amber)", "var(--muted-2)"];

    const total = deviceBreakdown.reduce((s, d) => s + d.pct, 0);

    let cumulative = 0;

    const r = 36;

    const cx = 44;

    const cy = 44;

    const circumference = 2 * Math.PI * r;

    const segments = deviceBreakdown.map((d, i) => {
        const offset = circumference * (1 - cumulative / total);

        const dash = circumference * (d.pct / total);

        cumulative += d.pct;

        return {
            ...d,
            offset,
            dash,
            color: colors[i],
        };
    });

    return (
        <div className="flex items-center gap-5">
            <svg width={88} height={88} viewBox="0 0 88 88">
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="var(--surface-2)"
                    strokeWidth={10}
                />

                {segments.map((seg) => (
                    <circle
                        key={seg.label}
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={10}
                        strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                        strokeDashoffset={seg.offset}
                        strokeLinecap="butt"
                        style={{
                            transform: "rotate(-90deg)",
                            transformOrigin: `${cx}px ${cy}px`,
                        }}
                    />
                ))}
            </svg>

            <div className="flex flex-col gap-2">
                {deviceBreakdown.map((d, i) => (
                    <div key={d.label} className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                                background: colors[i],
                            }}
                        />

                        <span className="text-[12.5px] text-ink">{d.label}</span>

                        <span className="text-[12px] text-muted nums ml-auto">{d.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
    const tickFormatter = (val: string, index: number) => (index % 5 === 0 ? val : "");

    return (
        <div className="px-8 pt-8 pb-16 max-w-[1320px] mx-auto">
            {/* Header */}
            <div className="flex items-end justify-between gap-4 mb-7">
                <div>
                    <h1 className="font-display text-[32px] leading-[1.1] tracking-[-0.02em] text-ink">
                        Customer feedback — Q4
                    </h1>

                    <p className="text-[13px] text-muted mt-1.5">
                        Analytics overview · Last 30 days
                    </p>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-md bg-surface text-[12px] text-ink-2 hover:border-line-strong transition-colors shrink-0">
                    Nov 7 – Dec 6
                    <ChevronDown className="w-3 h-3 text-muted" strokeWidth={2} />
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <StatCard
                    label="Views"
                    value={analyticsStats.views.toLocaleString()}
                    delta={`+${analyticsStats.viewsDelta}%`}
                    deltaDirection="up"
                />

                <StatCard
                    label="Starts"
                    value={analyticsStats.starts.toLocaleString()}
                    delta={`+${analyticsStats.startsDelta}%`}
                    deltaDirection="up"
                />

                <StatCard
                    label="Completions"
                    value={analyticsStats.completions.toLocaleString()}
                    delta={`+${analyticsStats.completionsDelta}%`}
                    deltaDirection="up"
                />

                <StatCard
                    label="Completion rate"
                    value={String(analyticsStats.completionRate)}
                    unit="%"
                    delta={`${analyticsStats.rateDelta}%`}
                    deltaDirection="down"
                />
            </div>
        </div>
    );
}

