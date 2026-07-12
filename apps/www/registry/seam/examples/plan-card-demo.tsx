"use client"

import * as React from "react"

import {
  PlanCard,
  PlanCardStep,
  type PlanDecision,
} from "@/registry/seam/ui/plan-card"
import { Button } from "@/registry/seam/ui/button"

export default function PlanCardDemo() {
  const [decision, setDecision] = React.useState<PlanDecision | undefined>(
    undefined
  )

  return (
    <div className="flex flex-col items-start gap-3">
      <PlanCard
        description="Migrate billing webhooks to the new queue."
        decision={decision}
        onApprove={() => setDecision("approved")}
        onReject={() => setDecision("rejected")}
      >
        <PlanCardStep index={1}>
          Add a queue consumer for stripe events
        </PlanCardStep>
        <PlanCardStep index={2}>
          Backfill unprocessed webhooks from the log
        </PlanCardStep>
        <PlanCardStep index={3}>
          Cut the legacy endpoint over behind a flag
        </PlanCardStep>
        <PlanCardStep index={4}>Run the billing e2e suite</PlanCardStep>
      </PlanCard>
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
