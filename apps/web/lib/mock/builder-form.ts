import type { FormField, FormPage } from "./forms";

export type BuilderField = FormField & {
    minValue?: number;
    maxValue?: number;
    randomize?: boolean;
    allowOther?: boolean;
};

export type BuilderPage = Omit<FormPage, "fields"> & {
    fields: BuilderField[];
};

export const builderPages: BuilderPage[] = [
    {
        id: "page-welcome",
        title: "Welcome",
        fields: [
            {
                id: "field-name",
                type: "text",
                label: "What's your name?",
                required: true,
                placeholder: "Your full name",
            },
            {
                id: "field-email",
                type: "email",
                label: "Where can we reach you?",
                required: true,
                placeholder: "you@example.com",
                helpText: "We'll only use this to follow up if needed.",
            },
            {
                id: "field-source",
                type: "select",
                label: "How did you hear about us?",
                required: false,
                options: ["Twitter / X", "Search engine", "A friend or colleague", "Other"],
            },
            {
                id: "field-nps",
                type: "rating",
                label: "How likely are you to recommend us?",
                required: true,
                helpText: "1 = not at all likely, 10 = extremely likely",
                minValue: 1,
                maxValue: 10,
            },
            {
                id: "field-comments",
                type: "long-text",
                label: "Anything else you'd like to share?",
                required: false,
                placeholder: "Your thoughts, suggestions, or feedback…",
            },
        ],
    },
    {
        id: "page-details",
        title: "Your details",
        fields: [],
    },
    {
        id: "page-feedback",
        title: "Feedback",
        fields: [],
    },
    {
        id: "page-wrapup",
        title: "Wrap up",
        fields: [],
    },
];

export const builderFormMeta = {
    id: "cf-q4-2026",
    name: "Customer feedback — Q4",
    description: "Quarterly product feedback from active customers.",
    status: "published" as const,
};

