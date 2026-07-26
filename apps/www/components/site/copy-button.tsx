"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { Button } from "@/registry/seam/ui/button"

/** A small copy-to-clipboard key — the code-block crossfade (Copy → Check),
 *  reused for the landing install rows. */
export function CopyButton({
  text,
  className,
  label = "Copy command",
}: {
  text: string
  className?: string
  /** Accessible name for the idle state — override when it isn't a command. */
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (insecure context) — silently no-op
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn("text-muted-foreground size-8 shrink-0", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fades.fast}
          className="flex items-center justify-center"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
