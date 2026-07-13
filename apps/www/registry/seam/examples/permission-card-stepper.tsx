"use client"

import * as React from "react"

import {
  PermissionCard,
  PermissionCardCommand,
} from "@/registry/seam/ui/permission-card"

const QUESTIONS = [
  { title: "Install dependency", command: "bun add zod" },
  { title: "Run migration", command: "bun run db:migrate" },
  { title: "Restart dev server", command: "bun run dev" },
]

// Paseo-style multi-question runs advance one answer at a time.
export default function PermissionCardStepper() {
  const [current, setCurrent] = React.useState(0)
  const q = QUESTIONS[Math.min(current, QUESTIONS.length - 1)]
  const finished = current >= QUESTIONS.length

  if (finished) {
    return (
      <PermissionCard title="All requests handled" decision="allowed-session" />
    )
  }

  return (
    <PermissionCard
      title={q.title}
      step={{ current: current + 1, total: QUESTIONS.length }}
      onAllow={() => setCurrent((c) => c + 1)}
      onDeny={() => setCurrent((c) => c + 1)}
    >
      <PermissionCardCommand>{q.command}</PermissionCardCommand>
    </PermissionCard>
  )
}
