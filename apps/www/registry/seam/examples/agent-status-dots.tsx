import {
  AgentStatusDot,
  type AgentState,
} from "@/registry/seam/ui/agent-status"

const SESSIONS: { name: string; when: string; status: AgentState }[] = [
  { name: "fix-auth-redirect", when: "2m", status: "waiting" },
  { name: "migrate-billing-webhooks", when: "now", status: "working" },
  { name: "model-picker-component", when: "18m", status: "ready" },
  { name: "bump-dependencies", when: "1h", status: "done" },
  { name: "flaky-e2e-hunt", when: "3h", status: "error" },
]

// The dot form is for dense rows — a session list where the label is the
// row itself, so the dot stays decorative next to visible text.
export default function AgentStatusDots() {
  return (
    <ul className="w-64 space-y-0.5">
      {SESSIONS.map((s) => (
        <li
          key={s.name}
          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm"
        >
          <AgentStatusDot status={s.status} />
          <span className="min-w-0 flex-1 truncate">{s.name}</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {s.when}
          </span>
        </li>
      ))}
    </ul>
  )
}
