import { Inbox, Search, Settings } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarLabel,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/seam/ui/sidebar"

const ITEMS = [
  { icon: Inbox, label: "Inbox" },
  { icon: Search, label: "Search" },
  { icon: Settings, label: "Settings" },
]

export default function SidebarDemo() {
  return (
    <SidebarProvider className="bg-background h-72 overflow-hidden rounded-lg border">
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
          <SidebarLabel className="text-sm font-semibold">acme</SidebarLabel>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            {ITEMS.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="ghost"
                className="h-8 w-full justify-start gap-2.5 px-2.5 font-normal"
              >
                <Icon className="size-4 shrink-0" />
                <SidebarLabel className="flex-1 text-left">
                  {label}
                </SidebarLabel>
              </Button>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarLabel className="text-muted-foreground text-xs">
            ⌘B toggles the rail
          </SidebarLabel>
        </SidebarFooter>
      </Sidebar>
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Content
      </div>
    </SidebarProvider>
  )
}
