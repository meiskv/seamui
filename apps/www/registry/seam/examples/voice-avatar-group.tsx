"use client"

import * as React from "react"

import { VoiceAvatar } from "@/registry/seam/ui/voice-avatar"

const PEOPLE = [
  { name: "Ada Lovelace", src: "https://i.pravatar.cc/96?img=5" },
  { name: "Grace Hopper", src: "https://i.pravatar.cc/96?img=1" },
  { name: "Alan Turing", src: "https://i.pravatar.cc/96?img=3" },
]

// A call roster — the active speaker's halo lights up as it rotates.
export default function VoiceAvatarGroup() {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % PEOPLE.length), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-5">
      {PEOPLE.map((p, i) => (
        <VoiceAvatar
          key={p.name}
          name={p.name}
          src={p.src}
          speaking={i === active}
          level={i === active ? 0.55 : 0}
        />
      ))}
    </div>
  )
}
