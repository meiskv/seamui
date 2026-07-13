import { SessionItem } from "@/registry/seam/ui/session-item"

export default function SessionItemDemo() {
  return (
    <div className="bg-muted/40 w-72 rounded-lg border p-2">
      <SessionItem title="fix-auth-redirect" status="waiting" time="2m" />
      <SessionItem
        title="migrate-billing-webhooks"
        status="working"
        time="now"
        active
      />
      <SessionItem title="model-picker-component" status="ready" time="18m" />
      <SessionItem title="bump-dependencies" status="done" time="1h" />
      <SessionItem title="flaky-e2e-hunt" status="error" time="3h" />
    </div>
  )
}
