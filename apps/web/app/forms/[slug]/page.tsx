"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { ProgressBar } from "@/components/features/public-form/ProgressBar";

import { QuestionBlock } from "@/components/features/public-form/QuestionBlock";

const HEAR_OPTIONS = [
    {
        key: "A",
        label: "Twitter / X",
    },
    {
        key: "B",
        label: "Search",
    },
    {
        key: "C",
        label: "A friend",
    },
    {
        key: "D",
        label: "Other",
    },
];

export default function PublicFormPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const router = useRouter();

    const [name, setName] = useState("Maya Chen");

    const [email, setEmail] = useState("maya@dragonfruit.co");

    const [hearOption, setHearOption] = useState("A");

    const currentPage = 1;

    const totalPages = 3;

    function handleContinue() {
        router.push(`/forms/${params.slug}/submitted`);
    }

    return (
        <div className="flex flex-col gap-10">
            {/* Progress bar */}
            <ProgressBar current={currentPage} total={totalPages} />

            {/* Header */}
            <div>
                <h1 className="font-display text-[44px] leading-[1.05] tracking-[-0.02em] text-ink">
                    Customer feedback — Q4
                </h1>

                <p className="text-[14.5px] text-muted mt-2.5 leading-relaxed">
                    Quarterly product feedback from active customers. Takes about 3 minutes.
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-2 mt-3.5 text-[12px] text-muted-2 nums">
                    <span>5 questions</span>

                    <span className="text-line-strong">·</span>

                    <span>~3 min</span>

                    <span className="text-line-strong">·</span>

                    <span>
                        Page <span className="text-ink-2 font-medium">{currentPage}</span> of{" "}
                        <span className="text-ink-2 font-medium">{totalPages}</span>
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-line" />

            {/* Section title */}
            <div>
                <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-2 uppercase mb-1">
                    Page 1
                </p>

                <h2 className="font-display text-[26px] text-ink leading-tight">Your details</h2>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-10">
                {/* Name */}
                <QuestionBlock
                    index={1}
                    label="What's your name?"
                    required
                    helpText="We'll use this to personalise your experience."
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full h-12 px-4 bg-surface border border-line rounded-md text-[15px] text-ink placeholder:text-muted-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </QuestionBlock>

                {/* Email */}
                <QuestionBlock
                    index={2}
                    label="Where can we reach you?"
                    required
                    helpText="Your email address. We won't share it with anyone."
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-12 px-4 bg-surface border border-line rounded-md text-[15px] text-ink placeholder:text-muted-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </QuestionBlock>

                {/* Hear about us */}
                <QuestionBlock
                    index={3}
                    label="How did you hear about us?"
                    helpText="Pick the option that fits best."
                >
                    <div className="grid grid-cols-2 gap-2.5">
                        {HEAR_OPTIONS.map((opt) => {
                            const selected = hearOption === opt.key;

                            return (
                                <button
                                    key={opt.key}
                                    onClick={() => setHearOption(opt.key)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-md border text-left transition-all ${
                                        selected
                                            ? "border-primary bg-primary-soft text-ink"
                                            : "border-line bg-surface text-ink-2 hover:border-line-strong hover:bg-bg"
                                    }`}
                                >
                                    {/* Key */}
                                    <span
                                        className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-semibold shrink-0 transition-all ${
                                            selected
                                                ? "bg-primary text-primary-fg"
                                                : "bg-surface-2 text-muted border border-line"
                                        }`}
                                    >
                                        {selected ? (
                                            <Check className="w-3 h-3" strokeWidth={2.5} />
                                        ) : (
                                            opt.key
                                        )}
                                    </span>

                                    <span className="text-[14px] font-medium">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </QuestionBlock>
            </div>

            {/* Divider */}
            <div className="h-px bg-line" />

            {/* Footer nav */}
            <div className="flex flex-col gap-4">
                {/* Dots */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        {Array.from({
                            length: totalPages,
                        }).map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all ${
                                    i === currentPage - 1
                                        ? "w-4 h-1.5 bg-primary"
                                        : "w-1.5 h-1.5 bg-line-strong"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Saved */}
                    <div className="flex items-center gap-1.5 text-[12px] text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                        Saved
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-line text-[13.5px] text-ink-2 hover:border-line-strong hover:text-ink transition-all">
                        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Back
                    </button>

                    <button
                        onClick={handleContinue}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-primary text-primary-fg text-[13.5px] font-medium hover:bg-primary-hover transition-colors"
                    >
                        Continue
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                </div>

                {/* Keyboard hint */}
                <p className="text-center text-[11.5px] text-muted-2">
                    Press{" "}
                    <kbd className="font-mono text-[10.5px] bg-surface-2 border border-line rounded px-1 py-0.5">
                        Enter ↵
                    </kbd>{" "}
                    to continue
                </p>
            </div>
        </div>
    );
}

