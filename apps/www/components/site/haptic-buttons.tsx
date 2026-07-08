"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Volume2, VolumeX } from "lucide-react"
import { useWebHaptics } from "web-haptics/react"

import { Button } from "@/registry/seam/ui/button"
import { fades } from "@/lib/motion"

/**
 * WIP preview of seam's touch-feedback pillar with real haptics — the juicy
 * button feel of haptics.lochie.me, driven by its own library (web-haptics).
 * On press each key springs (seam depth), fires the web-haptics feedback
 * (Vibration API on Android, the taptic "switch" trick on iOS, plus the
 * library's click audio), and bursts emoji bubbles. The Expo / React Native
 * build swaps web-haptics for on-device expo-haptics.
 */
type Tap = {
  label: string
  preset: "light" | "medium" | "heavy"
  emojis: string[]
}

const TAPS: Tap[] = [
  { label: "Light", preset: "light", emojis: ["✨", "🫧"] },
  { label: "Medium", preset: "medium", emojis: ["💫", "🫧", "✨"] },
  { label: "Heavy", preset: "heavy", emojis: ["💥", "🔥", "⚡️"] },
]

type Bubble = { id: number; emoji: string; dx: number }

function TapButton({
  tap,
  reduce,
  onTap,
}: {
  tap: Tap
  reduce: boolean
  onTap: (preset: Tap["preset"]) => void
}) {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([])
  const nextId = React.useRef(0)

  function press() {
    onTap(tap.preset)
    const count = reduce ? 1 : 3
    const spawned: Bubble[] = Array.from({ length: count }, () => ({
      id: nextId.current++,
      emoji: tap.emojis[Math.floor(Math.random() * tap.emojis.length)],
      dx: Math.round((Math.random() - 0.5) * 44),
    }))
    setBubbles((b) => [...b, ...spawned])
  }

  return (
    <span className="relative inline-flex">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.span
            key={bubble.id}
            aria-hidden
            className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 text-lg select-none"
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.4 }}
            animate={
              reduce
                ? { opacity: [0, 1, 0] }
                : { opacity: [0, 1, 1, 0], y: -72, x: bubble.dx, scale: 1 }
            }
            transition={reduce ? fades.normal : { duration: 1, ease: "easeOut" }}
            onAnimationComplete={() =>
              setBubbles((b) => b.filter((x) => x.id !== bubble.id))
            }
          >
            {bubble.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
      <Button variant="secondary" onPointerDown={press}>
        {tap.label}
      </Button>
    </span>
  )
}

export function HapticButtons() {
  const [muted, setMuted] = React.useState(false)
  const reduce = useReducedMotion() ?? false
  // debug: true makes web-haptics also play its click audio on every device
  // (by default the audio only fires as the iOS fallback) — the "lochie feel".
  const { trigger } = useWebHaptics({ debug: true })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {TAPS.map((tap) => (
          <TapButton
            key={tap.label}
            tap={tap}
            reduce={reduce}
            onTap={(preset) => {
              if (!muted) void trigger(preset)
            }}
          />
        ))}
        <Button
          variant="ghost"
          size="icon"
          aria-label={muted ? "Unmute tap feedback" : "Mute tap feedback"}
          aria-pressed={muted}
          className="text-muted-foreground ml-auto"
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </Button>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Tap a key — it springs, clicks, and bursts emoji. On a phone it buzzes
        too (Android Vibration API / iOS taptic). Real on-device haptics arrive
        with the Expo / React Native build.
      </p>
    </div>
  )
}
