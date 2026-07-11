"use client"

import * as React from "react"

import {
  DeviceSelector,
  DeviceSelectorContent,
  DeviceSelectorTrigger,
} from "@/registry/seam/ui/device-selector"
import { MediaToggle } from "@/registry/seam/ui/media-toggle"

const DEVICES = [
  { deviceId: "default", label: "MacBook Pro Microphone" },
  { deviceId: "airpods", label: "AirPods Pro" },
]

// The common call pattern: mute is one press; picking the device is the small
// key docked beside it, both riding in a debossed well.
export default function DeviceSelectorSplit() {
  const [value, setValue] = React.useState("default")

  return (
    <div className="bg-muted flex w-fit items-center gap-1 rounded-full p-1 shadow-well">
      <MediaToggle kind="mic" defaultPressed className="size-9" />
      <DeviceSelector devices={DEVICES} value={value} onValueChange={setValue}>
        <DeviceSelectorTrigger />
        <DeviceSelectorContent />
      </DeviceSelector>
    </div>
  )
}
