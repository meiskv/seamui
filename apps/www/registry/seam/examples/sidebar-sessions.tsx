import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarLabel,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/seam/ui/sidebar"
import { SessionItem } from "@/registry/seam/ui/session-item"

// The status-grouped sidebar — Paseo's grouping on seamui parts: sessions
// bucketed by the agent-status state machine, loudest bucket first.
export default function SidebarSessions() {
  return (
    <SidebarProvider className="bg-background h-96 overflow-hidden rounded-lg border">
      <Sidebar className="w-72">
        <SidebarHeader>
          <SidebarTrigger />
          <SidebarLabel className="text-sm font-semibold">
            seamui/seamui
          </SidebarLabel>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel count={2}>Waiting on you</SidebarGroupLabel>
            <SessionItem
              title="fix-auth-redirect"
              status="waiting"
              unread={3}
              time="2m"
            />
            <SessionItem
              title="rate-limit backoff strategy"
              status="waiting"
              unread={1}
              time="9m"
            />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel count={1}>Working</SidebarGroupLabel>
            <SessionItem
              title="migrate-billing-webhooks"
              status="working"
              time="now"
              active
            />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel count={1}>Ready to review</SidebarGroupLabel>
            <SessionItem
              title="model-picker-component"
              status="ready"
              time="18m"
            />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel count={2}>Done</SidebarGroupLabel>
            <SessionItem title="bump-dependencies" status="done" time="1h" />
            <SessionItem title="flaky-e2e-hunt" status="error" time="3h" />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Thread
      </div>
    </SidebarProvider>
  )
}
