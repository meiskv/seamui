"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion"

const MotionThumb = motion.create(BaseSwitch.Thumb)

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        // track — the thumb rides from left to right via the flex justify swap.
        "inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 outline-none",
        "bg-input data-[checked]:bg-primary",
        "justify-start data-[checked]:justify-end",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <MotionThumb
        data-slot="switch-thumb"
        // seam motion: `layout` springs the thumb when justify flips on toggle.
        layout
        transition={springs.snappy}
        className="bg-background size-4 rounded-full shadow-resting"
      />
    </BaseSwitch.Root>
  )
}

export { Switch }
