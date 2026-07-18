"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, TerminalSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { useCopy } from "@/lib/use-copy"
import { AgentStatus, type AgentState } from "./agent-status"
import { Button } from "./button"

// Lightweight status-line tinting for plain-string output: a cheap pass that
// greens pass/✓ lines and reds fail/error/✗ lines — no ANSI plumbing, no deps.
// Errors win over successes so a mixed "1 failed" line still reads red; leads
// on the line's symbol/keyword to avoid false positives ("no errors found"
// stays neutral). Consumers who need real ANSI colors pass their own nodes.
function outputLineClass(line: string): string {
  const t = line.trimStart()
  if (
    /^(?:[✗✘×✖⨯]|error|fail|fatal|panic)/i.test(t) ||
    /\b\d+\s+(?:failed|errors?)\b/i.test(t)
  )
    return "text-destructive"
  if (
    /^(?:[✓✔√]|pass)/i.test(t) ||
    /\b\d+\s+passed\b/i.test(t) ||
    /\ball\s+(?:tests?\s+)?passed\b/i.test(t)
  )
    return "text-emerald-600 dark:text-emerald-500"
  if (/^(?:[⚠]|warn)/i.test(t)) return "text-amber-600 dark:text-amber-500"
  if (/^\$\s/.test(t)) return "text-muted-foreground" // shell prompt echo
  return ""
}

function TintedOutput({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <>
      {lines.map((line, i) => {
        const cls = outputLineClass(line)
        return (
          <React.Fragment key={i}>
            {cls ? <span className={cls}>{line}</span> : line}
            {i < lines.length - 1 ? "\n" : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

// The code-block sibling for command output: a debossed well you read into,
// with the command and live agent-status in an embossed header. A thread /
// review element, not a live PTY — output arrives as children.
function TerminalBlock({
  command,
  status,
  copyText,
  tint = true,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  command: string
  /** Shared agent vocabulary: working / waiting (needs input) / done / error. */
  status?: AgentState
  /** Text the copy key copies; defaults to string children. */
  copyText?: string
  /** Auto-tint pass/fail lines when the output is a plain string. Off → verbatim. */
  tint?: boolean
  children?: React.ReactNode
}) {
  const { copied, copy } = useCopy()
  const raw = typeof children === "string" ? children : undefined
  const text = copyText ?? raw

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
            onClick={() => text !== undefined && copy(text)}
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
          {tint && raw !== undefined ? <TintedOutput text={raw} /> : children}
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
