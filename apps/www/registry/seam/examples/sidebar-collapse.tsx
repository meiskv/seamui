"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/seam/ui/sidebar"
import { SessionItem } from "@/registry/seam/ui/session-item"

// Controlled collapse: the width eases to a slim icon rail (status dots stay
// visible); labels fade on the same clock. Under reduced motion both jump.
export default function SidebarCollapse() {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className="bg-background h-64 overflow-hidden rounded-lg border"
    >
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel count={2}>Working</SidebarGroupLabel>
            <SessionItem title="migrate-billing-webhooks" status="working" />
            <SessionItem title="port-drawer-to-native" status="working" />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1 items-center justify-center">
        <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? "Collapse" : "Expand"} (or ⌘B)
        </Button>
      </div>
    </SidebarProvider>
  )
}
