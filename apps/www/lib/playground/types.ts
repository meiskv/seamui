import type * as React from "react"

/** Every knob resolves to one of these. */
export type KnobValue = string | number | boolean

/** The current configuration of a component, keyed by knob id. */
export type KnobValues = Record<string, KnobValue>

export type KnobOption = { value: string; label: string }

type KnobCommon = {
  /** Stable id — the key in the values object, the URL, and saved presets. */
  id: string
  label: string
  /** Control-panel section heading, e.g. "Card" / "Actions". */
  group?: string
  /** Dim + disable the control when it doesn't apply to the current config
   *  (e.g. a Button's label is meaningless at `size="icon"`). The knob keeps
   *  its value — it just stops mattering — so flipping back restores it. */
  when?: (values: KnobValues) => boolean
}

export type Knob =
  | (KnobCommon & {
      kind: "enum"
      options: readonly KnobOption[]
      default: string
    })
  | (KnobCommon & { kind: "boolean"; default: boolean })
  | (KnobCommon & {
      kind: "number"
      min: number
      max: number
      step?: number
      default: number
    })
  | (KnobCommon & { kind: "text"; default: string; placeholder?: string })

export type PlaygroundSpec = {
  /** URL slug — matches the registry component name. */
  id: string
  title: string
  /** Sidebar section; mirrors the docs nav groups. */
  group: string
  description: string
  knobs: readonly Knob[]
  /** The live preview for a configuration. */
  render: (values: KnobValues) => React.ReactNode
  /** Copy-pasteable source for the same configuration. */
  code: (values: KnobValues) => string
  /** Extra classes for the preview stage (e.g. a wider column). */
  stageClassName?: string
}

/* Typed accessors — knob values are a union, and every spec would otherwise
 * repeat the same casts. Each falls back to the type's zero value so a
 * malformed URL can never crash a render. */

export function str(values: KnobValues, id: string): string {
  const v = values[id]
  return typeof v === "string" ? v : ""
}

export function bool(values: KnobValues, id: string): boolean {
  return values[id] === true
}

export function num(values: KnobValues, id: string): number {
  const v = values[id]
  return typeof v === "number" ? v : 0
}
