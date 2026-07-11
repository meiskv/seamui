"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import { VoiceVisualizer } from "@/registry/seam/ui/voice-visualizer"

const STATES = ["connecting", "listening", "thinking", "speaking"] as const

export default function VoiceVisualizerDemo() {
  const [i, setI] = React.useState(1)
  const state = STATES[i]
  // "listening"/"speaking" react to a live level; fake one when there's no mic.
  const [level, setLevel] = React.useState(0)

  React.useEffect(() => {
    if (state !== "listening" && state !== "speaking") return
    const id = setInterval(() => setLevel(0.2 + Math.abs(Math.sin(performance.now() / 300)) * 0.8), 80)
    return () => clearInterval(id)
  }, [state])

  return (
    <div className="flex flex-col items-center gap-5">
      <VoiceVisualizer state={state} level={level} size="lg" />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setI((n) => (n + 1) % STATES.length)}
      >
        State: {state}
      </Button>
    </div>
  )
}
