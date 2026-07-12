"use client"

import * as React from "react"

import { AgentStatus, type AgentState } from "@/registry/seam/ui/agent-status"
import { Button } from "@/registry/seam/ui/button"

const ORDER: AgentState[] = ["waiting", "working", "ready", "done", "error"]

// The chip is aria-live, so cycling states here is also a screen-reader demo:
// each change announces politely without interrupting.
export default function AgentStatusLive() {
  const [index, setIndex] = React.useState(1)

  return (
    <div className="flex items-center gap-4">
      <AgentStatus status={ORDER[index]} />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIndex((i) => (i + 1) % ORDER.length)}
      >
        Next state
      </Button>
    </div>
  )
}
