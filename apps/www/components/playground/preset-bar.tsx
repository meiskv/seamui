"use client"

import * as React from "react"
import { RotateCcw, X } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import { CopyButton } from "@/components/site/copy-button"
import type { Preset } from "@/lib/playground/state"

/**
 * Save / restore / share. The docs site has no backend, so a configuration is
 * durable in two ways: the URL (shareable) and localStorage (named presets on
 * this device).
 */
export function PresetBar({
  presets,
  shareUrl,
  onSave,
  onApply,
  onDelete,
  onReset,
}: {
  presets: Preset[]
  shareUrl: string
  onSave: (name: string) => void
  onApply: (preset: Preset) => void
  onDelete: (name: string) => void
  onReset: () => void
}) {
  const [name, setName] = React.useState("")

  const save = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    onSave(trimmed)
    setName("")
  }

  return (
    <div className="space-y-3 border-t pt-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-muted-foreground px-1 text-xs font-medium">
          Saved
        </h3>
        <div className="flex items-center gap-1">
          <CopyButton
            text={shareUrl}
            label="Copy share link"
            className="size-8"
          />
          <Button
            variant="ghost"
            size="icon"
            haptic="tick"
            onClick={onReset}
            aria-label="Reset to defaults"
            className="text-muted-foreground size-8"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>

      <form
        className="flex items-center gap-2 px-1"
        onSubmit={(event) => {
          event.preventDefault()
          save()
        }}
      >
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Preset name"
          aria-label="Preset name"
          className="h-8 text-xs"
        />
        <Button type="submit" size="sm" disabled={!name.trim()}>
          Save
        </Button>
      </form>

      {presets.length > 0 ? (
        <ul className="space-y-1">
          {presets.map((preset) => (
            <li key={preset.name} className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onApply(preset)}
                className="flex-1 justify-start font-normal"
              >
                {preset.name}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                haptic="tick"
                onClick={() => onDelete(preset.name)}
                aria-label={`Delete preset ${preset.name}`}
                className="text-muted-foreground size-8"
              >
                <X className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground px-1 text-xs">
          No saved presets for this component yet.
        </p>
      )}
    </div>
  )
}
