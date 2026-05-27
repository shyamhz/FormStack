"use client";
import { useState } from "react";
import {
    GripVertical,
    Copy,
    Trash2,
    Type,
    AlignLeft,
    Mail,
    Hash,
    Calendar,
    ChevronDown,
    CheckSquare,
    Star,
} from "lucide-react";
import type { BuilderField } from "@/lib/mock/builder-form";

type FieldCardProps = {
    field: BuilderField;
    isSelected: boolean;
    onSelect: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
};

function fieldIcon(type: BuilderField["type"]) {
    const cls = "w-3.5 h-3.5";
    const sw = 1.75;
    switch (type) {
        case "text":
            return <Type className={cls} strokeWidth={sw} />;
        case "long-text":
            return <AlignLeft className={cls} strokeWidth={sw} />;
        case "email":
            return <Mail className={cls} strokeWidth={sw} />;
        case "number":
            return <Hash className={cls} strokeWidth={sw} />;
        case "date":
            return <Calendar className={cls} strokeWidth={sw} />;
        case "select":
            return <ChevronDown className={cls} strokeWidth={sw} />;
        case "checkbox":
            return <CheckSquare className={cls} strokeWidth={sw} />;
        case "rating":
            return <Star className={cls} strokeWidth={sw} />;
        default:
            return <Type className={cls} strokeWidth={sw} />;
    }
}

function fieldTypeLabel(type: BuilderField["type"]) {
    const map: Record<string, string> = {
        text: "Short text",
        "long-text": "Long text",
        email: "Email",
        number: "Number",
        date: "Date",
        select: "Single select",
        checkbox: "Checkbox",
        rating: "Rating",
    };
    return map[type] ?? type;
}

// Renders a lightweight preview of the field input
function FieldPreview({ field }: { field: BuilderField }) {
    if (field.type === "text" || field.type === "email" || field.type === "number") {
        return (
            <div className="mt-2.5 h-8 rounded border border-line bg-surface px-3 flex items-center">
                <span className="text-[12px] text-muted-2">
                    {field.placeholder ?? "Your answer…"}
                </span>
            </div>
        );
    }

    if (field.type === "long-text") {
        return (
            <div className="mt-2.5 h-16 rounded border border-line bg-surface px-3 py-2 flex items-start">
                <span className="text-[12px] text-muted-2">
                    {field.placeholder ?? "Your answer…"}
                </span>
            </div>
        );
    }

    if (field.type === "date") {
        return (
            <div className="mt-2.5 h-8 rounded border border-line bg-surface px-3 flex items-center justify-between">
                <span className="text-[12px] text-muted-2">MM / DD / YYYY</span>
                <Calendar className="w-3.5 h-3.5 text-muted-2" strokeWidth={1.75} />
            </div>
        );
    }

    if (field.type === "select") {
        return (
            <div className="mt-2.5 space-y-1.5">
                {(field.options ?? []).map((opt, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-line-strong shrink-0" />
                        <span className="text-[12.5px] text-ink-2">{opt}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (field.type === "checkbox") {
        return (
            <div className="mt-2.5 space-y-1.5">
                {(field.options ?? ["Option A", "Option B"]).map((opt, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-sm border border-line-strong shrink-0" />
                        <span className="text-[12.5px] text-ink-2">{opt}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (field.type === "rating") {
        const max = field.maxValue ?? 10;
        const min = field.minValue ?? 1;
        const steps = Array.from({ length: max - min + 1 }, (_, i) => i + min);
        return (
            <div className="mt-3">
                <div className="flex gap-1">
                    {steps.map((n) => (
                        <div
                            key={n}
                            className="flex-1 h-8 rounded border border-line bg-surface flex items-center justify-center text-[11.5px] nums text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                            {n}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-1.5">
                    <span className="text-[10.5px] text-muted-2">Not at all</span>
                    <span className="text-[10.5px] text-muted-2">Extremely likely</span>
                </div>
            </div>
        );
    }

    return null;
}

export function FieldCard({ field, isSelected, onSelect, onDuplicate, onDelete }: FieldCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelect}
        >
            {/* Left selection accent */}
            {isSelected && (
                <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-md bg-primary"
                    style={{ zIndex: 1 }}
                />
            )}

            <div
                className={`relative rounded-md border transition-all cursor-pointer ${
                    isSelected
                        ? "border-primary bg-primary-soft/30 shadow-[0_0_0_1px_var(--primary)]"
                        : "border-line bg-surface hover:border-line-strong hover:bg-surface"
                }`}
                style={
                    isSelected
                        ? { boxShadow: "0 0 0 1px var(--primary), 0 2px 8px rgba(43,63,224,0.06)" }
                        : undefined
                }
            >
                {/* Drag handle — left edge, visible on hover */}
                <div
                    className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <GripVertical className="w-3.5 h-3.5 text-muted-2" strokeWidth={1.75} />
                </div>

                {/* Card body */}
                <div className="px-5 py-4 pl-7">
                    {/* Field type label */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                            <span className="text-muted-2">{fieldIcon(field.type)}</span>
                            <span className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase">
                                {fieldTypeLabel(field.type)}
                            </span>
                            {field.required && (
                                <span className="text-[10px] font-semibold text-primary tracking-[0.08em] uppercase">
                                    Required
                                </span>
                            )}
                        </div>

                        {/* Hover actions */}
                        <div
                            className={`flex items-center gap-0.5 transition-opacity ${
                                isHovered ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <button
                                className="p-1.5 rounded text-muted-2 hover:text-ink hover:bg-surface-2 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDuplicate();
                                }}
                                title="Duplicate field"
                            >
                                <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </button>
                            <button
                                className="p-1.5 rounded text-muted-2 hover:text-danger hover:bg-danger-soft transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                title="Delete field"
                            >
                                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </button>
                        </div>
                    </div>

                    {/* Question text */}
                    <div className="text-[14.5px] font-medium text-ink leading-snug">
                        {field.label}
                    </div>

                    {/* Help text */}
                    {field.helpText && (
                        <div className="text-[12px] text-muted mt-1 italic">{field.helpText}</div>
                    )}

                    {/* Input preview */}
                    <FieldPreview field={field} />
                </div>
            </div>
        </div>
    );
}

