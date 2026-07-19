"use client"

import { Filter, RotateCw } from "lucide-react"

import {
  Toolbar,
  ToolbarButton,
  ToolbarInput,
  ToolbarSeparator,
} from "@/registry/seam/ui/toolbar"

// An entry well carved into the raised strip — search-and-act rows.
export default function ToolbarInputExample() {
  return (
    <Toolbar aria-label="Members">
      <ToolbarInput placeholder="Filter members…" aria-label="Filter members" />
      <ToolbarSeparator />
      <ToolbarButton size="icon" className="size-9" aria-label="Apply filters">
        <Filter />
      </ToolbarButton>
      <ToolbarButton size="icon" className="size-9" aria-label="Refresh">
        <RotateCw />
      </ToolbarButton>
    </Toolbar>
  )
}
