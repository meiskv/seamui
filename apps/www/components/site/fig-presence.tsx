"use client"

import * as React from "react"

import {
  VoiceVisualizer,
  VoiceVisualizerCaption,
} from "@/registry/seam/ui/voice-visualizer"
import { VoiceAvatar } from "@/registry/seam/ui/voice-avatar"

type State = "listening" | "thinking" | "speaking"
const ORDER: State[] = ["listening", "thinking", "speaking"]
const CAPTION: Record<State, string> = {
  listening: "Listening…",
  thinking: "Thinking…",
  speaking: "Speaking",
}

/** The home-page presence specimen: a fake agent cycling through its states,
 *  wobbling the level while speaking so the dots breathe without a mic. */
export function FigPresence() {
  const [state, setState] = React.useState<State>("listening")
  const [level, setLevel] = React.useState(0)
  const stateRef = React.useRef<State>("listening")
  stateRef.current = state

  React.useEffect(() => {
    let i = 0
    const step = window.setInterval(() => {
      i = (i + 1) % ORDER.length
      setState(ORDER[i])
    }, 2400)
    let raf = 0
    let t = 0
    const tick = () => {
      t += 0.08
      setLevel(
        stateRef.current === "speaking" ? 0.4 + Math.abs(Math.sin(t)) * 0.5 : 0
      )
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      window.clearInterval(step)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="flex items-center gap-5">
      {/* the caller — its halo breathes with the level while the agent speaks */}
      <VoiceAvatar
        name="Aria"
        speaking={state === "speaking"}
        level={level}
        className="size-10"
      />
      <div className="flex flex-col items-center gap-3">
        <VoiceVisualizer state={state} level={level} count={5} />
        <VoiceVisualizerCaption className="text-xs">
          {CAPTION[state]}
        </VoiceVisualizerCaption>
      </div>
    </div>
  )
}
