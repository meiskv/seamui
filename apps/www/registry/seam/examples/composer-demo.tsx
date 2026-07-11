"use client"

import * as React from "react"
import { Paperclip } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Composer,
  ComposerSubmit,
  ComposerTextarea,
  ComposerToolbar,
  ComposerTools,
} from "@/registry/seam/ui/composer"
import { Kbd } from "@/registry/seam/ui/kbd"

export default function ComposerDemo() {
  const [value, setValue] = React.useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    setValue("")
  }

  return (
    <div className="w-full max-w-md">
      <Composer onSubmit={submit}>
        <ComposerTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything…"
        />
        <ComposerToolbar>
          <ComposerTools>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Attach file"
            >
              <Paperclip />
            </Button>
          </ComposerTools>
          <ComposerSubmit disabled={!value.trim()} />
        </ComposerToolbar>
      </Composer>
      <p className="text-muted-foreground mt-2 text-center text-xs">
        <Kbd>Enter</Kbd> to send · <Kbd>⇧</Kbd> <Kbd>Enter</Kbd> for a new line
      </p>
    </div>
  )
}
