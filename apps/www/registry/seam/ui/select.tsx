"use client"

import type * as React from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { condense } from "@/lib/motion"

function Select(props: React.ComponentProps<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />
}

function SelectValue(props: React.ComponentProps<typeof BaseSelect.Value>) {
  return <BaseSelect.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger> & {
  /**
   * default — recessed muted pill (inline-editable value in a toolbar well).
   * ghost   — naked text + chevron for inline dropdowns.
   */
  variant?: "default" | "ghost"
}) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-10 items-center justify-between gap-2 rounded-md squircle text-sm outline-none",
        // default — a debossed entry well, styled to match Input/OTP/etc: a
        // hairline border carving it into the surface (seamui design language).
        variant === "default" &&
          "w-full border border-border/60 bg-muted shadow-well px-3.5 py-2 hover:bg-muted/80",
        variant === "ghost" &&
          "w-fit bg-transparent px-2 py-2 hover:text-foreground",
        // Focus/open lifts the border to the ring colour, like the other wells.
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "data-[popup-open]:ring-2 data-[popup-open]:ring-ring/50 data-[popup-open]:border-ring",
        "data-[invalid]:border-destructive data-[invalid]:ring-2 data-[invalid]:ring-destructive/30",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="text-muted-foreground">
        <ChevronDown className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

function SelectContent({
  className,
  children,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup> & { sideOffset?: number }) {
  return (
    <BaseSelect.Portal>
      {/* alignItemWithTrigger={false}: drop the list *below* the trigger like a
          combobox/dropdown, instead of Base UI's default native-style behavior
          that overlays the selected item on top of the trigger. */}
      <BaseSelect.Positioner
        sideOffset={sideOffset}
        align="start"
        alignItemWithTrigger={false}
        className="z-50"
      >
        <BaseSelect.Popup
          data-slot="select-content"
          className={cn(
            // A debossed tray (muted well) that floats up — the chosen option
            // rises out of it as an embossed key (seam well/key language, §1),
            // the same shape as the toggle group, just vertical.
            "bg-muted text-foreground z-50 max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-lg squircle border border-border/60 p-1.5 shadow-overlay outline-none",
            condense.surface,
            className
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md squircle py-1.5 pl-2.5 pr-8 text-sm outline-none",
        // Transient keyboard/pointer cursor. On the near-white tray a fill alone
        // is <1.2:1, so pair it with a solid muted-foreground hairline — that
        // outline clears WCAG 1.4.11 non-text contrast (4.7:1 light / 6.2:1 dark)
        // so the active state is perceivable by colour, not just the shadow.
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:ring-1 data-[highlighted]:ring-inset data-[highlighted]:ring-muted-foreground",
        // The chosen value is an embossed key raised out of the tray. bg-secondary
        // (not card) reads raised in BOTH themes — white on the light well, lighter
        // than the well in dark — and the same hairline delineates it at 3:1. The
        // compound keeps the key embossed even when it's the cursor (on open Base
        // UI highlights the selected item).
        "data-[selected]:bg-secondary data-[selected]:text-secondary-foreground data-[selected]:shadow-resting data-[selected]:font-medium data-[selected]:ring-1 data-[selected]:ring-inset data-[selected]:ring-muted-foreground",
        "data-[selected]:data-[highlighted]:bg-secondary data-[selected]:data-[highlighted]:text-secondary-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="absolute right-2 flex items-center">
        <Check className="size-4" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

function SelectGroup(props: React.ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group data-slot="select-group" {...props} />
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Separator>) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
}
