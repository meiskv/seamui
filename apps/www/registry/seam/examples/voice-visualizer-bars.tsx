"use client"

import * as React from "react"

import { VoiceVisualizer } from "@/registry/seam/ui/voice-visualizer"

export default function VoiceVisualizerBars() {
  const [level, setLevel] = React.useState(0.3)
  React.useEffect(() => {
    const id = setInterval(
      () => setLevel(0.2 + Math.abs(Math.sin(performance.now() / 260)) * 0.8),
      80
    )
    return () => clearInterval(id)
  }, [])

  return (
    <VoiceVisualizer
      variant="bars"
      state="speaking"
      level={level}
      count={7}
      size="lg"
    />
  )
}
