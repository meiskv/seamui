import { AgentStatus } from "@/registry/seam/ui/agent-status"

export default function AgentStatusDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <AgentStatus status="waiting" />
      <AgentStatus status="working" />
      <AgentStatus status="ready" />
      <AgentStatus status="done" />
      <AgentStatus status="error" />
    </div>
  )
}
