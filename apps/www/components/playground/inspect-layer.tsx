"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { fades } from "@/lib/motion"

type Hit = {
  slot: string
  tag: string
  top: number
  left: number
  width: number
  height: number
}

/**
 * Inspect mode: hovering the preview outlines the nearest `data-slot` and
 * names it. Every seamui wrapper carries a `data-slot`, so the anatomy of a
 * composed component is readable without opening its source.
 *
 * The overlay never takes pointer events — the preview stays fully usable
 * while you're inspecting it.
 */
export function InspectLayer({
  active,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const [hit, setHit] = React.useState<Hit | null>(null)

  React.useEffect(() => {
    if (!active) {
      setHit(null)
      return
    }
    const host = hostRef.current
    if (!host) return

    const onMove = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const slotted = target.closest<HTMLElement>("[data-slot]")
      if (!slotted || !host.contains(slotted)) {
        setHit(null)
        return
      }
      const hostRect = host.getBoundingClientRect()
      const rect = slotted.getBoundingClientRect()
      setHit({
        slot: slotted.dataset.slot ?? "",
        tag: slotted.tagName.toLowerCase(),
        top: rect.top - hostRect.top,
        left: rect.left - hostRect.left,
        width: rect.width,
        height: rect.height,
      })
    }
    const onLeave = () => setHit(null)

    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    return () => {
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [active])

  return (
    <div ref={hostRef} className="relative">
      {children}
      <AnimatePresence>
        {active && hit ? (
          <motion.div
            aria-hidden
            // opacity-only, so it reads the same with reduced motion on.
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fades.fast}
            className="pointer-events-none absolute z-20"
            style={{
              top: hit.top,
              left: hit.left,
              width: hit.width,
              height: hit.height,
            }}
          >
            <div className="ring-ring/70 absolute inset-0 rounded-sm ring-2" />
            <span className="bg-primary text-primary-foreground absolute -top-5 left-0 rounded-sm px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap">
              {hit.slot || hit.tag}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
