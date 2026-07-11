"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { personalities } from "@/lib/motion"

const NAMES = ["seam", "brisk", "relaxed", "playful"] as const
type Name = (typeof NAMES)[number]

/**
 * Feel the personality dial live. Picking a personality retunes the four
 * sample interactions below — press, toggle, overlay, accent — so you can
 * feel `seam` vs `playful` before committing the one-line change in
 * `lib/motion.ts`. Each sample mirrors a real component's spring role; under
 * reduced motion they swap movement for opacity, exactly like the library.
 */
export function MotionPlayground() {
  const [name, setName] = React.useState<Name>("seam")
  const reduce = useReducedMotion() ?? false
  const springs = personalities[name]

  const [on, setOn] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [accent, setAccent] = React.useState(0)

  return (
    <div className="squircle bg-card space-y-4 rounded-xl border p-4">
      {/* personality picker — a debossed well of keys */}
      <div
        role="group"
        aria-label="Personality"
        className="bg-muted squircle shadow-well flex gap-1 rounded-lg p-1"
      >
        {NAMES.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={name === n}
            onClick={() => setName(n)}
            className={cn(
              "squircle flex-1 rounded-md px-2 py-1.5 text-xs font-medium capitalize outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-ring/50",
              name === n
                ? "bg-secondary text-secondary-foreground shadow-resting"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {n}
          </button>
        ))}
      </div>

      {/* four samples, one per spring role */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* press */}
        <Sample label="Press · press">
          <motion.button
            type="button"
            whileTap={reduce ? { opacity: 0.7 } : { scale: 0.94 }}
            transition={reduce ? { duration: 0.12 } : springs.press}
            className="bg-secondary text-secondary-foreground squircle shadow-resting size-14 rounded-xl text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            Tap
          </motion.button>
        </Sample>

        {/* toggle → snappy */}
        <Sample label="Toggle · snappy">
          <button
            type="button"
            role="switch"
            aria-checked={on}
            onClick={() => setOn((v) => !v)}
            className={cn(
              "flex h-8 w-14 items-center rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              on ? "bg-primary justify-end" : "bg-input justify-start"
            )}
          >
            <motion.span
              layout
              transition={reduce ? { duration: 0 } : springs.snappy}
              className="bg-card size-6 rounded-full shadow-resting"
            />
          </button>
        </Sample>

        {/* overlay → surface */}
        <Sample label="Overlay · surface">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="bg-secondary text-secondary-foreground squircle shadow-resting rounded-lg px-3 py-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Open
            </button>
            {open && (
              <motion.div
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 6 }
                }
                animate={
                  reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
                }
                transition={reduce ? { duration: 0.2 } : springs.surface}
                className="bg-popover squircle shadow-overlay absolute left-1/2 top-full z-10 mt-2 w-28 -translate-x-1/2 rounded-lg border p-2 text-center text-[0.6875rem]"
              >
                Overlay depth
              </motion.div>
            )}
          </div>
        </Sample>

        {/* accent → bouncy */}
        <Sample label="Accent · bouncy">
          <motion.button
            key={accent}
            type="button"
            onClick={() => setAccent((v) => v + 1)}
            initial={reduce ? { opacity: 0.4 } : { scale: 0.6 }}
            animate={reduce ? { opacity: 1 } : { scale: 1 }}
            transition={reduce ? { duration: 0.2 } : springs.bouncy}
            className="bg-primary text-primary-foreground squircle shadow-resting rounded-full px-3 py-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            Pop
          </motion.button>
        </Sample>
      </div>

      <p className="text-muted-foreground text-xs">
        Previewing <code className="text-foreground">personalities.{name}</code>{" "}
        — in your app this is one line in <code>lib/motion.ts</code>. Every
        component retunes together.
      </p>
    </div>
  )
}

function Sample({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-20 items-center justify-center">{children}</div>
      <span className="text-muted-foreground text-center text-[0.625rem] leading-tight">
        {label}
      </span>
    </div>
  )
}
