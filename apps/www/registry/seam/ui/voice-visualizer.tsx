"use client"

import * as React from "react"
import { motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, useMounted, useReducedMotion } from "@/lib/motion"

type VoiceState =
  | "disconnected"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"

const STATE_LABEL: Record<VoiceState, string> = {
  disconnected: "Disconnected",
  connecting: "Connecting",
  listening: "Agent is listening",
  thinking: "Agent is thinking",
  speaking: "Agent is speaking",
}

/**
 * Owned audio-level hook — samples a MediaStreamTrack's volume via Web Audio
 * on rAF and returns a 0–1 level. No dependency; consumers without a track can
 * drive the `level` prop directly. Cleans up its AudioContext on unmount.
 */
function useAudioLevel(track?: MediaStreamTrack | null): number {
  const [level, setLevel] = React.useState(0)

  React.useEffect(() => {
    if (!track) {
      setLevel(0)
      return
    }
    let raf = 0
    let stopped = false
    let ctx: AudioContext | undefined
    try {
      ctx = new AudioContext()
      const source = ctx.createMediaStreamSource(new MediaStream([track]))
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      const data = new Uint8Array(analyser.frequencyBinCount)
      const tick = () => {
        analyser.getByteFrequencyData(data)
        let sum = 0
        for (let i = 0; i < data.length; i++) sum += data[i]
        if (!stopped) setLevel(Math.min(1, (sum / data.length / 255) * 1.8))
        raf = requestAnimationFrame(tick)
      }
      tick()
    } catch {
      // no audio available (e.g. permission denied) — stay at 0
    }
    return () => {
      stopped = true
      cancelAnimationFrame(raf)
      ctx?.close().catch(() => {})
    }
  }, [track])

  return level
}

const SIZES = {
  sm: { dot: "size-1.5", bar: "w-1", gap: "gap-1", h: "h-6" },
  default: { dot: "size-2.5", bar: "w-1.5", gap: "gap-1.5", h: "h-10" },
  lg: { dot: "size-3.5", bar: "w-2", gap: "gap-2", h: "h-14" },
} as const

// Opacity-only loops (shimmer / sweep) — the sanctioned duration case; they
// stay identical under reduced motion since nothing travels.
const shimmer = (i: number): Transition => ({
  duration: 1.1,
  repeat: Infinity,
  repeatType: "mirror",
  delay: i * 0.12,
  ease: "easeInOut",
})
const sweep = (i: number): Transition => ({
  duration: 0.9,
  repeat: Infinity,
  repeatType: "mirror",
  delay: i * 0.14,
  ease: "easeInOut",
})

function dotAnimation(
  state: VoiceState,
  level: number,
  i: number,
  count: number,
  reduce: boolean,
  bars: boolean
) {
  const center = (count - 1) / 2
  const dist = center === 0 ? 0 : Math.abs(i - center) / center
  const weight = 1 - dist * 0.55 // center reacts most
  const scaleKey = bars ? "scaleY" : "scale"

  switch (state) {
    case "connecting":
      return {
        animate: { opacity: 0.85 },
        initial: { opacity: 0.25 },
        transition: shimmer(i),
      }
    case "thinking":
      return {
        animate: { opacity: 1 },
        initial: { opacity: 0.25 },
        transition: sweep(i),
      }
    case "listening":
    case "speaking": {
      const floor = state === "listening" ? 0.5 : 0.35
      const mag = Math.max(
        floor,
        floor + level * weight * (state === "speaking" ? 1.7 : 1)
      )
      return reduce
        ? {
            animate: { opacity: 0.35 + level * weight * 0.65 },
            transition: fades.fast,
          }
        : {
            animate: { [scaleKey]: mag, opacity: 1 },
            transition: springs.snappy,
          }
    }
    default: // disconnected
      return {
        animate: { opacity: 0.25, [scaleKey]: bars ? 0.5 : 1 },
        transition: fades.normal,
      }
  }
}

function VoiceVisualizer({
  state = "listening",
  level: levelProp,
  track,
  count = 5,
  size = "default",
  variant = "dots",
  className,
  "aria-label": ariaLabel,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  state?: VoiceState
  level?: number
  track?: MediaStreamTrack | null
  count?: number
  size?: keyof typeof SIZES
  variant?: "dots" | "bars"
}) {
  const reduce = useReducedMotion() ?? false
  const mounted = useMounted()
  const tracked = useAudioLevel(track)
  const level = levelProp ?? tracked
  const bars = variant === "bars"
  const s = SIZES[size]

  return (
    <div
      data-slot="voice-visualizer"
      data-state={state}
      role="status"
      aria-label={ariaLabel ?? STATE_LABEL[state]}
      className={cn(
        "flex items-center justify-center",
        s.gap,
        bars && s.h,
        className
      )}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => {
        const a = dotAnimation(state, level, i, count, reduce, bars)
        return (
          <motion.span
            key={i}
            aria-hidden
            className={cn(
              "bg-muted-foreground/60 shrink-0",
              bars
                ? cn(s.bar, "h-full origin-center rounded-full")
                : cn(s.dot, "rounded-full")
            )}
            // SSR hydration safety: `a.animate` depends on useReducedMotion()
            // + level, which differ between the server and the client's first
            // paint. Until mounted, render a deterministic resting dot (faint,
            // no transform) so both sides match; then animate to the live state.
            initial={false}
            animate={mounted ? a.animate : { opacity: 0.25 }}
            transition={a.transition}
          />
        )
      })}
    </div>
  )
}

function VoiceVisualizerCaption({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="voice-visualizer-caption"
      className={cn("text-muted-foreground text-center text-sm", className)}
      {...props}
    />
  )
}

export { VoiceVisualizer, VoiceVisualizerCaption, useAudioLevel }
