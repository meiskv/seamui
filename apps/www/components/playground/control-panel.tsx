"use client"

import * as React from "react"
import { Shuffle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import { Label } from "@/registry/seam/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"
import { Slider } from "@/registry/seam/ui/slider"
import { Switch } from "@/registry/seam/ui/switch"
import type {
  Knob,
  KnobValue,
  KnobValues,
  PlaygroundSpec,
} from "@/lib/playground/types"

/** Enum/number knobs this small render as a dropdown rather than a slider. */
const SELECT_MAX_RANGE = 8

function KnobRow({
  knob,
  value,
  onChange,
  disabled,
}: {
  knob: Knob
  value: KnobValue
  onChange: (next: KnobValue) => void
  disabled: boolean
}) {
  const id = `knob-${knob.id}`

  const control = () => {
    switch (knob.kind) {
      case "enum":
        return (
          <Select
            value={typeof value === "string" ? value : knob.default}
            onValueChange={(next: unknown) => onChange(String(next))}
            disabled={disabled}
          >
            <SelectTrigger variant="ghost" id={id} className="-mr-2">
              {/* Show the option's label, not its raw value ("Icon", not "icon"). */}
              <SelectValue>
                {(current: unknown) =>
                  knob.options.find((o) => o.value === current)?.label ??
                  String(current ?? "")
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="min-w-32">
              {knob.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "boolean":
        return (
          <Switch
            id={id}
            checked={value === true}
            onCheckedChange={(next: boolean) => onChange(next)}
            disabled={disabled}
          />
        )

      case "number": {
        const current = typeof value === "number" ? value : knob.default
        const step = knob.step ?? 1
        const range = (knob.max - knob.min) / step
        // A short range is a picker, not a scrub — matches how the docs
        // express small enumerable counts.
        if (range <= SELECT_MAX_RANGE) {
          const options = Array.from(
            { length: range + 1 },
            (_, i) => knob.min + i * step
          )
          return (
            <Select
              value={String(current)}
              onValueChange={(next: unknown) => onChange(Number(next))}
              disabled={disabled}
            >
              <SelectTrigger variant="ghost" id={id} className="-mr-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-20">
                {options.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }
        return (
          <div className="flex w-32 items-center gap-2">
            <Slider
              id={id}
              value={current}
              min={knob.min}
              max={knob.max}
              step={step}
              disabled={disabled}
              onValueChange={(next: number | readonly number[]) =>
                onChange(
                  Array.isArray(next) ? (next[0] ?? knob.min) : Number(next)
                )
              }
            />
            <span className="text-muted-foreground w-6 text-right text-xs tabular-nums">
              {current}
            </span>
          </div>
        )
      }

      case "text":
        return (
          <Input
            id={id}
            value={typeof value === "string" ? value : ""}
            placeholder={knob.placeholder}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-40 text-right"
          />
        )
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-9 items-center justify-between gap-3",
        // An inapplicable knob dims rather than disappearing, so the panel
        // doesn't reflow every time a variant changes.
        disabled && "opacity-45"
      )}
    >
      <Label
        htmlFor={id}
        className={cn("text-sm font-normal", disabled && "cursor-default")}
      >
        {knob.label}
      </Label>
      {control()}
    </div>
  )
}

export function ControlPanel({
  spec,
  values,
  onChange,
  onShuffle,
  className,
}: {
  spec: PlaygroundSpec
  values: KnobValues
  onChange: (id: string, next: KnobValue) => void
  onShuffle: () => void
  className?: string
}) {
  // Preserve authoring order, but collect each group's knobs together.
  const groups = React.useMemo(() => {
    const out: Array<{ title: string | null; knobs: Knob[] }> = []
    for (const knob of spec.knobs) {
      const title = knob.group ?? null
      const existing = out.find((g) => g.title === title)
      if (existing) existing.knobs.push(knob)
      else out.push({ title, knobs: [knob] })
    }
    return out
  }, [spec])

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between gap-2 px-4 pb-2 pt-4">
        <h2 className="text-sm font-semibold tracking-tight">
          Playground variant
        </h2>
        <Button
          variant="ghost"
          size="icon"
          haptic="tick"
          onClick={onShuffle}
          aria-label="Shuffle variant"
          className="text-muted-foreground size-7"
        >
          <Shuffle className="size-4" />
        </Button>
      </div>

      <div className="space-y-4 px-4 pb-6">
        {groups.map((group) => (
          <div key={group.title ?? "_"} className="space-y-1">
            {group.title ? (
              <p className="text-muted-foreground pb-1 text-xs font-medium">
                {group.title}
              </p>
            ) : null}
            {group.knobs.map((knob) => (
              <KnobRow
                key={knob.id}
                knob={knob}
                value={values[knob.id] ?? knob.default}
                disabled={knob.when ? !knob.when(values) : false}
                onChange={(next) => onChange(knob.id, next)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
