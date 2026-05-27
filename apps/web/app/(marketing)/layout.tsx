"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Twitter, Github, Linkedin } from "lucide-react";

import { BrandLockup } from "@/components/branding/BrandMark";

const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Explore", href: "/explore" },
    { label: "Docs", href: "#" },
];

const footerColumns = [
    {
        heading: "Product",
        links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
    },
    {
        heading: "Resources",
        links: ["Documentation", "API Reference", "Templates", "Guides", "Blog"],
    },
    {
        heading: "Company",
        links: ["About", "Careers", "Press", "Partners", "Contact"],
    },
    {
        heading: "Legal",
        links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "DPA", "Security"],
    },
];

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-bg">
            {/* Nav */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                    scrolled ? "bg-bg/95 backdrop-blur-sm border-b border-line" : "bg-transparent"
                }`}
            >
                <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <BrandLockup />
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`text-[13.5px] transition-colors ${
                                    pathname === link.href
                                        ? "text-ink font-medium"
                                        : "text-muted hover:text-ink"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-[13.5px] text-muted hover:text-ink transition-colors hidden sm:block"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/signup"
                            className="px-3.5 py-1.5 bg-primary text-primary-fg text-[13px] font-medium rounded-md hover:bg-primary-hover transition-colors"
                        >
                            Start for free
                        </Link>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1 pt-14">{children}</main>

            {/* Footer */}
            <footer className="border-t border-line bg-surface mt-24">
                <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-10">
                    {/* Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
                        {footerColumns.map((col) => (
                            <div key={col.heading}>
                                <div className="text-[10.5px] font-semibold text-muted-2 tracking-[0.1em] uppercase mb-4">
                                    {col.heading}
                                </div>

                                <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-[13px] text-muted hover:text-ink transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-line">
                        <div className="flex flex-col gap-1.5">
                            <BrandLockup />

                            <p className="text-[12px] text-muted ml-0.5">
                                Build forms that feel like they were made with care.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="text-muted-2 hover:text-ink transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4" strokeWidth={1.75} />
                            </a>

                            <a
                                href="#"
                                className="text-muted-2 hover:text-ink transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" strokeWidth={1.75} />
                            </a>

                            <a
                                href="#"
                                className="text-muted-2 hover:text-ink transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" strokeWidth={1.75} />
                            </a>

                            <span className="text-[12px] text-muted-2 ml-2">© 2026 Formstack</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

