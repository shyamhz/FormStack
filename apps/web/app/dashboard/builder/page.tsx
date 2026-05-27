"use client";

import { useState } from "react";

import { FieldLibrary } from "@/components/features/builder/FieldLibrary";
import { Canvas } from "@/components/features/builder/Canvas";
import { Inspector } from "@/components/features/builder/Inspector";

import { builderPages, builderFormMeta } from "@/lib/mock/builder-form";

import type { BuilderField } from "@/lib/mock/builder-form";

export default function BuilderPage() {
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>("field-nps");

    const allFields: BuilderField[] = builderPages.flatMap((p) => p.fields);

    const selectedField = allFields.find((f) => f.id === selectedFieldId) ?? null;

    return (
        <div className="flex flex-1 overflow-hidden">
            <FieldLibrary />

            <Canvas
                pages={builderPages}
                formName={builderFormMeta.name}
                formDescription={builderFormMeta.description}
                selectedFieldId={selectedFieldId}
                onSelectField={setSelectedFieldId}
            />

            <Inspector field={selectedField} onFieldChange={() => {}} />
        </div>
    );
}

