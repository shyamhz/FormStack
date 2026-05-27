"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FieldCard } from "./FieldCard";
import type { BuilderField, BuilderPage } from "@/lib/mock/builder-form";

type CanvasProps = {
    pages: BuilderPage[];
    formName: string;
    formDescription: string;
    selectedFieldId: string | null;
    onSelectField: (id: string | null) => void;
};

export function Canvas({
    pages,
    formName,
    formDescription,
    selectedFieldId,
    onSelectField,
}: CanvasProps) {
    const [activePage, setActivePage] = useState(pages[0]?.id ?? "");

    const currentPage = pages.find((p) => p.id === activePage) ?? pages[0];
    const [fields, setFields] = useState<BuilderField[]>(currentPage?.fields ?? []);

    function handleDuplicate(fieldId: string) {
        const idx = fields.findIndex((f) => f.id === fieldId);
        if (idx === -1) return;
        const original = fields[idx]!;
        const copy: BuilderField = { ...original, id: `${original.id}-copy-${Date.now()}` };
        const next = [...fields];
        next.splice(idx + 1, 0, copy);
        setFields(next);
    }

    function handleDelete(fieldId: string) {
        setFields((prev) => prev.filter((f) => f.id !== fieldId));
        if (selectedFieldId === fieldId) onSelectField(null);
    }

    return (
        <div className="flex-1 bg-bg overflow-y-auto flex flex-col">
            {/* Form header */}
            <div className="max-w-[680px] mx-auto w-full px-8 pt-10 pb-2">
                <h1 className="font-display text-[32px] leading-[1.1] tracking-[-0.02em] text-ink">
                    {formName}
                </h1>
                {formDescription && (
                    <p className="text-[13.5px] text-muted italic mt-1.5">{formDescription}</p>
                )}
            </div>

            {/* Page tabs */}
            <div className="max-w-[680px] mx-auto w-full px-8 mt-5">
                <div className="flex items-center gap-1 border-b border-line pb-0">
                    {pages.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => setActivePage(page.id)}
                            className={`px-3.5 py-2 text-[12.5px] border-b-2 -mb-px transition-all ${
                                activePage === page.id
                                    ? "border-primary text-primary font-medium"
                                    : "border-transparent text-muted hover:text-ink-2"
                            }`}
                        >
                            {page.title}
                        </button>
                    ))}
                    <button className="px-3 py-2 text-[12.5px] text-muted-2 hover:text-ink transition-colors -mb-px border-b-2 border-transparent flex items-center gap-1">
                        <Plus className="w-3 h-3" strokeWidth={2} />
                        Add page
                    </button>
                </div>
            </div>

            {/* Fields */}
            <div className="max-w-[680px] mx-auto w-full px-8 pt-5 pb-4 flex flex-col gap-3">
                {fields.map((field) => (
                    <FieldCard
                        key={field.id}
                        field={field}
                        isSelected={selectedFieldId === field.id}
                        onSelect={() => onSelectField(field.id)}
                        onDuplicate={() => handleDuplicate(field.id)}
                        onDelete={() => handleDelete(field.id)}
                    />
                ))}

                {/* Add question button */}
                <button
                    className="w-full border border-dashed border-line-strong rounded-md py-3 flex items-center justify-center gap-2 text-[12.5px] text-muted hover:text-ink-2 hover:border-primary hover:bg-primary-soft/20 transition-all mt-1"
                    onClick={() => onSelectField(null)}
                >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                    Add question
                </button>

                {/* Page end hint */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 h-px bg-line" />
                    <span className="text-[11px] text-muted-2 nums shrink-0">
                        End of page 1 · Continue button shown here
                    </span>
                    <div className="flex-1 h-px bg-line" />
                </div>

                {/* Spacer */}
                <div className="h-12" />
            </div>
        </div>
    );
}
