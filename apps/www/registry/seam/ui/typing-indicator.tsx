"use client"

import type * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, useReducedMotion } from "@/lib/motion"

// The pre-first-token state — distinct from Spinner (generic loading): this
// says someone is about to talk. It's the reference case for reduced motion as
// a *variant*: the dots bounce (springs.bouncy, the one sanctioned use), and
// under reduced motion the bounce becomes a staggered opacity pulse. The
// feedback is never removed — it just stops traveling.
function TypingIndicator({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const reduceMotion = useReducedMotion()

  return (
    <span
      data-slot="typing-indicator"
      role="status"
      aria-label="Assistant is typing"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="bg-muted-foreground/50 size-1.5 rounded-full"
          animate={reduceMotion ? { opacity: 0.3 } : { y: -5 }}
          transition={{
            ...(reduceMotion ? fades.normal : springs.bouncy),
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  )
}

export { TypingIndicator }
