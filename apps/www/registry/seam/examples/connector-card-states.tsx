import { GitBranch } from "lucide-react"

import { ConnectorCard } from "@/registry/seam/ui/connector-card"

// The four OAuth states: connected carries the per-conversation switch;
// needs-auth and error take the one sanctioned hue.
export default function ConnectorCardStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <ConnectorCard
        name="GitHub"
        icon={<GitBranch />}
        connection="connected"
        enabled
      />
      <ConnectorCard
        name="GitHub"
        icon={<GitBranch />}
        connection="disconnected"
      />
      <ConnectorCard name="GitHub" icon={<GitBranch />} connection="needs-auth" />
      <ConnectorCard name="GitHub" icon={<GitBranch />} connection="error" />
    </div>
  )
}
