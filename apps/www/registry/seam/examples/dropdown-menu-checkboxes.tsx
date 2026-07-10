"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/seam/ui/dropdown-menu"

export default function DropdownMenuCheckboxes() {
  const [panels, setPanels] = React.useState({
    status: true,
    activity: false,
    panel: true,
  })

  const set = (key: keyof typeof panels) => (v: boolean) =>
    setPanels((p) => ({ ...p, [key]: v }))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">View</Button>} />
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={panels.status}
          onCheckedChange={set("status")}
          closeOnClick={false}
        >
          Status bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={panels.activity}
          onCheckedChange={set("activity")}
          closeOnClick={false}
        >
          Activity bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={panels.panel}
          onCheckedChange={set("panel")}
          closeOnClick={false}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
