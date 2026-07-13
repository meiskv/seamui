"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, TerminalSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { AgentStatus, type AgentState } from "./agent-status"
import { Button } from "./button"

// The code-block sibling for command output: a debossed well you read into,
// with the command and live agent-status in an embossed header. A thread /
// review element, not a live PTY — output arrives as children.
function TerminalBlock({
  command,
  status,
  copyText,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  command: string
  /** Shared agent vocabulary: working / waiting (needs input) / done / error. */
  status?: AgentState
  /** Text the copy key copies; defaults to string children. */
  copyText?: string
  children?: React.ReactNode
}) {
  const [copied, setCopied] = React.useState(false)
  const text = copyText ?? (typeof children === "string" ? children : undefined)

  const copy = async () => {
    if (text === undefined) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (insecure context) — silently no-op
    }
  }

  return (
    <div
      data-slot="terminal-block"
      data-status={status}
      className={cn(
        "bg-muted overflow-hidden rounded-lg squircle border border-border/60 shadow-well",
        className
      )}
      {...props}
    >
      <div
        data-slot="terminal-block-header"
        // Raised control strip: the header carries the command + status chip +
        // copy key, so it's a lifted bar (bg-secondary), not part of the debossed
        // well below — otherwise a settled "done" chip reads gray-on-gray.
        className="bg-secondary flex items-center gap-2 border-b border-border/60 px-2 py-1"
      >
        <TerminalSquare
          aria-hidden
          className="text-muted-foreground size-3.5 shrink-0"
        />
        <code className="min-w-0 flex-1 truncate font-mono text-xs">
          {command}
        </code>
        {status ? <AgentStatus status={status} className="shrink-0" /> : null}
        {text !== undefined ? (
          <Button
            data-slot="terminal-block-copy"
            variant="ghost"
            size="icon"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy output"}
            className="text-muted-foreground size-7 shrink-0"
          >
            {/* Confirmation is an opacity crossfade — identical under reduced motion. */}
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
        ) : null}
      </div>
      <div
        data-slot="terminal-block-output"
        // Keyboard users can scroll long output.
        tabIndex={0}
        className="max-h-72 overflow-auto p-3 outline-none"
      >
        <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
          {children}
          {status === "working" ? (
            // Ambient cursor pulse — CSS, the Spinner precedent (see #72);
            // opacity-only so it reads identically under reduced motion.
            <span aria-hidden className="animate-pulse">
              ▍
            </span>
          ) : null}
        </pre>
      </div>
    </div>
  )
}

export { TerminalBlock }
