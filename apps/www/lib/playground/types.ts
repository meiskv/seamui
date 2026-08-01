import type * as React from "react"

/**
 * The playground's knob vocabulary.
 *
 * Only four control kinds exist on purpose: every seamui prop worth tuning is
 * an enum, a boolean, a number, or a string. Keeping the vocabulary this small
 * is what lets the control panel render itself from a schema instead of every
 * component shipping bespoke panel UI.
 */

export type EnumOption = { value: string; label: string }

type ControlBase = {
  /** Key in the knob state (and in the share URL). */
  id: string
  /** Row label in the control panel. */
  label: string
  /** Section heading this control sits under, e.g. "Card" / "Card group". */
  group?: string
  /** Disable the row when this predicate is false — e.g. Columns only
   *  matters once Orientation is a grid. */
  enabledWhen?: (state: KnobState) => boolean
}

export type EnumControl = ControlBase & {
  type: "enum"
  options: readonly EnumOption[]
  default: string
  /** "select" (default) is the compact dropdown; "segmented" is a toggle
   *  group, for 2–3 short options where the choices are worth showing. */
  as?: "select" | "segmented"
}

export type BooleanControl = ControlBase & {
  type: "boolean"
  default: boolean
}

export type NumberControl = ControlBase & {
  type: "number"
  min: number
  max: number
  step?: number
  default: number
  /** "stepper" (default) is a number field; "slider" for continuous ranges. */
  as?: "stepper" | "slider"
}

export type TextControl = ControlBase & {
  type: "text"
  default: string
  placeholder?: string
}

export type Control = EnumControl | BooleanControl | NumberControl | TextControl

export type KnobValue = string | number | boolean
export type KnobState = Record<string, KnobValue>

export type PlaygroundSpec = {
  /** Slug — matches the docs route, and is the `c` param in the share URL. */
  id: string
  title: string
  /** Nav group heading, mirroring `components/site/nav-items.ts`. */
  group: string
  /** One-line description shown under the title in the stage header. */
  blurb: string
  controls: Control[]
  /** The live preview for a knob state. */
  render: (state: KnobState) => React.ReactNode
  /** The copy-pasteable source for a knob state. */
  code: (state: KnobState) => string
  /** Extra classes for the preview stage (e.g. a wider bed for tables). */
  stageClassName?: string
}

/* ── typed accessors ──────────────────────────────────────────────────────
 * Knob state is a loose bag by necessity (it round-trips through a URL), so
 * specs read it through these instead of casting at every use site.
 */

export function str(state: KnobState, id: string, fallback = ""): string {
  const value = state[id]
  return typeof value === "string" ? value : fallback
}

export function bool(state: KnobState, id: string, fallback = false): boolean {
  const value = state[id]
  return typeof value === "boolean" ? value : fallback
}

export function num(state: KnobState, id: string, fallback = 0): number {
  const value = state[id]
  return typeof value === "number" ? value : fallback
}
