import { Plus } from "lucide-react"

import { AgentStatus } from "@/registry/seam/ui/agent-status"
import { BranchChip } from "@/registry/seam/ui/branch-chip"
import { Button } from "@/registry/seam/ui/button"
import { ContextMeter } from "@/registry/seam/ui/context-meter"
import {
  WorkbenchHeader,
  WorkbenchHeaderActions,
  WorkbenchHeaderTitle,
} from "@/registry/seam/ui/workbench-header"

export default function WorkbenchHeaderDemo() {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <WorkbenchHeader>
        <WorkbenchHeaderTitle description="seamui/seamui">
          migrate-billing-webhooks
        </WorkbenchHeaderTitle>
        <AgentStatus status="working" />
        <WorkbenchHeaderActions>
          <ContextMeter value={124_000} max={200_000} showValue />
          <BranchChip branch="claude/billing-webhooks" ahead={2} />
          <Button size="sm" variant="secondary" className="h-8 gap-1.5">
            <Plus className="size-4" /> New session
          </Button>
        </WorkbenchHeaderActions>
      </WorkbenchHeader>
      <div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
        Thread
      </div>
    </div>
  )
}
