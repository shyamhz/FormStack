"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All", "Feedback", "Hiring", "Events", "Lead gen", "Research", "Onboarding"];

const sortOptions = ["Most used", "Newest", "Trending"];

const featuredTemplates = [
    {
        id: "f1",
        title: "Customer NPS survey",
        creator: "Lattice Studios",
        category: "Feedback",
        uses: "3.4k",
        gradient: "from-primary-soft via-surface-2 to-surface",
        accent: "bg-primary-soft text-primary",
    },
    {
        id: "f2",
        title: "Senior Designer application",
        creator: "Pebble & Co",
        category: "Hiring",
        uses: "2.1k",
        gradient: "from-amber-soft via-surface-2 to-surface",
        accent: "bg-amber-soft text-[#9F8254]",
    },
    {
        id: "f3",
        title: "Conference speaker submission",
        creator: "North Type",
        category: "Events",
        uses: "1.8k",
        gradient: "from-success-soft via-surface-2 to-surface",
        accent: "bg-success-soft text-success",
    },
];

const templates = [
    {
        id: "t1",
        title: "Customer NPS survey",
        creator: "Lattice Studios",
        uses: "3.4k",
        category: "Feedback",
        gradient: "from-primary-soft to-surface-2",
    },
    {
        id: "t2",
        title: "Senior Designer application",
        creator: "Pebble & Co",
        uses: "2.1k",
        category: "Hiring",
        gradient: "from-amber-soft to-surface-2",
    },
    {
        id: "t3",
        title: "Conference speaker submission",
        creator: "North Type",
        uses: "1.8k",
        category: "Events",
        gradient: "from-success-soft to-surface-2",
    },
    {
        id: "t4",
        title: "Beta access waitlist",
        creator: "Roam Health",
        uses: "1.2k",
        category: "Lead gen",
        gradient: "from-surface-3 to-surface-2",
    },
    {
        id: "t5",
        title: "Product launch feedback",
        creator: "Folio Labs",
        uses: "980",
        category: "Feedback",
        gradient: "from-primary-soft to-surface-2",
    },
    {
        id: "t6",
        title: "Employee onboarding check-in",
        creator: "Formstack",
        uses: "870",
        category: "Onboarding",
        gradient: "from-surface-3 to-surface-2",
    },
    {
        id: "t7",
        title: "Event RSVP — small gathering",
        creator: "North Type",
        uses: "760",
        category: "Events",
        gradient: "from-success-soft to-surface-2",
    },
    {
        id: "t8",
        title: "Bug report — minimal",
        creator: "Folio Labs",
        uses: "640",
        category: "Feedback",
        gradient: "from-danger-soft to-surface-2",
    },
    {
        id: "t9",
        title: "Customer interview signup",
        creator: "Roam Health",
        uses: "590",
        category: "Research",
        gradient: "from-amber-soft to-surface-2",
    },
    {
        id: "t10",
        title: "Newsletter signup with preferences",
        creator: "Lattice Studios",
        uses: "520",
        category: "Lead gen",
        gradient: "from-primary-soft to-surface-2",
    },
    {
        id: "t11",
        title: "1:1 meeting prep",
        creator: "Pebble & Co",
        uses: "480",
        category: "Onboarding",
        gradient: "from-surface-3 to-surface-2",
    },
    {
        id: "t12",
        title: "Quarterly OKR review",
        creator: "Formstack",
        uses: "410",
        category: "Research",
        gradient: "from-surface-3 to-surface-2",
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeaturedCard({
    title,
    creator,
    category,
    uses,
    gradient,
    accent,
}: {
    title: string;
    creator: string;
    category: string;
    uses: string;
    gradient: string;
    accent: string;
}) {
    return (
        <div className="bg-surface border border-line rounded-2xl overflow-hidden hover:border-line-strong transition-colors group cursor-pointer">
            {/* Header image area */}
            <div className={`h-44 bg-gradient-to-br ${gradient} relative p-5`}>
                {/* Mini form mockup */}
                <div className="absolute inset-4 bg-surface/80 backdrop-blur-sm rounded-xl border border-line/60 p-4">
                    <div className="h-2 w-24 bg-line-strong rounded-full mb-3" />
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-line rounded-full" />
                        <div className="h-1.5 w-3/4 bg-line rounded-full" />
                        <div className="h-6 w-full bg-surface-2 rounded-md border border-line mt-3" />
                        <div className="h-6 w-full bg-surface-2 rounded-md border border-line" />
                    </div>
                </div>
            </div>

            {/* Card body */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${accent}`}
                    >
                        {category}
                    </span>
                    <ArrowUpRight
                        className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                        strokeWidth={1.75}
                    />
                </div>
                <h3 className="font-display text-[20px] leading-snug tracking-[-0.01em] text-ink mb-3">
                    {title}
                </h3>
                <div className="flex items-center justify-between text-[12px] text-muted">
                    <span>{creator}</span>
                    <span className="nums">{uses} uses</span>
                </div>
            </div>
        </div>
    );
}

function TemplateCard({
    title,
    creator,
    uses,
    category,
    gradient,
}: {
    title: string;
    creator: string;
    uses: string;
    category: string;
    gradient: string;
}) {
    return (
        <div className="bg-surface border border-line rounded-xl overflow-hidden hover:border-line-strong transition-colors group cursor-pointer">
            {/* Thumbnail */}
            <div className={`h-28 bg-gradient-to-br ${gradient} relative`}>
                <div className="absolute inset-3 bg-surface/70 rounded-lg border border-line/50 p-3">
                    <div className="h-1.5 w-16 bg-line-strong rounded-full mb-2" />
                    <div className="space-y-1.5">
                        <div className="h-1 w-full bg-line rounded-full" />
                        <div className="h-1 w-2/3 bg-line rounded-full" />
                        <div className="h-4 w-full bg-surface-2 rounded border border-line mt-2" />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="px-4 py-3">
                <div className="text-[11px] text-muted-2 mb-0.5">{category}</div>
                <div className="text-[13.5px] font-medium text-ink leading-snug mb-1 group-hover:text-primary transition-colors">
                    {title}
                </div>
                <div className="flex items-center justify-between text-[11.5px] text-muted">
                    <span>{creator}</span>
                    <span className="nums">{uses} uses</span>
                </div>
            </div>
        </div>
    );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function ExploreScreen() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSort, setActiveSort] = useState("Most used");

    const filteredTemplates = templates.filter((t) => {
        const matchesCategory = activeCategory === "All" || t.category === activeCategory;
        const matchesSearch =
            searchQuery === "" ||
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.creator.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pb-24">
            {/* Header */}
            <section className="pt-20 pb-12 border-b border-line">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h1
                        className="font-display text-ink leading-[1.0] tracking-[-0.03em] mb-3"
                        style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                    >
                        Explore
                    </h1>
                    <p className="text-[16px] text-muted max-w-[440px]">
                        Templates and public forms from the community. Use as-is or remix to fit
                        your needs.
                    </p>
                </div>
            </section>

            {/* Filter bar */}
            <section className="sticky top-14 z-30 bg-bg/95 backdrop-blur-sm border-b border-line">
                <div className="max-w-[1200px] mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
                    {/* Category chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1 rounded-full text-[12.5px] font-medium transition-all ${
                                    activeCategory === cat
                                        ? "bg-ink text-bg"
                                        : "bg-surface border border-line text-muted hover:text-ink hover:border-line-strong"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1" />

                    {/* Search */}
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-2"
                            strokeWidth={1.75}
                        />
                        <input
                            type="text"
                            placeholder="Search templates…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 bg-surface border border-line rounded-lg text-[13px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-primary w-48 transition-colors"
                        />
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-1 bg-surface border border-line rounded-lg p-0.5">
                        <SlidersHorizontal
                            className="w-3.5 h-3.5 text-muted ml-2"
                            strokeWidth={1.75}
                        />
                        {sortOptions.map((s) => (
                            <button
                                key={s}
                                onClick={() => setActiveSort(s)}
                                className={`px-2.5 py-1 rounded-md text-[12px] transition-all ${
                                    activeSort === s
                                        ? "bg-surface-2 text-ink font-medium"
                                        : "text-muted hover:text-ink-2"
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-6">
                {/* Featured this week */}
                <section className="pt-12 pb-10">
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="font-display text-[26px] tracking-[-0.02em] text-ink">
                            Featured this week
                        </h2>
                        <span className="text-[12px] text-muted">
                            Curated by the Formstack team
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {featuredTemplates.map((t) => (
                            <FeaturedCard key={t.id} {...t} />
                        ))}
                    </div>
                </section>

                {/* All templates grid */}
                <section className="pt-4 pb-10">
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="font-display text-[26px] tracking-[-0.02em] text-ink">
                            All templates
                        </h2>
                        <span className="text-[12px] text-muted nums">
                            {filteredTemplates.length} results
                        </span>
                    </div>

                    {filteredTemplates.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredTemplates.map((t) => (
                                <TemplateCard key={t.id} {...t} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="font-display text-[24px] text-ink mb-2">
                                No templates found.
                            </div>
                            <p className="text-[13.5px] text-muted">
                                Try a different search or category.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

