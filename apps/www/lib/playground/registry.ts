import { badgeSpec } from "./specs/badge"
import { buttonSpec } from "./specs/button"
import { cardSpec } from "./specs/card"
import { dialogSpec } from "./specs/dialog"
import { inputSpec } from "./specs/input"
import { selectSpec } from "./specs/select"
import { sliderSpec } from "./specs/slider"
import { switchSpec } from "./specs/switch"
import { tabsSpec } from "./specs/tabs"
import { toggleGroupSpec } from "./specs/toggle-group"
import type { PlaygroundSpec } from "./types"

/**
 * The components the playground can tune, in nav order.
 *
 * This is a curated set, not the whole library: every entry is a hand-authored
 * schema (only four components expose introspectable `cva` variants, and none
 * of them describe composition choices like "does this card have media"), so
 * coverage grows deliberately rather than by codegen. Adding one is a spec
 * file plus a line here.
 */
export const SPECS: PlaygroundSpec[] = [
  buttonSpec,
  toggleGroupSpec,
  inputSpec,
  switchSpec,
  sliderSpec,
  selectSpec,
  tabsSpec,
  dialogSpec,
  cardSpec,
  badgeSpec,
]

export const DEFAULT_SPEC_ID = buttonSpec.id

export function findSpec(
  id: string | null | undefined
): PlaygroundSpec | undefined {
  if (!id) return undefined
  return SPECS.find((spec) => spec.id === id)
}

/**
 * The specs either side of `id`, in `SPECS` order — the playground's
 * prev/next pagination. Ends are `undefined` rather than wrapping, so the
 * controls disable there and the position stays legible.
 */
export function adjacentSpecs(id: string): {
  previous?: PlaygroundSpec
  next?: PlaygroundSpec
} {
  const index = SPECS.findIndex((spec) => spec.id === id)
  if (index === -1) return {}
  return { previous: SPECS[index - 1], next: SPECS[index + 1] }
}

/** Specs bucketed by nav group, preserving the order of `SPECS`. */
export function specsByGroup(): Array<{
  group: string
  specs: PlaygroundSpec[]
}> {
  const groups: Array<{ group: string; specs: PlaygroundSpec[] }> = []
  for (const spec of SPECS) {
    const existing = groups.find((entry) => entry.group === spec.group)
    if (existing) existing.specs.push(spec)
    else groups.push({ group: spec.group, specs: [spec] })
  }
  return groups
}
