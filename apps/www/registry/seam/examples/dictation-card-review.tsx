"use client"

import * as React from "react"

import { DictationCard } from "@/registry/seam/ui/dictation-card"

// After capture: not listening anymore, the transcript is just editable text
// awaiting an explicit ✓ — the review step that makes dictation trustworthy.
export default function DictationCardReview() {
  const [value, setValue] = React.useState(
    "Add rate limiting to the webhook endpoint, then rerun the failing e2e suite."
  )

  return (
    <div className="bg-muted shadow-well w-full max-w-md rounded-lg squircle border border-border/60 p-2">
      <DictationCard
        value={value}
        onValueChange={setValue}
        listening={false}
        onConfirm={() => setValue("")}
        onCancel={() => setValue("")}
      />
    </div>
  )
}
