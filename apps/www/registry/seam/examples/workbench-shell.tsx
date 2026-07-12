import { AgentStatus } from "@/registry/seam/ui/agent-status"
import { ContextMeter } from "@/registry/seam/ui/context-meter"
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
import {
  WorkbenchHeader,
  WorkbenchHeaderActions,
  WorkbenchHeaderTitle,
} from "@/registry/seam/ui/workbench-header"

// The v0 shell: status-grouped sidebar + workbench header, all seamui parts.
// The thread (conversation + composer) and the review pane drop into the
// empty middle — see the AI suite.
export default function WorkbenchShell() {
  return (
    <SidebarProvider className="bg-background h-96 overflow-hidden rounded-lg border">
      <Sidebar className="w-64">
        <SidebarHeader>
          <SidebarTrigger />
          <SidebarLabel className="text-sm font-semibold">
            seamui/seamui
          </SidebarLabel>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel count={1}>Waiting on you</SidebarGroupLabel>
            <SessionItem
              title="fix-auth-redirect"
              status="waiting"
              unread={3}
              time="2m"
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
        </SidebarContent>
      </Sidebar>
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkbenchHeader>
          <WorkbenchHeaderTitle description="claude/billing-webhooks">
            migrate-billing-webhooks
          </WorkbenchHeaderTitle>
          <AgentStatus status="working" />
          <WorkbenchHeaderActions>
            <ContextMeter value={124_000} max={200_000} showValue />
          </WorkbenchHeaderActions>
        </WorkbenchHeader>
        <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
          Thread + composer go here
        </div>
      </div>
    </SidebarProvider>
  )
}
