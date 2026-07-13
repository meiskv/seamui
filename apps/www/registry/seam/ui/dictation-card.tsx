"use client"

import * as React from "react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Textarea } from "./textarea"
import { VoiceVisualizer } from "./voice-visualizer"

// The Conductor dictation pattern: speech renders into a card *inside the
// composer well* as live, editable text with explicit confirm/cancel — a
// review step instead of auto-send on silence. The card is a raised key in
// the entry well: a draft token sitting in the slot, not yet committed.
// Transport-agnostic — no STT engine; transcript in, decisions out.
function DictationCard({
  value,
  onValueChange,
  onConfirm,
  onCancel,
  listening = true,
  level,
  track,
  placeholder = "Listening…",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  /** The transcript so far (controlled). */
  value: string
  onValueChange: (value: string) => void
  onConfirm: (value: string) => void
  onCancel: () => void
  /** Whether speech is still being captured. */
  listening?: boolean
  placeholder?: string
  /** Live input level 0–1 for the visualizer (or pass `track`). */
  level?: number
  track?: MediaStreamTrack | null
}) {
  const id = React.useId()

  return (
    <div
      data-slot="dictation-card"
      role="group"
      aria-labelledby={`${id}-label`}
      className={cn(
        "bg-secondary shadow-resting flex items-center gap-2 rounded-lg squircle border border-border/60 p-2",
        className
      )}
      {...props}
    >
      <span id={`${id}-label`} className="sr-only">
        Dictation
      </span>
      <VoiceVisualizer
        state={listening ? "listening" : "disconnected"}
        level={level}
        track={track}
        count={4}
        size="sm"
        className="shrink-0 self-center pl-1"
      />
      <Textarea
        data-slot="dictation-card-transcript"
        aria-label="Dictated text (editable)"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        // Bare text inside the key — no nested well, no chrome. The card is
        // the surface; the transcript is its content.
        className="min-h-8 flex-1 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0 focus-visible:border-transparent"
      />
      <div className="flex shrink-0 gap-1">
        <Button
          data-slot="dictation-card-cancel"
          variant="ghost"
          size="icon"
          className="text-muted-foreground size-8"
          aria-label="Discard dictation"
          onClick={onCancel}
        >
          <X className="size-4" />
        </Button>
        <Button
          data-slot="dictation-card-confirm"
          size="icon"
          className="size-8"
          aria-label="Use dictated text"
          disabled={value.trim().length === 0}
          onClick={() => onConfirm(value)}
        >
          <Check className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export { DictationCard }
