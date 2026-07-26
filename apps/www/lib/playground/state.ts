import type { Knob, KnobValue, KnobValues, PlaygroundSpec } from "./types"

/** The pristine configuration for a spec. */
export function defaultValues(spec: PlaygroundSpec): KnobValues {
  const out: KnobValues = {}
  for (const knob of spec.knobs) out[knob.id] = knob.default
  return out
}

/** Coerces one untrusted value to the knob's type, or returns its default. */
function coerceKnob(knob: Knob, raw: unknown): KnobValue {
  switch (knob.kind) {
    case "enum":
      return knob.options.some((o) => o.value === raw)
        ? (raw as string)
        : knob.default
    case "boolean":
      return typeof raw === "boolean" ? raw : knob.default
    case "number": {
      if (typeof raw !== "number" || !Number.isFinite(raw)) return knob.default
      return Math.min(knob.max, Math.max(knob.min, raw))
    }
    case "text":
      // Cap length so a hostile URL can't paste a novel into the preview.
      return typeof raw === "string" ? raw.slice(0, 120) : knob.default
  }
}

/**
 * Merges an untrusted partial config over the defaults. Unknown keys are
 * dropped and every value is coerced/clamped to its knob's type, so a
 * hand-edited or stale URL degrades to defaults instead of breaking a render.
 */
export function coerceValues(spec: PlaygroundSpec, raw: unknown): KnobValues {
  const values = defaultValues(spec)
  if (typeof raw !== "object" || raw === null) return values
  const source = raw as Record<string, unknown>
  for (const knob of spec.knobs) {
    if (knob.id in source) values[knob.id] = coerceKnob(knob, source[knob.id])
  }
  return values
}

/**
 * Serializes only what differs from the defaults, so a lightly-tuned component
 * produces a short, readable link instead of a wall of every knob.
 * Returns "" when the config is pristine (the URL then carries no `k` at all).
 */
export function encodeConfig(spec: PlaygroundSpec, values: KnobValues): string {
  const diff: KnobValues = {}
  for (const knob of spec.knobs) {
    const value = values[knob.id]
    if (value !== undefined && value !== knob.default) diff[knob.id] = value
  }
  return Object.keys(diff).length > 0 ? JSON.stringify(diff) : ""
}

/** Parses an `encodeConfig` payload back into a full, validated config. */
export function decodeConfig(spec: PlaygroundSpec, raw: string): KnobValues {
  if (!raw) return defaultValues(spec)
  try {
    return coerceValues(spec, JSON.parse(raw))
  } catch {
    // malformed link — fall back to a clean slate rather than throwing
    return defaultValues(spec)
  }
}

/** Builds the shareable path for a configuration. */
export function configHref(spec: PlaygroundSpec, values: KnobValues): string {
  const encoded = encodeConfig(spec, values)
  const params = new URLSearchParams({ c: spec.id })
  if (encoded) params.set("k", encoded)
  return `/playground?${params.toString()}`
}

/**
 * A random configuration — the shuffle key. Text knobs keep their value
 * (random prose is noise, not a variant); everything else is re-rolled.
 * `rng` is injectable so tests are deterministic.
 */
export function randomValues(
  spec: PlaygroundSpec,
  rng: () => number = Math.random
): KnobValues {
  const out: KnobValues = {}
  for (const knob of spec.knobs) {
    switch (knob.kind) {
      case "enum": {
        const i = Math.min(
          knob.options.length - 1,
          Math.floor(rng() * knob.options.length)
        )
        out[knob.id] = knob.options[i]?.value ?? knob.default
        break
      }
      case "boolean":
        out[knob.id] = rng() < 0.5
        break
      case "number": {
        const step = knob.step ?? 1
        const steps = Math.floor((knob.max - knob.min) / step)
        out[knob.id] = knob.min + Math.round(rng() * steps) * step
        break
      }
      case "text":
        out[knob.id] = knob.default
        break
    }
  }
  return out
}

/* ── Saved presets ───────────────────────────────────────────────────────
 * There is no backend, so "save" is the device: named configs in
 * localStorage, keyed by component. Every access is guarded — storage can be
 * unavailable (private mode, embedded webviews) and a playground must never
 * be the thing that throws. */

const PRESETS_KEY = "seam-playground-presets"

export type Preset = { name: string; values: KnobValues }
type PresetStore = Record<string, Preset[]>

function readStore(): PresetStore {
  try {
    const raw = localStorage.getItem(PRESETS_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    return typeof parsed === "object" && parsed !== null
      ? (parsed as PresetStore)
      : {}
  } catch {
    return {}
  }
}

function writeStore(store: PresetStore): void {
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(store))
  } catch {
    // storage full or unavailable — the in-memory config still works
  }
}

/** Saved presets for one component, validated against its current knobs. */
export function loadPresets(spec: PlaygroundSpec): Preset[] {
  const saved = readStore()[spec.id]
  if (!Array.isArray(saved)) return []
  return saved
    .filter((p): p is Preset => typeof p?.name === "string")
    .map((p) => ({ name: p.name, values: coerceValues(spec, p.values) }))
}

/** Saves (or overwrites) a named preset and returns the updated list. */
export function savePreset(
  spec: PlaygroundSpec,
  name: string,
  values: KnobValues
): Preset[] {
  const trimmed = name.trim().slice(0, 40)
  if (!trimmed) return loadPresets(spec)
  const store = readStore()
  const existing = loadPresets(spec).filter((p) => p.name !== trimmed)
  const next = [...existing, { name: trimmed, values }]
  store[spec.id] = next
  writeStore(store)
  return next
}

/** Deletes a named preset and returns the updated list. */
export function deletePreset(spec: PlaygroundSpec, name: string): Preset[] {
  const store = readStore()
  const next = loadPresets(spec).filter((p) => p.name !== name)
  store[spec.id] = next
  writeStore(store)
  return next
}
