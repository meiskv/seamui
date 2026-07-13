"use client"

import * as React from "react"

import { DictationCard } from "@/registry/seam/ui/dictation-card"

const PHRASES = [
  "Refactor the auth middleware",
  "Refactor the auth middleware to use the new session store",
  "Refactor the auth middleware to use the new session store and add tests",
]

// Simulated dictation: the transcript grows while a synthetic level drives
// the visualizer. In a real app, feed your STT stream into `value` and the
// mic track into `track`.
export default function DictationCardDemo() {
  const [value, setValue] = React.useState(PHRASES[0])
  const [level, setLevel] = React.useState(0.4)
  const [status, setStatus] = React.useState<string | null>(null)

  React.useEffect(() => {
    let tick = 0
    const iv = setInterval(() => {
      tick++
      setLevel(0.25 + Math.abs(Math.sin(tick / 2)) * 0.6)
      if (tick % 4 === 0) {
        setValue(PHRASES[Math.min(tick / 4, PHRASES.length - 1)])
      }
    }, 500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {/* the composer well the card sits in */}
      <div className="bg-muted shadow-well rounded-lg squircle border border-border/60 p-2">
        <DictationCard
          value={value}
          onValueChange={setValue}
          listening
          level={level}
          onConfirm={(v) => setStatus(`Confirmed: “${v.slice(0, 40)}…”`)}
          onCancel={() => {
            setValue("")
            setStatus("Discarded")
          }}
        />
      </div>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {status ?? "Speech lands as editable text — nothing sends on silence."}
      </p>
    </div>
  )
}
