"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Toggle } from "./toggle"
import { ToggleGroup } from "./toggle-group"

// The agent/plan/ask segmented control — a thin recipe over toggle-group,
// compacted to composer-footer height. Same component fits permission modes
// (ask / auto-edit / full-auto); only the children change. The well/key
// language, press feedback, haptics, and reduced motion all come from the
// Toggle foundation.

function ModeSelector({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroup>) {
  return (
    <ToggleGroup
      data-slot="mode-selector"
      className={cn("gap-0.5 rounded-md p-1", className)}
      {...props}
    />
  )
}

function ModeOption({
  className,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  return (
    <Toggle
      data-slot="mode-option"
      size="sm"
      className={cn("h-6 min-w-0 gap-1 px-2 text-xs", className)}
      {...props}
    />
  )
}

export { ModeSelector, ModeOption }
