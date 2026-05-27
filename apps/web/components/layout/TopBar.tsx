"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import { Search, ArrowDownToLine, Plus } from "lucide-react";

const sectionLabel: Record<string, string> = {
    dashboard: "Forms",
    responses: "Responses",
    analytics: "Analytics",
    explore: "Templates",
    account: "Account",
    builder: "Builder",
};

export function TopBar() {
    const pathname = usePathname();

    const router = useRouter();

    // Example:
    // /dashboard
    // /dashboard/responses
    // /dashboard/builder/settings

    const parts = pathname.split("/").filter(Boolean);

    const section = parts[1] ? (sectionLabel[parts[1]] ?? parts[1]) : "Forms";

    const subPath = parts.length > 2 ? parts.slice(2).join(" / ") : null;

    return (
        <header className="h-14 shrink-0 border-b border-line bg-bg flex items-center px-7">
            <div className="flex items-center text-[12.5px]">
                <span className="text-muted">Studio North</span>

                <span className="mx-2 text-muted-2">/</span>

                <span className="text-ink font-medium">{section}</span>

                {subPath && (
                    <>
                        <span className="mx-2 text-muted-2">/</span>

                        <span className="text-muted-2 truncate max-w-[260px]">{subPath}</span>
                    </>
                )}
            </div>

            <div className="ml-auto flex items-center gap-2">
                <button className="flex items-center gap-2 px-2.5 py-1.5 bg-surface border border-line rounded-md text-[12px] text-muted hover:border-line-strong transition-colors w-[260px]">
                    <Search className="w-3.5 h-3.5" strokeWidth={1.75} />

                    <span>Search forms, responses…</span>

                    <span className="ml-auto bg-surface-2 px-1.5 py-0.5 rounded text-[10px] text-muted-2 font-mono">
                        ⌘K
                    </span>
                </button>

                <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface border border-line rounded-md text-[12px] text-ink-2 hover:border-line-strong transition-colors">
                    <ArrowDownToLine className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Import
                </button>

                <button
                    onClick={() => router.push("/dashboard/builder")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-fg rounded-md text-[12px] font-medium hover:bg-primary-hover transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
                    New form
                </button>
            </div>
        </header>
    );
}

