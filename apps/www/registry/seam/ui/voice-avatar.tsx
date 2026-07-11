"use client"

import type * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades } from "@/lib/motion"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useAudioLevel } from "./voice-visualizer"

function initials(name?: string) {
  if (!name) return ""
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

// A speaking avatar for a call roster. The photo is a raised circular key; the
// speaking indicator is a halo *outside* it (a ring), so the face never
// distorts. With a live level the halo breathes; with only `speaking` known it
// pulses; under reduced motion it drops the scale and tracks level as opacity —
// the indicator never disappears while someone is talking.
function VoiceAvatar({
  src,
  name,
  speaking,
  level: levelProp,
  track,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  src?: string
  name?: string
  speaking?: boolean
  level?: number
  track?: MediaStreamTrack | null
}) {
  const reduce = useReducedMotion() ?? false
  const tracked = useAudioLevel(track)
  const level = levelProp ?? tracked
  const active = speaking ?? level > 0.05
  const hasLevel = level > 0.02

  let animate: Record<string, number | number[]>
  let transition: Transition
  if (!active) {
    animate = { opacity: 0, scale: reduce ? 1 : 0.85 }
    transition = reduce ? fades.fast : springs.snappy
  } else if (hasLevel) {
    animate = reduce
      ? { opacity: 0.35 + level * 0.65, scale: 1 }
      : { opacity: 1, scale: 1 + level * 0.18 }
    transition = reduce ? fades.fast : springs.snappy
  } else {
    // speaking with no measured level → a gentle opacity pulse (reduced-safe).
    animate = { opacity: [0.4, 1, 0.4], scale: 1 }
    transition = { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
  }

  return (
    <div
      data-slot="voice-avatar"
      data-speaking={active || undefined}
      className="relative inline-flex"
    >
      <motion.span
        aria-hidden
        className="ring-primary/40 pointer-events-none absolute -inset-1 rounded-full ring-2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={animate}
        transition={transition}
      />
      <Avatar className={cn("size-11 shadow-resting", className)} {...props}>
        {src ? <AvatarImage src={src} alt={name ?? ""} /> : null}
        <AvatarFallback>{children ?? initials(name)}</AvatarFallback>
      </Avatar>
      <span role="status" className="sr-only">
        {active && name ? `${name} is speaking` : ""}
      </span>
    </div>
  )
}

export { VoiceAvatar }
