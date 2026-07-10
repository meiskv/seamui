"use client"

import * as React from "react"

import {
  Composer,
  ComposerSubmit,
  ComposerTextarea,
  ComposerToolbar,
} from "@/registry/seam/ui/composer"
import { Suggestion, Suggestions } from "@/registry/seam/ui/suggestions"

const PROMPTS = [
  "Draft a standup update",
  "Summarize this thread",
  "Write a test plan",
]

// Selecting a suggestion fills the composer — the common empty-state pattern.
export default function SuggestionsWithComposer() {
  const [value, setValue] = React.useState("")

  return (
    <div className="w-full max-w-md space-y-3">
      <Suggestions>
        {PROMPTS.map((p, i) => (
          <Suggestion key={p} index={i} onClick={() => setValue(p)}>
            {p}
          </Suggestion>
        ))}
      </Suggestions>
      <Composer
        onSubmit={(e) => {
          e.preventDefault()
          setValue("")
        }}
      >
        <ComposerTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything…"
        />
        <ComposerToolbar>
          <ComposerSubmit disabled={!value.trim()} />
        </ComposerToolbar>
      </Composer>
    </div>
  )
}
