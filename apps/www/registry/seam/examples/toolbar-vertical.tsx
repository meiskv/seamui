"use client"

import { Hand, MousePointer2, PenLine, Shapes, Type } from "lucide-react"

import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from "@/registry/seam/ui/toolbar"

// Vertical orientation — arrow keys follow the new axis automatically.
export default function ToolbarVertical() {
  return (
    <Toolbar orientation="vertical" aria-label="Canvas tools">
      <ToolbarButton size="icon" className="size-9" aria-label="Select">
        <MousePointer2 />
      </ToolbarButton>
      <ToolbarButton size="icon" className="size-9" aria-label="Pan">
        <Hand />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton size="icon" className="size-9" aria-label="Draw">
        <PenLine />
      </ToolbarButton>
      <ToolbarButton size="icon" className="size-9" aria-label="Shapes">
        <Shapes />
      </ToolbarButton>
      <ToolbarButton size="icon" className="size-9" aria-label="Text">
        <Type />
      </ToolbarButton>
    </Toolbar>
  )
}
