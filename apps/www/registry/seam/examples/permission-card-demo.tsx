"use client"

import * as React from "react"

import {
  PermissionCard,
  PermissionCardCommand,
  type PermissionDecision,
} from "@/registry/seam/ui/permission-card"
import { Button } from "@/registry/seam/ui/button"

// Decide and the card settles into its receipt — the thread keeps the trail.
export default function PermissionCardDemo() {
  const [decision, setDecision] = React.useState<
    PermissionDecision | undefined
  >(undefined)

  return (
    <div className="flex flex-col items-start gap-3">
      <PermissionCard
        title="Run command"
        description="The agent wants to run a shell command in the worktree."
        decision={decision}
        onAllow={(scope) =>
          setDecision(scope === "session" ? "allowed-session" : "allowed")
        }
        onDeny={() => setDecision("denied")}
      >
        <PermissionCardCommand>
          bun run test --filter billing
        </PermissionCardCommand>
      </PermissionCard>
      {decision ? (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground text-xs"
          onClick={() => setDecision(undefined)}
        >
          Reset demo
        </Button>
      ) : null}
    </div>
  )
}
