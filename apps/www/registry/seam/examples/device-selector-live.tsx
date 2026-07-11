"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  DeviceSelector,
  DeviceSelectorContent,
  DeviceSelectorTrigger,
} from "@/registry/seam/ui/device-selector"

// With no `devices` prop the selector enumerates real hardware. Labels are
// empty until permission is granted, so it's gated behind a click.
export default function DeviceSelectorLive() {
  const [enabled, setEnabled] = React.useState(false)
  const [value, setValue] = React.useState("")

  const enable = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((t) => t.stop())
      setEnabled(true)
    } catch {
      // denied / unavailable
    }
  }

  if (!enabled) {
    return (
      <Button variant="secondary" size="sm" onClick={enable}>
        Enable microphone
      </Button>
    )
  }

  return (
    <DeviceSelector kind="audioinput" value={value} onValueChange={setValue}>
      <DeviceSelectorTrigger />
      <DeviceSelectorContent />
    </DeviceSelector>
  )
}
