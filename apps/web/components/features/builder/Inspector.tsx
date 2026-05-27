"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import type { BuilderField } from "@/lib/mock/builder-form";
type InspectorProps = {
    field: BuilderField | null;
    onFieldChange?: (updated: BuilderField) => void;
};

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-[12.5px] text-ink-2">{label}</span>
            <button
                onClick={() => onChange(!checked)}
                className="flex items-center transition-colors"
                aria-pressed={checked}
            >
                {checked ? (
                    <ToggleRight className="w-[22px] h-[22px] text-primary" strokeWidth={1.75} />
                ) : (
                    <ToggleLeft className="w-[22px] h-[22px] text-muted-2" strokeWidth={1.75} />
                )}
            </button>
        </div>
    );
}

function SectionHeading({ children }: { children: ReactNode }) {
    return (
        <div className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase pt-4 pb-2 border-t border-line mt-1">
            {children}
        </div>
    );
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

export function Inspector({ field, onFieldChange }: InspectorProps) {
    const [activeTab, setActiveTab] = useState<"field" | "logic">("field");
    const [required, setRequired] = useState(field?.required ?? false);
    const [randomize, setRandomize] = useState(false);
    const [allowOther, setAllowOther] = useState(false);

    if (!field) {
        return (
            <aside className="w-[300px] shrink-0 bg-surface border-l border-line flex flex-col items-center justify-center">
                <div className="text-center px-8">
                    <div className="w-10 h-10 rounded-lg bg-surface-2 border border-line flex items-center justify-center mx-auto mb-3">
                        <ChevronDown className="w-4 h-4 text-muted-2" strokeWidth={1.75} />
                    </div>
                    <div className="text-[13px] font-medium text-ink mb-1">No field selected</div>
                    <div className="text-[12px] text-muted">
                        Click a field in the canvas to inspect and configure it.
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-[300px] shrink-0 bg-surface border-l border-line flex flex-col overflow-hidden">
            {/* Inspector tabs */}
            <div className="px-4 pt-3 pb-0 border-b border-line">
                <div className="flex items-center gap-1 bg-surface-2 p-0.5 rounded-md w-fit mb-3">
                    {(["field", "logic"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 rounded text-[12px] transition-all capitalize ${
                                activeTab === tab
                                    ? "bg-surface text-ink font-medium shadow-[0_1px_2px_rgba(20,23,28,0.04)]"
                                    : "text-muted hover:text-ink-2"
                            }`}
                        >
                            {tab === "field" ? "Field" : "Logic"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inspector body */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
                {activeTab === "field" && (
                    <>
                        {/* Question */}
                        <div className="mb-3">
                            <label className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase block mb-1.5">
                                Question
                            </label>
                            <textarea
                                defaultValue={field.label}
                                rows={2}
                                className="w-full text-[12.5px] text-ink bg-bg border border-line rounded-md px-3 py-2 resize-none outline-none focus:border-primary transition-colors placeholder:text-muted-2"
                            />
                        </div>

                        {/* Help text */}
                        <div className="mb-3">
                            <label className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase block mb-1.5">
                                Help text
                            </label>
                            <input
                                type="text"
                                defaultValue={field.helpText ?? ""}
                                placeholder="Optional hint for respondents"
                                className="w-full text-[12.5px] text-ink bg-bg border border-line rounded-md px-3 h-8 outline-none focus:border-primary transition-colors placeholder:text-muted-2"
                            />
                        </div>

                        {/* Field type — read-only pill */}
                        <div className="mb-1">
                            <label className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase block mb-1.5">
                                Field type
                            </label>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-2 border border-line rounded-md text-[12px] text-ink-2">
                                {fieldTypeLabel(field.type)}
                            </div>
                        </div>

                        {/* Required toggle */}
                        <div className="border-t border-line mt-3">
                            <Toggle
                                checked={required}
                                onChange={(v) => {
                                    setRequired(v);
                                    onFieldChange?.({ ...field, required: v });
                                }}
                                label="Required"
                            />
                        </div>

                        {/* Validation */}
                        {field.type === "rating" && (
                            <>
                                <SectionHeading>Validation</SectionHeading>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-1">
                                        <label className="text-[10.5px] text-muted block mb-1">
                                            Min
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={field.minValue ?? 1}
                                            className="w-full h-8 text-[12.5px] nums text-ink bg-bg border border-line rounded-md px-3 outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-[10.5px] text-muted block mb-1">
                                            Max
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={field.maxValue ?? 10}
                                            className="w-full h-8 text-[12.5px] nums text-ink bg-bg border border-line rounded-md px-3 outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Conditional logic */}
                        <SectionHeading>Conditional logic</SectionHeading>
                        <div className="text-[12px] text-muted mb-2">Show this field if…</div>
                        <button className="flex items-center gap-1.5 text-[12px] text-primary hover:text-primary-hover transition-colors">
                            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                            Add rule
                        </button>

                        {/* Settings */}
                        {(field.type === "select" || field.type === "checkbox") && (
                            <>
                                <SectionHeading>Settings</SectionHeading>
                                <Toggle
                                    checked={randomize}
                                    onChange={setRandomize}
                                    label="Randomize options"
                                />
                                <Toggle
                                    checked={allowOther}
                                    onChange={setAllowOther}
                                    label="Allow 'other'"
                                />
                            </>
                        )}
                    </>
                )}

                {activeTab === "logic" && (
                    <div className="py-6 text-center">
                        <div className="text-[13px] font-medium text-ink mb-1">
                            No logic rules yet
                        </div>
                        <div className="text-[12px] text-muted mb-4">
                            Add conditions to show or hide this field based on previous answers.
                        </div>
                        <button className="flex items-center gap-1.5 text-[12px] text-primary hover:text-primary-hover transition-colors mx-auto">
                            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                            Add condition
                        </button>
                    </div>
                )}
            </div>

            {/* Footer — field ID */}
            <div className="border-t border-line px-4 py-3">
                <div className="text-[10.5px] text-muted-2 font-mono">
                    Field ID: <span className="text-muted">{field.id}</span>
                </div>
            </div>
        </aside>
    );
}

