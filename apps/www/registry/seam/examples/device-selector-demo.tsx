"use client"

import * as React from "react"

import {
  DeviceSelector,
  DeviceSelectorContent,
  DeviceSelectorTrigger,
} from "@/registry/seam/ui/device-selector"

const DEVICES = [
  { deviceId: "default", label: "MacBook Pro Microphone" },
  { deviceId: "airpods", label: "AirPods Pro" },
  { deviceId: "yeti", label: "Blue Yeti" },
]

export default function DeviceSelectorDemo() {
  const [value, setValue] = React.useState("default")

  return (
    <div className="flex flex-col items-center gap-3">
      <DeviceSelector devices={DEVICES} value={value} onValueChange={setValue}>
        <DeviceSelectorTrigger />
        <DeviceSelectorContent />
      </DeviceSelector>
      <p className="text-muted-foreground text-sm">
        Mic: {DEVICES.find((d) => d.deviceId === value)?.label}
      </p>
    </div>
  )
}
