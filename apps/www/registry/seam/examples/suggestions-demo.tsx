"use client"

import * as React from "react"

import { Suggestion, Suggestions } from "@/registry/seam/ui/suggestions"

const PROMPTS = [
  "Explain springs vs durations",
  "What is the debossed rule?",
  "Show me a composer",
  "How does reduced motion work?",
]

export default function SuggestionsDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)

  return (
    <div className="w-full max-w-md space-y-3">
      <Suggestions>
        {PROMPTS.map((p, i) => (
          <Suggestion key={p} index={i} onClick={() => setPicked(p)}>
            {p}
          </Suggestion>
        ))}
      </Suggestions>
      <p className="text-muted-foreground text-sm">
        {picked ? `Picked: ${picked}` : "Pick a suggestion above."}
      </p>
    </div>
  )
}
