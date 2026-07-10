"use client"

import * as React from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { motion, useReducedMotion } from "motion/react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

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
        variant === "default" &&
          "w-full bg-muted shadow-well px-3.5 py-2 font-medium hover:bg-muted/80",
        variant === "ghost" && "w-fit bg-transparent px-2 py-2 hover:text-foreground",
        "data-[popup-open]:ring-2 data-[popup-open]:ring-ring/50 focus-visible:ring-2 focus-visible:ring-ring/50",
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
  const reduceMotion = useReducedMotion()

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
            "bg-popover text-popover-foreground z-50 max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-lg border p-1 shadow-overlay outline-none",
            className
          )}
          render={
            <motion.div
              // reduced motion: opacity-only fade — never a dead pop-in.
              initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}
              animate={depth.overlay.animate}
              transition={reduceMotion ? fades.normal : springs.surface}
            />
          }
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
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
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
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
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
