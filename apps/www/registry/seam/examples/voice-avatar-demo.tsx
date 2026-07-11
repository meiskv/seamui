"use client"

import * as React from "react"

import { VoiceAvatar } from "@/registry/seam/ui/voice-avatar"

export default function VoiceAvatarDemo() {
  const [level, setLevel] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(
      () => setLevel(0.15 + Math.abs(Math.sin(performance.now() / 320)) * 0.85),
      80
    )
    return () => clearInterval(id)
  }, [])

  return (
    <VoiceAvatar
      name="Ada Lovelace"
      src="https://i.pravatar.cc/96?img=5"
      level={level}
      className="size-16"
    />
  )
}
