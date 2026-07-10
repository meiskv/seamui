import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/registry/seam/ui/tool"

export default function ReasoningDemo() {
  return (
    <div className="w-full max-w-md">
      <Reasoning defaultOpen>
        <ReasoningTrigger title="Reasoning" status="done" />
        <ReasoningContent>
          <p className="text-muted-foreground">
            The user asked why springs beat durations. Key points: springs carry
            velocity, so interruptions redirect smoothly; durations run a fixed
            clock that has to be fought. I&apos;ll lead with velocity.
          </p>
        </ReasoningContent>
      </Reasoning>
    </div>
  )
}
