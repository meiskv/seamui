import {
  Tool,
  ToolContent,
  ToolHeader,
} from "@/registry/seam/ui/tool"

export default function ToolError() {
  return (
    <div className="w-full max-w-md">
      <Tool defaultOpen>
        <ToolHeader title="charge_card" status="error" />
        <ToolContent>
          <p className="text-destructive">
            402 Payment Required — the card was declined. No retry attempted.
          </p>
        </ToolContent>
      </Tool>
    </div>
  )
}
