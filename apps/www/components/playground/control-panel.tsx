"use client"

import * as React from "react"
import { Shuffle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"
import { Slider } from "@/registry/seam/ui/slider"
import { Switch } from "@/registry/seam/ui/switch"
import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"
import type {
  Control,
  KnobState,
  KnobValue,
  NumberControl,
  PlaygroundSpec,
} from "@/lib/playground/types"

/** Discrete steps a number control spans — small ranges become a dropdown. */
function stepCount(control: NumberControl): number {
  return Math.floor((control.max - control.min) / (control.step ?? 1)) + 1
}

function ControlField({
  control,
  value,
  disabled,
  onChange,
}: {
  control: Control
  value: KnobValue
  disabled: boolean
  onChange: (value: KnobValue) => void
}) {
  switch (control.type) {
    case "enum": {
      if (control.as === "segmented") {
        return (
          <ToggleGroup
            value={[String(value)]}
            disabled={disabled}
            // a segmented row is single-select: keep the last value if the
            // user presses the already-pressed key.
            onValueChange={(next) => {
              const picked = next.at(-1)
              if (picked) onChange(picked)
            }}
            className="p-1"
          >
            {control.options.map((option) => (
              <Toggle key={option.value} value={option.value} size="sm">
                {option.label}
              </Toggle>
            ))}
          </ToggleGroup>
        )
      }
      return (
        <Select
          value={String(value)}
          disabled={disabled}
          // Base UI types the Select value as `unknown` (it accepts any value
          // type); ours is always the option's string.
          onValueChange={(next: unknown) => onChange(String(next))}
        >
          <SelectTrigger variant="ghost" aria-label={control.label}>
            {/* Show the option's label, not the raw prop value. */}
            <SelectValue>
              {(selected: unknown) =>
                control.options.find(
                  (option) => option.value === String(selected)
                )?.label ?? String(selected)
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {control.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    case "boolean":
      return (
        <Switch
          checked={Boolean(value)}
          disabled={disabled}
          onCheckedChange={(next: boolean) => onChange(next)}
          aria-label={control.label}
        />
      )

    case "number": {
      const step = control.step ?? 1
      // A short range reads better as a dropdown (and matches the rest of the
      // panel); a long one needs a slider.
      if (control.as !== "slider" && stepCount(control) <= 12) {
        const values = Array.from({ length: stepCount(control) }, (_, index) =>
          String(control.min + index * step)
        )
        return (
          <Select
            value={String(value)}
            disabled={disabled}
            onValueChange={(next: unknown) => onChange(Number(next))}
          >
            <SelectTrigger variant="ghost" aria-label={control.label}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {values.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
      return (
        <div className="flex w-36 items-center gap-2">
          <Slider
            value={Number(value)}
            min={control.min}
            max={control.max}
            step={step}
            disabled={disabled}
            onValueChange={(next: number | readonly number[]) =>
              onChange(typeof next === "number" ? next : (next[0] ?? 0))
            }
            aria-label={control.label}
          />
          <span className="text-muted-foreground w-8 shrink-0 text-right text-xs tabular-nums">
            {String(value)}
          </span>
        </div>
      )
    }

    case "text":
      return (
        <Input
          value={String(value)}
          disabled={disabled}
          placeholder={control.placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-label={control.label}
          className="h-8 w-40 text-xs"
        />
      )
  }
}

/**
 * The right rail: the component's knobs, grouped by the part they belong to.
 * Rows are label-left / control-right so the panel scans as a spec sheet.
 */
export function ControlPanel({
  spec,
  state,
  onChange,
  onShuffle,
}: {
  spec: PlaygroundSpec
  state: KnobState
  onChange: (id: string, value: KnobValue) => void
  onShuffle: () => void
}) {
  const groups = React.useMemo(() => {
    const out: Array<{ title: string; controls: Control[] }> = []
    for (const control of spec.controls) {
      const title = control.group ?? spec.title
      const existing = out.find((entry) => entry.title === title)
      if (existing) existing.controls.push(control)
      else out.push({ title, controls: [control] })
    }
    return out
  }, [spec])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">
          Playground variant
        </h2>
        <Button
          variant="ghost"
          size="icon"
          haptic="tick"
          onClick={onShuffle}
          aria-label="Shuffle variant"
          className="text-muted-foreground size-8"
        >
          <Shuffle className="size-4" />
        </Button>
      </div>

      {groups.map((group) => (
        <section key={group.title} className="space-y-1">
          <h3 className="text-muted-foreground px-1 text-xs font-medium">
            {group.title}
          </h3>
          {group.controls.map((control) => {
            const disabled = control.enabledWhen
              ? !control.enabledWhen(state)
              : false
            return (
              <div
                key={control.id}
                className={cn(
                  "flex min-h-9 items-center justify-between gap-3 px-1",
                  disabled && "opacity-50"
                )}
              >
                <span className="text-sm">{control.label}</span>
                <ControlField
                  control={control}
                  value={state[control.id] ?? control.default}
                  disabled={disabled}
                  onChange={(value) => onChange(control.id, value)}
                />
              </div>
            )
          })}
        </section>
      ))}
    </div>
  )
}
