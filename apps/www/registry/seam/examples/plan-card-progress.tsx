import {
  PlanCard,
  PlanCardCheckpoint,
  PlanCardStep,
} from "@/registry/seam/ui/plan-card"

// The same card mid-execution: approved, steps completing, and the
// checkpoint strip sitting in the timeline below it.
export default function PlanCardProgress() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <PlanCard title="Executing plan" decision="approved">
        <PlanCardStep index={1} done>
          Add a queue consumer for stripe events
        </PlanCardStep>
        <PlanCardStep index={2} done>
          Backfill unprocessed webhooks from the log
        </PlanCardStep>
        <PlanCardStep index={3}>
          Cut the legacy endpoint over behind a flag
        </PlanCardStep>
        <PlanCardStep index={4}>Run the billing e2e suite</PlanCardStep>
      </PlanCard>
      <PlanCardCheckpoint label="Checkpoint before step 3" />
    </div>
  )
}
