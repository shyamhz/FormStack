"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
    return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
    return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
    return <SelectPrimitive.Value {...props} />;
}

function SelectTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                "flex h-9 items-center justify-between gap-2 rounded-md border border-line bg-surface px-3 text-[13px] text-ink shadow-sm outline-none transition-colors",
                "hover:border-line-strong",
                "focus:border-primary focus:ring-2 focus:ring-primary/15",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "[&>span]:truncate",
                className,
            )}
            {...props}
        >
            {children}

            <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-2" strokeWidth={1.75} />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({
    className,
    children,
    position = "popper",
    sideOffset = 6,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                position={position}
                sideOffset={sideOffset}
                className={cn(
                    "relative z-[100] min-w-[180px] overflow-hidden rounded-xl border border-line bg-surface shadow-lg",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    "data-[side=bottom]:slide-in-from-top-1",
                    "data-[side=top]:slide-in-from-bottom-1",
                    className,
                )}
                {...props}
            >
                <SelectScrollUpButton />

                <SelectPrimitive.Viewport
                    className={cn(
                        "p-1",
                        position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]",
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>

                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
    return (
        <SelectPrimitive.Label
            className={cn(
                "px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-2",
                className,
            )}
            {...props}
        />
    );
}

function SelectItem({
    className,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item
            className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2 pr-8 text-[13px] text-ink outline-none transition-colors",
                "focus:bg-primary-soft focus:text-primary",
                "data-[state=checked]:bg-primary-soft/60",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className,
            )}
            {...props}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

            <span className="absolute right-2 flex items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} />
                </SelectPrimitive.ItemIndicator>
            </span>
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
    return (
        <SelectPrimitive.Separator className={cn("mx-1 my-1 h-px bg-line", className)} {...props} />
    );
}

function SelectScrollUpButton({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
    return (
        <SelectPrimitive.ScrollUpButton
            className={cn("flex items-center justify-center py-1 text-muted-2", className)}
            {...props}
        >
            <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.75} />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
    return (
        <SelectPrimitive.ScrollDownButton
            className={cn("flex items-center justify-center py-1 text-muted-2", className)}
            {...props}
        >
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.75} />
        </SelectPrimitive.ScrollDownButton>
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
