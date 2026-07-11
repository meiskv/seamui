"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  VoiceVisualizer,
  VoiceVisualizerCaption,
} from "@/registry/seam/ui/voice-visualizer"

// Feeds a real microphone track into the visualizer. Gated behind a click so
// the permission prompt is intentional; falls back gracefully if denied.
export default function VoiceVisualizerMic() {
  const [track, setTrack] = React.useState<MediaStreamTrack | null>(null)

  React.useEffect(() => () => track?.stop(), [track])

  const enable = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setTrack(stream.getAudioTracks()[0] ?? null)
    } catch {
      // denied / unavailable — leave the visualizer idle
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <VoiceVisualizer state="listening" track={track} size="lg" />
      {track ? (
        <VoiceVisualizerCaption>
          Speak — the dots follow your voice.
        </VoiceVisualizerCaption>
      ) : (
        <Button variant="secondary" size="sm" onClick={enable}>
          Enable microphone
        </Button>
      )}
    </div>
  )
}
