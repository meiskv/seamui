import type { PlaygroundSpec } from "../types"
import { alertSpec } from "./alert"
import { badgeSpec } from "./badge"
import { buttonSpec } from "./button"
import { cardSpec } from "./card"
import { dialogSpec } from "./dialog"
import { inputSpec } from "./input"
import { selectSpec } from "./select"
import { switchSpec } from "./switch"
import { tabsSpec } from "./tabs"
import { toggleGroupSpec } from "./toggle-group"

/**
 * Every component the playground can tune.
 *
 * Coverage grows a tranche at a time: a spec is hand-authored because seamui
 * components mostly take composed props, not introspectable `cva` variants —
 * only button/alert/badge/toggle expose a variant object, and even those need
 * a render function to place icons, labels, and slots. Adding a component
 * means one file here plus an entry in this list.
 */
export const SPECS: readonly PlaygroundSpec[] = [
  buttonSpec,
  inputSpec,
  selectSpec,
  switchSpec,
  toggleGroupSpec,
  dialogSpec,
  tabsSpec,
  alertSpec,
  badgeSpec,
  cardSpec,
]

/** Sidebar order — mirrors the docs nav so the two surfaces feel like one. */
const GROUP_ORDER = [
  "Forms",
  "Overlays",
  "Layout",
  "Feedback",
  "Display",
] as const

export type SpecGroup = { title: string; specs: PlaygroundSpec[] }

/** The specs bucketed into sidebar sections, in docs-nav order. */
export function groupedSpecs(
  specs: readonly PlaygroundSpec[] = SPECS
): SpecGroup[] {
  const groups: SpecGroup[] = []
  for (const title of GROUP_ORDER) {
    const matching = specs.filter((s) => s.group === title)
    if (matching.length > 0) groups.push({ title, specs: matching })
  }
  // Anything in a group we don't know about still shows up, never silently drops.
  const known = new Set<string>(GROUP_ORDER)
  const rest = specs.filter((s) => !known.has(s.group))
  for (const spec of rest) {
    const existing = groups.find((g) => g.title === spec.group)
    if (existing) existing.specs.push(spec)
    else groups.push({ title: spec.group, specs: [spec] })
  }
  return groups
}

export function findSpec(id: string | null | undefined): PlaygroundSpec {
  return SPECS.find((s) => s.id === id) ?? SPECS[0]
}
