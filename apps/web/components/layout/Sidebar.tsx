"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
    LayoutGrid,
    Inbox,
    BarChart3,
    LibraryBig,
    ChevronsUpDown,
    MoreHorizontal,
    Plus,
} from "lucide-react";

import { BrandLockup } from "@/components/branding/BrandMark";

import { recentForms, statusDotColor } from "@/lib/mock/forms";

const navItems = [
    {
        to: "/dashboard",
        label: "Forms",
        icon: LayoutGrid,
        count: 7,
    },

    {
        to: "/dashboard/responses",
        label: "Responses",
        icon: Inbox,
        count: 1592,
    },

    {
        to: "/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
    },

    {
        to: "/dashboard/explore",
        label: "Templates",
        icon: LibraryBig,
    },
];

function formatCount(n?: number) {
    if (n === undefined) {
        return null;
    }

    if (n >= 1000) {
        return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }

    return n.toString();
}

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[236px] shrink-0 bg-surface-2 border-r border-line flex flex-col px-3.5 py-4">
            {/* Brand */}
            <div className="px-1.5 pb-4">
                <BrandLockup />
            </div>

            {/* Workspace switcher */}
            <button className="w-full flex items-center justify-between p-2 bg-surface border border-line rounded-md mb-4 hover:bg-bg/80 transition-colors text-left">
                <div className="flex items-center gap-2 min-w-0">
                    <div
                        className="w-[20px] h-[20px] rounded-[5px] shrink-0"
                        style={{
                            background: "linear-gradient(135deg, #2B3FE0 0%, #5A6DF0 100%)",
                        }}
                    />

                    <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold leading-tight truncate">
                            Studio North
                        </div>

                        <div className="text-[11px] text-muted leading-tight">Pro · 4 members</div>
                    </div>
                </div>

                <ChevronsUpDown className="w-3.5 h-3.5 text-muted-2 shrink-0" strokeWidth={1.75} />
            </button>

            {/* Workspace nav */}
            <SectionLabel>Workspace</SectionLabel>

            <nav className="flex flex-col gap-px mb-5">
                {navItems.map((item) => {
                    const isActive =
                        item.to === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.to);
                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`group flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition-colors ${
                                isActive
                                    ? "bg-ink text-bg font-medium"
                                    : "text-ink-2 hover:bg-surface-3"
                            }`}
                        >
                            <item.icon
                                className={`w-[15px] h-[15px] ${isActive ? "" : "text-muted"}`}
                                strokeWidth={1.75}
                            />

                            <span>{item.label}</span>

                            {item.count !== undefined && (
                                <span
                                    className={`ml-auto text-[11px] nums ${
                                        isActive ? "text-bg/60" : "text-muted-2"
                                    }`}
                                >
                                    {formatCount(item.count)}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Recent forms */}
            <SectionLabel>Recent</SectionLabel>

            <div className="flex flex-col gap-px mb-3">
                {recentForms.map((f) => (
                    <Link
                        key={f.id}
                        href={`/dashboard/builder?id=${f.id}`}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12.5px] text-ink-2 hover:bg-surface-3 transition-colors truncate"
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDotColor(
                                f.status,
                            )}`}
                        />

                        <span className="truncate">{f.name}</span>
                    </Link>
                ))}
            </div>

            <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] text-muted hover:text-ink transition-colors w-fit">
                <Plus className="w-3 h-3" strokeWidth={2} />
                New folder
            </button>

            {/* User card */}
            <div className="mt-auto pt-3.5 border-t border-line">
                <div className="flex items-center gap-2.5 px-1.5 py-1">
                    <div className="w-7 h-7 rounded-full bg-surface-3 border border-line flex items-center justify-center text-[11px] font-semibold text-ink">
                        SR
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="text-[12.5px] font-medium leading-tight truncate">
                            Sara Reyes
                        </div>

                        <div className="text-[11px] text-muted leading-tight truncate">
                            sara@studionorth.co
                        </div>
                    </div>

                    <button className="text-muted-2 hover:text-ink p-1">
                        <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                </div>
            </div>
        </aside>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-[10px] font-semibold text-muted-2 tracking-[0.1em] px-2.5 pb-1.5">
            {children.toString().toUpperCase()}
        </div>
    );
}
