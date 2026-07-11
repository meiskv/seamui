"use client"

import * as React from "react"

import {
  Composer,
  ComposerSubmit,
  ComposerTextarea,
  ComposerToolbar,
} from "@/registry/seam/ui/composer"

// While status is "streaming" the send key becomes a stop control — same key,
// icon crossfaded — and pressing it calls onStop instead of submitting.
export default function ComposerStreaming() {
  const [value, setValue] = React.useState("")
  const [status, setStatus] = React.useState<"ready" | "streaming">("ready")
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    setValue("")
    setStatus("streaming")
    timer.current = setTimeout(() => setStatus("ready"), 4000)
  }

  const stop = () => {
    if (timer.current) clearTimeout(timer.current)
    setStatus("ready")
  }

  return (
    <div className="w-full max-w-md">
      <Composer status={status} onStop={stop} onSubmit={submit}>
        <ComposerTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            status === "streaming"
              ? "Generating…"
              : "Send, then watch the key flip"
          }
          disabled={status === "streaming"}
        />
        <ComposerToolbar>
          <ComposerSubmit disabled={status === "ready" && !value.trim()} />
        </ComposerToolbar>
      </Composer>
    </div>
  )
}
