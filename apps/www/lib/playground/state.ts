import type { Control, KnobState, PlaygroundSpec } from "./types"

/**
 * Knob state lives in two places, both client-side (the docs site has no
 * backend):
 *
 *   • the URL — the share link. Only knobs that differ from their default are
 *     written, so a link stays readable and a spec can grow new controls
 *     without invalidating links people already sent each other.
 *   • localStorage — named presets, per component.
 */

const PRESETS_KEY = "seam-playground-presets"

export function defaultsFor(spec: PlaygroundSpec): KnobState {
  const state: KnobState = {}
  for (const control of spec.controls) state[control.id] = control.default
  return state
}

/** Coerce one raw URL string into the type its control declares. */
function coerce(control: Control, raw: string): KnobState[string] | undefined {
  switch (control.type) {
    case "enum":
      return control.options.some((option) => option.value === raw)
        ? raw
        : undefined
    case "boolean":
      if (raw === "1" || raw === "true") return true
      if (raw === "0" || raw === "false") return false
      return undefined
    case "number": {
      const value = Number(raw)
      if (!Number.isFinite(value)) return undefined
      return Math.min(control.max, Math.max(control.min, value))
    }
    case "text":
      return raw
  }
}

/** Merge URL params over the spec's defaults, ignoring anything unparseable. */
export function decodeState(
  spec: PlaygroundSpec,
  params: URLSearchParams
): KnobState {
  const state = defaultsFor(spec)
  for (const control of spec.controls) {
    const raw = params.get(control.id)
    if (raw === null) continue
    const value = coerce(control, raw)
    if (value !== undefined) state[control.id] = value
  }
  return state
}

/** Serialize to `?c=<id>&…`, omitting every knob still at its default. */
export function encodeState(spec: PlaygroundSpec, state: KnobState): string {
  const params = new URLSearchParams()
  params.set("c", spec.id)
  for (const control of spec.controls) {
    const value = state[control.id]
    if (value === undefined || value === control.default) continue
    params.set(
      control.id,
      typeof value === "boolean" ? (value ? "1" : "0") : String(value)
    )
  }
  return params.toString()
}

/** A random valid state — the shuffle key. Text knobs keep their default. */
export function randomState(
  spec: PlaygroundSpec,
  pick: () => number = Math.random
): KnobState {
  const state = defaultsFor(spec)
  for (const control of spec.controls) {
    switch (control.type) {
      case "enum": {
        const option =
          control.options[Math.floor(pick() * control.options.length)]
        if (option) state[control.id] = option.value
        break
      }
      case "boolean":
        state[control.id] = pick() > 0.5
        break
      case "number": {
        const step = control.step ?? 1
        const steps = Math.floor((control.max - control.min) / step)
        state[control.id] = control.min + Math.round(pick() * steps) * step
        break
      }
      case "text":
        break
    }
  }
  return state
}

/* ── saved presets ─────────────────────────────────────────────────────── */

export type Preset = { name: string; state: KnobState }
type PresetStore = Record<string, Preset[]>

function readStore(): PresetStore {
  try {
    const raw = localStorage.getItem(PRESETS_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    return parsed && typeof parsed === "object" ? (parsed as PresetStore) : {}
  } catch {
    // storage unavailable or corrupt — behave like there are no presets.
    return {}
  }
}

function writeStore(store: PresetStore): void {
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(store))
  } catch {
    // quota or privacy mode — saving is best-effort, never fatal.
  }
}

export function loadPresets(specId: string): Preset[] {
  return readStore()[specId] ?? []
}

/** Save under `name`, replacing any preset that already has that name. */
export function savePreset(
  specId: string,
  name: string,
  state: KnobState
): Preset[] {
  const store = readStore()
  const existing = store[specId] ?? []
  const next = [
    ...existing.filter((preset) => preset.name !== name),
    { name, state },
  ]
  store[specId] = next
  writeStore(store)
  return next
}

export function deletePreset(specId: string, name: string): Preset[] {
  const store = readStore()
  const next = (store[specId] ?? []).filter((preset) => preset.name !== name)
  store[specId] = next
  writeStore(store)
  return next
}
