"use client";

import { useState } from "react";

import type { ReactNode } from "react";

import Link from "next/link";

import {
    ChevronLeft,
    MoreHorizontal,
    MapPin,
    Monitor,
    Clock,
    ExternalLink,
    Tag,
    CheckCircle,
    Eye,
    Play,
    Send,
} from "lucide-react";

import { getResponse } from "@/lib/mock/responses";

import type { FieldAnswer } from "@/lib/mock/responses";

function StatusChip({ status }: { status: "completed" | "partial" }) {
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

function FieldTypePill({ type }: { type: string }) {
    return (
        <span className="text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-surface-2 text-muted-2 uppercase">
            {type}
        </span>
    );
}

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
    return (
        <div className="flex items-center gap-1 mt-1">
            {Array.from({
                length: max,
            }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < value ? "text-amber" : "text-line-strong"}`}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                >
                    <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 1.95.71-4.13L2 5.5l4.15-.75L8 1z" />
                </svg>
            ))}

            <span className="text-[12px] text-muted nums ml-1">
                {value} / {max}
            </span>
        </div>
    );
}

function NpsScale({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-1 mt-1">
            {Array.from({
                length: 11,
            }).map((_, i) => (
                <div
                    key={i}
                    className={`w-7 h-7 rounded flex items-center justify-center text-[11px] font-medium nums transition-colors ${
                        i === value
                            ? "bg-primary text-primary-fg"
                            : "bg-surface-2 text-muted border border-line"
                    }`}
                >
                    {i}
                </div>
            ))}
        </div>
    );
}

function AnswerBlock({ answer }: { answer: FieldAnswer }) {
    if (answer.skipped || answer.answer === null) {
        return (
            <div className="py-3.5 border-b border-line-2 last:border-0">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11.5px] text-muted-2">{answer.fieldLabel}</span>

                    <FieldTypePill type={answer.fieldType} />
                </div>

                <div className="text-[12.5px] text-muted-2 italic">Skipped</div>
            </div>
        );
    }

    return (
        <div className="py-3.5 border-b border-line-2 last:border-0">
            <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11.5px] font-medium text-muted">{answer.fieldLabel}</span>

                <FieldTypePill type={answer.fieldType} />
            </div>

            {answer.fieldType === "rating" &&
                typeof answer.answer === "number" &&
                (answer.answer <= 5 ? (
                    <StarRating value={answer.answer} max={5} />
                ) : (
                    <NpsScale value={answer.answer} />
                ))}

            {answer.fieldType === "checkbox" && Array.isArray(answer.answer) && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {answer.answer.map((opt) => (
                        <span
                            key={opt}
                            className="text-[12px] font-medium px-2 py-0.5 rounded bg-primary-soft text-primary border border-primary/15"
                        >
                            {opt}
                        </span>
                    ))}
                </div>
            )}

            {answer.fieldType === "select" && typeof answer.answer === "string" && (
                <div className="mt-1">
                    <span className="text-[13px] font-medium px-2 py-0.5 rounded bg-surface-2 text-ink border border-line">
                        {answer.answer}
                    </span>
                </div>
            )}

            {(answer.fieldType === "long-text" ||
                answer.fieldType === "text" ||
                answer.fieldType === "email") &&
                typeof answer.answer === "string" && (
                    <p className="text-[13.5px] text-ink leading-relaxed mt-1">{answer.answer}</p>
                )}
        </div>
    );
}

export default function ResponseDetailPage({
    params,
}: {
    params: {
        responseId: string;
    };
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    const response = getResponse(params.responseId ?? "");

    if (!response) {
        return (
            <div className="px-8 pt-16 text-center">
                <div className="font-display text-3xl text-ink mb-2">Response not found.</div>

                <Link href="/dashboard/responses" className="text-sm text-primary hover:underline">
                    Back to responses
                </Link>
            </div>
        );
    }

    const tags = response.tags.length > 0 ? response.tags : [];

    return (
        <div className="px-8 pt-7 pb-16 max-w-[1320px] mx-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/responses"
                        className="flex items-center gap-1 text-[12.5px] text-muted hover:text-ink transition-colors"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
                        Responses
                    </Link>

                    <span className="text-muted-2">/</span>

                    <span className="text-[12.5px] font-medium text-ink nums">{response.id}</span>

                    <StatusChip status={response.status} />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[12px] text-muted">{response.submittedAtISO}</span>

                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="p-1.5 rounded border border-line bg-surface text-muted-2 hover:border-line-strong hover:text-ink transition-colors"
                        >
                            <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-surface border border-line rounded-lg shadow-[0_4px_14px_rgba(20,23,28,0.08)] z-10 py-1">
                                {[
                                    "Export as PDF",
                                    "Mark complete",
                                    "Add tag",
                                    "Delete response",
                                ].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setMenuOpen(false)}
                                        className={`w-full text-left px-3 py-1.5 text-[12.5px] transition-colors hover:bg-surface-2 ${
                                            item === "Delete response"
                                                ? "text-danger"
                                                : "text-ink-2"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Two-column layout */}
            <div className="flex gap-6 items-start">
                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-surface border border-line rounded-xl px-6 py-5">
                        <h2 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-ink mb-1">
                            Response from{" "}
                            {response.respondent ? (
                                <span className="text-primary">{response.respondent}</span>
                            ) : (
                                <span className="text-muted italic">Anonymous</span>
                            )}
                        </h2>

                        <p className="text-[12.5px] text-muted mb-5">
                            <span className="nums">{response.id}</span>
                            {" · "}
                            {response.submittedAtISO}
                            {" · "}
                            <span className="nums">{response.duration}</span> to complete
                        </p>

                        <div className="divide-y-0">
                            {response.answers.map((a) => (
                                <AnswerBlock key={a.fieldId} answer={a} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-[300px] shrink-0 flex flex-col gap-4">
                    {/* Metadata */}
                    <div className="bg-surface border border-line rounded-xl px-4 py-4">
                        <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-3">
                            Metadata
                        </div>

                        <div className="flex flex-col gap-3">
                            <MetaRow
                                icon={<Send className="w-3.5 h-3.5" strokeWidth={1.75} />}
                                label="Submitted"
                            >
                                <span className="text-[12.5px] text-ink nums">
                                    {response.submittedAtISO}
                                </span>
                            </MetaRow>

                            <MetaRow
                                icon={<MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />}
                                label="Location"
                            >
                                <span className="text-[12.5px] text-ink">
                                    {response.ipLocation}
                                </span>
                            </MetaRow>

                            <MetaRow
                                icon={<Monitor className="w-3.5 h-3.5" strokeWidth={1.75} />}
                                label="Device"
                            >
                                <span className="text-[12.5px] text-ink">{response.device}</span>
                            </MetaRow>

                            <MetaRow
                                icon={<Clock className="w-3.5 h-3.5" strokeWidth={1.75} />}
                                label="Duration"
                            >
                                <span className="text-[12.5px] text-ink nums">
                                    {response.duration}
                                </span>
                            </MetaRow>

                            <MetaRow
                                icon={<ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />}
                                label="Referrer"
                            >
                                <span className="text-[12.5px] text-ink">{response.referrer}</span>
                            </MetaRow>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-surface border border-line rounded-xl px-4 py-4">
                        <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-3">
                            Tags
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {tags.length === 0 && (
                                <span className="text-[12px] text-muted-2 italic">No tags yet</span>
                            )}

                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-2 text-muted border border-line"
                                >
                                    <Tag className="w-2.5 h-2.5" strokeWidth={2} />

                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="text-[12px] text-primary hover:text-primary-hover transition-colors">
                            + Add tag
                        </button>
                    </div>

                    {/* Activity timeline */}
                    <div className="bg-surface border border-line rounded-xl px-4 py-4">
                        <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-3">
                            Activity
                        </div>

                        <div className="flex flex-col gap-0">
                            <TimelineEvent
                                icon={<Eye className="w-3 h-3" strokeWidth={2} />}
                                label="Viewed form"
                                time="10:11 AM"
                                isFirst
                            />

                            <TimelineEvent
                                icon={<Play className="w-3 h-3" strokeWidth={2} />}
                                label="Started filling"
                                time="10:11 AM"
                            />

                            <TimelineEvent
                                icon={<CheckCircle className="w-3 h-3" strokeWidth={2} />}
                                label="Submitted"
                                time="10:14 AM"
                                isLast
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetaRow({
    icon,
    label,
    children,
}: {
    icon: ReactNode;
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex items-start gap-2.5">
            <span className="text-muted-2 mt-0.5 shrink-0">{icon}</span>

            <div className="min-w-0">
                <div className="text-[10.5px] text-muted-2 mb-0.5">{label}</div>

                {children}
            </div>
        </div>
    );
}

function TimelineEvent({
    icon,
    label,
    time,
    isFirst,
    isLast,
}: {
    icon: ReactNode;
    label: string;
    time: string;
    isFirst?: boolean;
    isLast?: boolean;
}) {
    return (
        <div className="flex items-start gap-3 relative">
            {/* Line */}
            {!isLast && <div className="absolute left-[13px] top-6 bottom-0 w-px bg-line" />}

            <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    isFirst
                        ? "bg-primary-soft text-primary"
                        : isLast
                          ? "bg-success-soft text-success"
                          : "bg-surface-2 text-muted"
                }`}
            >
                {icon}
            </div>

            <div className="pb-4 min-w-0">
                <div className="text-[12.5px] text-ink">{label}</div>

                <div className="text-[11px] text-muted-2 nums">{time}</div>
            </div>
        </div>
    );
}

