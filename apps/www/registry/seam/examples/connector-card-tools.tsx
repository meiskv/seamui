import { GitBranch } from "lucide-react"

import { ConnectorCard } from "@/registry/seam/ui/connector-card"

// Discovered tools sit behind a quiet disclosure — the MCP tool-discovery
// pattern, one press away instead of cluttering the card.
export default function ConnectorCardTools() {
  return (
    <ConnectorCard
      name="GitHub"
      icon={<GitBranch />}
      description="Issues, pull requests, and CI on your repositories."
      connection="connected"
      enabled
      tools={[
        "list_issues",
        "issue_write",
        "create_pull_request",
        "pull_request_read",
        "search_code",
        "get_file_contents",
      ]}
      className="w-full max-w-sm"
    />
  )
}
