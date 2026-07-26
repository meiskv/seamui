"use client"

import type * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  springs,
  fades,
  depth,
  reduced,
  useMounted,
  useReducedMotion,
} from "@/lib/motion"
import { Button } from "./button"

// A horizontally scrollable row of prompt chips. The scrollbar is hidden but
// the row stays keyboard-scrollable and every chip is a real button, so focus
// rings are never clipped (no edge-fade mask, on purpose).
function Suggestions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="suggestions"
      className={cn(
        "flex w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    />
  )
}

// Each suggestion is a small embossed key — it's pressable, so it *is* a
// Button (never a hand-rolled chip). Pass `index` to opt into a staggered
// entrance; under reduced motion the stagger drops and it simply fades in.
function Suggestion({
  className,
  index = 0,
  ...props
}: React.ComponentProps<typeof Button> & { index?: number }) {
  const reduceMotion = useReducedMotion()
  const mounted = useMounted()

  return (
    <motion.div
      className="shrink-0"
      // gate the moving entrance behind mount (SSR hydration safety); chips
      // added after mount still stagger in.
      initial={
        mounted
          ? reduceMotion
            ? reduced.fadeIn.initial
            : depth.overlay.initial
          : false
      }
      animate={depth.overlay.animate}
      transition={{
        ...(reduceMotion ? fades.normal : springs.snappy),
        delay: reduceMotion ? 0 : index * 0.04,
      }}
    >
      <Button
        data-slot="suggestion"
        variant="outline"
        size="sm"
        className={cn("rounded-full font-normal", className)}
        {...props}
      />
    </motion.div>
  )
}

export { Suggestions, Suggestion }
