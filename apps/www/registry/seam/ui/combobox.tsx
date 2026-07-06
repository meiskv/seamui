"use client"

import * as React from "react"
import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { motion, useReducedMotion } from "motion/react"
import { Check, ChevronsUpDown, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

/**
 * Combobox — a filterable input bound to a listbox popup. Built on Base UI's
 * Combobox (which owns filtering, keyboard nav, and selection); seamui styles
 * it as a debossed entry field opening an overlay-depth popup of embossed
 * items. See the seamui design language: type *into* the well, pick a raised key.
 *
 * Aliased directly so the generic `<Value, Multiple>` signature (and the
 * `items` / `value` / `multiple` inference it drives) passes through intact.
 */
const Combobox = BaseCombobox.Root

/**
 * The debossed text field. Shows a leading search icon, a trailing chevron,
 * and a Clear button once there's a value to clear.
 */
function ComboboxInput({
  className,
  placeholder,
  showClear = true,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & {
  showClear?: boolean
}) {
  return (
    <div className="relative w-full">
      <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <BaseCombobox.Input
        data-slot="combobox-input"
        placeholder={placeholder}
        className={cn(
          // debossed — the field is carved into the surface (inset well shadow).
          "flex h-10 w-full min-w-0 rounded-md squircle border border-border/60 bg-muted pl-9 pr-16 py-1 text-sm shadow-well outline-none",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
        {showClear && (
          <BaseCombobox.Clear
            data-slot="combobox-clear"
            className="text-muted-foreground hover:text-foreground flex size-6 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            aria-label="Clear"
          >
            <X className="size-4" />
          </BaseCombobox.Clear>
        )}
        <BaseCombobox.Icon
          data-slot="combobox-icon"
          className="text-muted-foreground pointer-events-none flex size-6 items-center justify-center"
        >
          <ChevronsUpDown className="size-4" />
        </BaseCombobox.Icon>
      </div>
    </div>
  )
}

/** Portal + Positioner + Popup — the floating list, with overlay-depth motion. */
function ComboboxContent({
  className,
  children,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & { sideOffset?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} className="z-50">
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto overscroll-contain rounded-lg squircle border p-1 shadow-overlay outline-none",
            className
          )}
          // seam motion: floating surface rises with overlay depth.
          render={
            <motion.div
              initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}
              animate={depth.overlay.animate}
              transition={reduceMotion ? fades.normal : springs.surface}
            />
          }
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

/**
 * The list. Pass a render function as the child to map over filtered items:
 * `<ComboboxList>{(item) => <ComboboxItem value={item}>{item.label}</ComboboxItem>}</ComboboxList>`
 */
function ComboboxList({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.List>) {
  return (
    <BaseCombobox.List
      data-slot="combobox-list"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md squircle py-1.5 pl-2 pr-8 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <BaseCombobox.ItemIndicator className="absolute right-2 flex items-center">
        <Check className="size-4" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

/** Shown only when the filter yields no matches. */
function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      // Base UI keeps this element mounted (for screen-reader announcements)
      // and only renders children when the list is actually empty. `empty:`
      // collapses its padding to zero height while there are matches, so it
      // doesn't leave a gap at the top of the popup.
      className={cn(
        "text-muted-foreground py-6 text-center text-sm empty:py-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxGroup(props: React.ComponentProps<typeof BaseCombobox.Group>) {
  return <BaseCombobox.Group data-slot="combobox-group" {...props} />
}

function ComboboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.GroupLabel>) {
  return (
    <BaseCombobox.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

// Base UI's Combobox has no Separator part, so this is a plain divider.
function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-separator"
      role="separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
}
