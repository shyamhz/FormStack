"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import {
    Type,
    AlignLeft,
    Mail,
    Hash,
    Calendar,
    ChevronDown,
    CheckSquare,
    Star,
    Upload,
    PenLine,
    Minus,
    Search,
    GripVertical,
    ArrowUpRight,
} from "lucide-react";

type FieldDef = {
    type: string;
    label: string;
    icon: ReactNode;
};

const sw = 1.75;
const ic = "w-3.5 h-3.5";

const FIELD_GROUPS: { label: string; fields: FieldDef[] }[] = [
    {
        label: "Basic",
        fields: [
            { type: "text", label: "Short text", icon: <Type className={ic} strokeWidth={sw} /> },
            {
                type: "long-text",
                label: "Long text",
                icon: <AlignLeft className={ic} strokeWidth={sw} />,
            },
            { type: "email", label: "Email", icon: <Mail className={ic} strokeWidth={sw} /> },
            { type: "number", label: "Number", icon: <Hash className={ic} strokeWidth={sw} /> },
            { type: "date", label: "Date", icon: <Calendar className={ic} strokeWidth={sw} /> },
        ],
    },
    {
        label: "Choice",
        fields: [
            {
                type: "select",
                label: "Single select",
                icon: <ChevronDown className={ic} strokeWidth={sw} />,
            },
            {
                type: "multi",
                label: "Multi select",
                icon: <CheckSquare className={ic} strokeWidth={sw} />,
            },
            {
                type: "checkbox",
                label: "Checkbox",
                icon: <CheckSquare className={ic} strokeWidth={sw} />,
            },
            { type: "rating", label: "Rating", icon: <Star className={ic} strokeWidth={sw} /> },
        ],
    },
    {
        label: "Advanced",
        fields: [
            {
                type: "file",
                label: "File upload",
                icon: <Upload className={ic} strokeWidth={sw} />,
            },
            {
                type: "signature",
                label: "Signature",
                icon: <PenLine className={ic} strokeWidth={sw} />,
            },
            {
                type: "pagebreak",
                label: "Page break",
                icon: <Minus className={ic} strokeWidth={sw} />,
            },
        ],
    },
];

type FieldLibraryProps = {
    onAddField?: (type: string) => void;
};

export function FieldLibrary({ onAddField }: FieldLibraryProps) {
    const [query, setQuery] = useState("");

    const filtered = query.trim()
        ? FIELD_GROUPS.map((g) => ({
              ...g,
              fields: g.fields.filter((f) => f.label.toLowerCase().includes(query.toLowerCase())),
          })).filter((g) => g.fields.length > 0)
        : FIELD_GROUPS;

    return (
        <aside className="w-[260px] shrink-0 bg-surface-2 border-r border-line flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-4 pt-4 pb-3 border-b border-line">
                <div className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-3">
                    Add field
                </div>
                {/* Search */}
                <div className="flex items-center gap-2 px-2.5 h-8 bg-surface border border-line rounded-md focus-within:border-primary transition-colors">
                    <Search className="w-3 h-3 text-muted-2 shrink-0" strokeWidth={1.75} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search fields…"
                        className="flex-1 bg-transparent text-[12px] text-ink placeholder:text-muted-2 outline-none"
                    />
                </div>
            </div>

            {/* Field groups */}
            <div className="flex-1 overflow-y-auto py-2">
                {filtered.map((group) => (
                    <div key={group.label} className="mb-1">
                        <div className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] uppercase px-4 py-2">
                            {group.label}
                        </div>
                        {group.fields.map((field) => (
                            <FieldTypeRow
                                key={field.type}
                                field={field}
                                onClick={() => onAddField?.(field.type)}
                            />
                        ))}
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="px-4 py-8 text-center">
                        <div className="text-[12.5px] text-muted">No fields match "{query}"</div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-line px-4 py-3">
                <button className="flex items-center gap-1.5 text-[12px] text-muted hover:text-ink transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Browse templates
                </button>
            </div>
        </aside>
    );
}

function FieldTypeRow({ field, onClick }: { field: FieldDef; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="group w-full flex items-center gap-2.5 px-4 py-2 text-left hover:bg-surface-3 transition-colors"
        >
            {/* Grip — visible on hover */}
            <GripVertical
                className="w-3 h-3 text-muted-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                strokeWidth={1.75}
            />
            <span className="text-muted-2 group-hover:text-ink-2 transition-colors shrink-0">
                {field.icon}
            </span>
            <span className="text-[12.5px] text-ink-2 group-hover:text-ink transition-colors">
                {field.label}
            </span>
        </button>
    );
}

