"use client"

import * as React from "react"
import { Autocomplete } from "@base-ui/react/autocomplete"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { condense } from "@/lib/motion"
import { Kbd } from "./kbd"

// The ⌘K surface: Base UI Autocomplete rendered `inline` + always `open`
// inside a Dialog (the documented composition — the dialog owns mount/unmount,
// so filter, highlight, and input reset on close). The palette panel is a
// modal key rising on condense; the search field is a debossed entry well;
// shortcut hints are embossed Kbd caps.

// Root: a Dialog that also owns the global ⌘/Ctrl+K binding. Controlled or
// uncontrolled — the hotkey works either way because open state resolves here.
function CommandPalette({
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  hotkey = true,
  ...props
}: React.ComponentProps<typeof BaseDialog.Root> & {
  /** Bind ⌘/Ctrl+K to toggle the palette. */
  hotkey?: boolean
}) {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState

  // The hotkey toggles without a Base UI event to forward, so consumers of
  // onOpenChange only receive eventDetails on dialog-originated changes.
  const handleOpenChange: React.ComponentProps<
    typeof BaseDialog.Root
  >["onOpenChange"] = (next, eventDetails) => {
    if (openProp === undefined) setOpenState(next)
    onOpenChange?.(next, eventDetails)
  }

  React.useEffect(() => {
    if (!hotkey) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "k" &&
        (e.metaKey || e.ctrlKey) &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault()
        if (openProp === undefined) setOpenState(!open)
        // no Base UI eventDetails exists for a global-hotkey toggle
        onOpenChange?.(!open, undefined as never)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [hotkey, open, openProp, onOpenChange])

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange} {...props} />
  )
}

function CommandPaletteTrigger(
  props: React.ComponentProps<typeof BaseDialog.Trigger>
) {
  return <BaseDialog.Trigger data-slot="command-palette-trigger" {...props} />
}

// The panel: top-aligned modal key + the always-open inline Autocomplete.
// `items` drives Base UI's built-in filtering; `autoHighlight` keeps the top
// match ready for Enter, cmdk-style.
function CommandPaletteContent({
  items,
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup> & {
  items: React.ComponentProps<typeof Autocomplete.Root>["items"]
}) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        data-slot="command-palette-backdrop"
        className={cn("fixed inset-0 z-50 bg-black/50", condense.backdrop)}
      />
      <BaseDialog.Popup
        data-slot="command-palette-content"
        aria-label="Command palette"
        className={cn(
          "bg-popover text-popover-foreground fixed left-1/2 top-[20%] z-50 flex w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-xl squircle border shadow-modal outline-none",
          condense.surface,
          className
        )}
        {...props}
      >
        <Autocomplete.Root
          open
          inline
          autoHighlight="always"
          keepHighlight
          items={items}
        >
          {children}
        </Autocomplete.Root>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

// The debossed search well the palette opens onto.
function CommandPaletteInput({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Input>) {
  return (
    <div className="relative m-2 mb-0">
      <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Autocomplete.Input
        data-slot="command-palette-input"
        aria-label="Search commands"
        className={cn(
          "flex h-10 w-full min-w-0 rounded-md squircle border border-border/60 bg-muted py-1 pl-9 pr-3 text-sm shadow-well outline-none",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
          className
        )}
        {...props}
      />
      <BaseDialog.Close className="sr-only">
        Close command palette
      </BaseDialog.Close>
    </div>
  )
}

function CommandPaletteList({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.List>) {
  return (
    <Autocomplete.List
      data-slot="command-palette-list"
      className={cn(
        "max-h-72 overflow-y-auto overscroll-contain p-1.5 outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandPaletteGroup(
  props: React.ComponentProps<typeof Autocomplete.Group>
) {
  return <Autocomplete.Group data-slot="command-palette-group" {...props} />
}

function CommandPaletteGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.GroupLabel>) {
  return (
    <Autocomplete.GroupLabel
      data-slot="command-palette-group-label"
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium select-none",
        className
      )}
      {...props}
    />
  )
}

/** Renders the filtered items within a group. */
const CommandPaletteCollection = Autocomplete.Collection

// A command row: icon slot, label, optional Kbd shortcut. Highlight is the
// accent treatment shared with combobox/menu items.
function CommandPaletteItem({
  shortcut,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete.Item> & {
  shortcut?: React.ReactNode
}) {
  return (
    <Autocomplete.Item
      data-slot="command-palette-item"
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-md squircle px-2 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:text-muted-foreground [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
        {children}
      </span>
      {shortcut ? <Kbd className="shrink-0">{shortcut}</Kbd> : null}
    </Autocomplete.Item>
  )
}

function CommandPaletteEmpty({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Empty>) {
  return (
    <Autocomplete.Empty
      data-slot="command-palette-empty"
      className={cn(
        "text-muted-foreground py-6 text-center text-sm empty:py-0",
        className
      )}
      {...props}
    />
  )
}

// Hint row of embossed keycaps along the bottom edge.
function CommandPaletteFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-palette-footer"
      className={cn(
        "text-muted-foreground border-border/60 flex items-center gap-3 border-t px-3 py-2 text-xs",
        className
      )}
      {...props}
    />
  )
}

export {
  CommandPalette,
  CommandPaletteTrigger,
  CommandPaletteContent,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteCollection,
  CommandPaletteItem,
  CommandPaletteEmpty,
  CommandPaletteFooter,
}
