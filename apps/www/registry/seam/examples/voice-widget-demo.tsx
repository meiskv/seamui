"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"

import {
  VoiceVisualizer,
  VoiceVisualizerCaption,
} from "@/registry/seam/ui/voice-visualizer"
import {
  VoiceControlBar,
  VoiceControlBarActions,
  VoiceControlBarPanel,
  VoiceControlBarTrigger,
  VoiceControlBarEnd,
} from "@/registry/seam/ui/voice-control-bar"
import {
  Composer,
  ComposerTextarea,
  ComposerToolbar,
  ComposerSubmit,
} from "@/registry/seam/ui/composer"
import {
  DeviceSelector,
  DeviceSelectorContent,
  DeviceSelectorTrigger,
} from "@/registry/seam/ui/device-selector"
import { MediaToggle } from "@/registry/seam/ui/media-toggle"

type State = "listening" | "thinking" | "speaking"
const MICS = [
  { deviceId: "default", label: "MacBook Pro Microphone" },
  { deviceId: "airpods", label: "AirPods Pro" },
]

// A fake agent: cycles listening → thinking → speaking, and while speaking
// emits a wobbling level so the visualizer breathes without a real track. No
// timers on the server — everything runs in an effect after mount.
function useFakeAgent() {
  const [state, setState] = React.useState<State>("listening")
  const [level, setLevel] = React.useState(0)
  const stateRef = React.useRef<State>("listening")
  stateRef.current = state

  React.useEffect(() => {
    const order: State[] = ["listening", "thinking", "speaking"]
    let i = 0
    const step = window.setInterval(() => {
      i = (i + 1) % order.length
      setState(order[i])
    }, 2600)
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

  return { state, level }
}

const CAPTION: Record<State, string> = {
  listening: "Listening…",
  thinking: "Thinking…",
  speaking: "How can I help you today?",
}

// The capstone: a full voice-agent widget — a state-driven visualizer with a
// caption above the floating control pill, which expands into a text composer.
export default function VoiceWidgetDemo() {
  const { state, level } = useFakeAgent()
  const [mic, setMic] = React.useState("default")

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="flex flex-col items-center gap-4">
        <VoiceVisualizer state={state} level={level} size="lg" count={7} />
        <VoiceVisualizerCaption>{CAPTION[state]}</VoiceVisualizerCaption>
      </div>

      <VoiceControlBar className="w-full max-w-xs">
        <VoiceControlBarPanel>
          <Composer
            onSubmit={(e) => e.preventDefault()}
            className="shadow-none"
          >
            <ComposerTextarea placeholder="Type instead…" />
            <ComposerToolbar>
              <ComposerSubmit />
            </ComposerToolbar>
          </Composer>
        </VoiceControlBarPanel>
        <VoiceControlBarActions className="justify-center">
          <div className="bg-muted flex items-center gap-1 rounded-full p-1 shadow-well">
            <MediaToggle kind="mic" defaultPressed className="size-8" />
            <DeviceSelector devices={MICS} value={mic} onValueChange={setMic}>
              <DeviceSelectorTrigger />
              <DeviceSelectorContent />
            </DeviceSelector>
          </div>
          <MediaToggle kind="camera" />
          <VoiceControlBarTrigger>
            <MessageSquare className="size-4" />
          </VoiceControlBarTrigger>
          <VoiceControlBarEnd />
        </VoiceControlBarActions>
      </VoiceControlBar>
    </div>
  )
}
