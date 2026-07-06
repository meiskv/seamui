"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

const MotionThumb = motion.create(BaseSlider.Thumb)

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseSlider.Root
      data-slot="slider"
      className={cn("relative w-full touch-none select-none", className)}
      {...props}
    >
      <BaseSlider.Control className="flex w-full items-center py-2">
        <BaseSlider.Track
          data-slot="slider-track"
          className="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full"
        >
          <BaseSlider.Indicator
            data-slot="slider-indicator"
            className="bg-primary absolute h-full rounded-full"
          />
        </BaseSlider.Track>
        <MotionThumb
          data-slot="slider-thumb"
          className="bg-card block size-4 rounded-full border border-primary/60 shadow-resting outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          // seam motion: the thumb swells slightly when grabbed.
          whileTap={reduceMotion ? reduced.pressed : depth.raised}
          transition={reduceMotion ? fades.fast : springs.snappy}
        />
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

export { Slider }
