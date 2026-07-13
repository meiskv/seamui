"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  CommandPalette,
  CommandPaletteContent,
  CommandPaletteEmpty,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteTrigger,
} from "@/registry/seam/ui/command-palette"

// The minimal palette: a flat item list, no groups, no footer. ⌘K opens it
// too (the hotkey is on by default).
const ACTIONS = [
  "Go to session",
  "Review changes",
  "Create pull request",
  "Rerun checks",
  "Archive workspace",
]

export default function CommandPaletteFlat() {
  const [open, setOpen] = React.useState(false)
  const [last, setLast] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <CommandPalette open={open} onOpenChange={setOpen}>
        <CommandPaletteTrigger render={<Button variant="secondary" />}>
          Quick actions
        </CommandPaletteTrigger>
        <CommandPaletteContent items={ACTIONS}>
          <CommandPaletteInput placeholder="What do you need?" />
          <CommandPaletteEmpty>Nothing matches.</CommandPaletteEmpty>
          <CommandPaletteList>
            {(action: string) => (
              <CommandPaletteItem
                key={action}
                value={action}
                onClick={() => {
                  setLast(action)
                  setOpen(false)
                }}
              >
                {action}
              </CommandPaletteItem>
            )}
          </CommandPaletteList>
        </CommandPaletteContent>
      </CommandPalette>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {last ? `Ran: ${last}` : "Run an action to see it echoed here."}
      </p>
    </div>
  )
}
