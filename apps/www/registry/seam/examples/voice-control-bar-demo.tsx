"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"

import {
  VoiceControlBar,
  VoiceControlBarActions,
  VoiceControlBarTrigger,
  VoiceControlBarEnd,
} from "@/registry/seam/ui/voice-control-bar"
import {
  DeviceSelector,
  DeviceSelectorContent,
  DeviceSelectorTrigger,
} from "@/registry/seam/ui/device-selector"
import { MediaToggle } from "@/registry/seam/ui/media-toggle"

const MICS = [
  { deviceId: "default", label: "MacBook Pro Microphone" },
  { deviceId: "airpods", label: "AirPods Pro" },
]

// The resting call pill: a split mic control, camera and screen keys, a chat
// toggle, and the hang-up key — all riding in one raised, rounded pill.
export default function VoiceControlBarDemo() {
  const [mic, setMic] = React.useState("default")

  return (
    <VoiceControlBar>
      <VoiceControlBarActions>
        <div className="bg-muted flex items-center gap-1 rounded-full p-1 shadow-well">
          <MediaToggle kind="mic" defaultPressed className="size-8" />
          <DeviceSelector devices={MICS} value={mic} onValueChange={setMic}>
            <DeviceSelectorTrigger />
            <DeviceSelectorContent />
          </DeviceSelector>
        </div>
        <MediaToggle kind="camera" />
        <MediaToggle kind="screen-share" />
        <VoiceControlBarTrigger>
          <MessageSquare className="size-4" />
        </VoiceControlBarTrigger>
        <VoiceControlBarEnd />
      </VoiceControlBarActions>
    </VoiceControlBar>
  )
}
