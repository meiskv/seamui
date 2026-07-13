"use client"

import * as React from "react"
import {
  FilePlus,
  GitBranch,
  MessageSquarePlus,
  Moon,
  PanelLeft,
  Search,
  Settings,
  TerminalSquare,
} from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  CommandPalette,
  CommandPaletteCollection,
  CommandPaletteContent,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteTrigger,
} from "@/registry/seam/ui/command-palette"
import { Kbd, KbdGroup } from "@/registry/seam/ui/kbd"

type Command = {
  value: string
  label: string
  icon: React.ReactNode
  shortcut?: string
}
type Group = { value: string; items: Command[] }

const GROUPS: Group[] = [
  {
    value: "Session",
    items: [
      {
        value: "new-session",
        label: "New session",
        icon: <MessageSquarePlus />,
        shortcut: "⌘N",
      },
      { value: "search-sessions", label: "Search sessions", icon: <Search /> },
      {
        value: "toggle-sidebar",
        label: "Toggle sidebar",
        icon: <PanelLeft />,
        shortcut: "⌘B",
      },
    ],
  },
  {
    value: "Workspace",
    items: [
      { value: "new-worktree", label: "Create worktree", icon: <GitBranch /> },
      { value: "new-file", label: "New file", icon: <FilePlus /> },
      {
        value: "open-terminal",
        label: "Open terminal",
        icon: <TerminalSquare />,
        shortcut: "⌘T",
      },
      { value: "toggle-theme", label: "Toggle dark mode", icon: <Moon /> },
      {
        value: "settings",
        label: "Settings",
        icon: <Settings />,
        shortcut: "⌘,",
      },
    ],
  },
]

export default function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <CommandPalette open={open} onOpenChange={setOpen}>
      <CommandPaletteTrigger
        render={
          <Button
            variant="outline"
            className="text-muted-foreground gap-3 font-normal"
          />
        }
      >
        Search commands… <Kbd>⌘K</Kbd>
      </CommandPaletteTrigger>
      <CommandPaletteContent items={GROUPS}>
        <CommandPaletteInput placeholder="Type a command…" />
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        <CommandPaletteList>
          {(group: Group) => (
            <CommandPaletteGroup key={group.value} items={group.items}>
              <CommandPaletteGroupLabel>{group.value}</CommandPaletteGroupLabel>
              <CommandPaletteCollection>
                {(item: Command) => (
                  <CommandPaletteItem
                    key={item.value}
                    value={item}
                    shortcut={item.shortcut}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </CommandPaletteItem>
                )}
              </CommandPaletteCollection>
            </CommandPaletteGroup>
          )}
        </CommandPaletteList>
        <CommandPaletteFooter>
          <KbdGroup>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </KbdGroup>
          <KbdGroup>
            <Kbd>↵</Kbd> run
          </KbdGroup>
          <KbdGroup>
            <Kbd>esc</Kbd> close
          </KbdGroup>
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  )
}
