"use client"

import { Bold, Italic, Redo2, Underline, Undo2 } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/registry/seam/ui/toolbar"

// One tab stop for the whole strip — arrow keys move between controls,
// including the embedded toggle group (its own well inside the raised strip).
export default function ToolbarDemo() {
  return (
    <Toolbar aria-label="Formatting">
      <ToggleGroup multiple aria-label="Text style">
        <Toggle value="bold" aria-label="Bold">
          <Bold />
        </Toggle>
        <Toggle value="italic" aria-label="Italic">
          <Italic />
        </Toggle>
        <Toggle value="underline" aria-label="Underline">
          <Underline />
        </Toggle>
      </ToggleGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="History">
        <ToolbarButton size="icon" className="size-9" aria-label="Undo">
          <Undo2 />
        </ToolbarButton>
        <ToolbarButton
          size="icon"
          className="size-9"
          aria-label="Redo"
          disabled
        >
          <Redo2 />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  )
}
