import { describe, expect, it, beforeEach } from "vitest"

import { attrs, imports, snippet } from "@/lib/playground/code"
import {
  coerceValues,
  configHref,
  decodeConfig,
  defaultValues,
  deletePreset,
  encodeConfig,
  loadPresets,
  randomValues,
  savePreset,
} from "@/lib/playground/state"
import { findSpec, groupedSpecs, SPECS } from "@/lib/playground/specs"
import type { PlaygroundSpec } from "@/lib/playground/types"

const spec: PlaygroundSpec = {
  id: "demo",
  title: "Demo",
  group: "Forms",
  description: "test spec",
  knobs: [
    {
      id: "variant",
      label: "Variant",
      kind: "enum",
      default: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "secondary", label: "Secondary" },
      ],
    },
    { id: "disabled", label: "Disabled", kind: "boolean", default: false },
    { id: "count", label: "Count", kind: "number", default: 2, min: 1, max: 4 },
    { id: "label", label: "Label", kind: "text", default: "Hello" },
  ],
  render: () => null,
  code: () => "",
}

describe("code helpers", () => {
  it("renders attributes by type and omits absent ones", () => {
    expect(
      attrs([
        ["variant", "secondary"],
        ["cols", 3],
        ["disabled", true],
        ["hidden", false],
        ["size", undefined],
        ["label", ""],
      ])
    ).toBe(' variant="secondary" cols={3} disabled')
  })

  it("returns an empty string when nothing is set", () => {
    expect(attrs([["size", undefined]])).toBe("")
  })

  it("sorts named imports and puts third-party modules first", () => {
    expect(
      imports({
        "@/components/ui/button": ["Button"],
        "lucide-react": ["Plus", "ArrowRight"],
        "@/components/ui/alert": ["Alert"],
        "@/components/ui/empty": [],
      })
    ).toBe(
      'import { ArrowRight, Plus } from "lucide-react"\n' +
        'import { Alert } from "@/components/ui/alert"\n' +
        'import { Button } from "@/components/ui/button"'
    )
  })

  it("drops empty snippet sections", () => {
    expect(snippet("a", "", null, "b")).toBe("a\n\nb")
  })
})

describe("knob values", () => {
  it("builds defaults from the spec", () => {
    expect(defaultValues(spec)).toEqual({
      variant: "default",
      disabled: false,
      count: 2,
      label: "Hello",
    })
  })

  it("drops unknown keys and coerces wrong types back to defaults", () => {
    expect(
      coerceValues(spec, {
        variant: "nope",
        disabled: "yes",
        count: "3",
        bogus: 1,
      })
    ).toEqual({
      variant: "default",
      disabled: false,
      count: 2,
      label: "Hello",
    })
  })

  it("clamps numbers into range", () => {
    expect(coerceValues(spec, { count: 99 }).count).toBe(4)
    expect(coerceValues(spec, { count: -5 }).count).toBe(1)
  })

  it("caps runaway text so a hostile link can't flood the preview", () => {
    const long = "x".repeat(500)
    expect(coerceValues(spec, { label: long }).label).toHaveLength(120)
  })

  it("survives a non-object payload", () => {
    expect(coerceValues(spec, null)).toEqual(defaultValues(spec))
    expect(coerceValues(spec, "nope")).toEqual(defaultValues(spec))
  })
})

describe("url round-trip", () => {
  it("encodes nothing when the config is pristine", () => {
    expect(encodeConfig(spec, defaultValues(spec))).toBe("")
    expect(configHref(spec, defaultValues(spec))).toBe("/playground?c=demo")
  })

  it("encodes only what differs from the defaults", () => {
    const values = { ...defaultValues(spec), variant: "secondary" }
    expect(encodeConfig(spec, values)).toBe('{"variant":"secondary"}')
  })

  it("round-trips a tuned config", () => {
    const values = { ...defaultValues(spec), variant: "secondary", count: 4 }
    expect(decodeConfig(spec, encodeConfig(spec, values))).toEqual(values)
  })

  it("falls back to defaults on a malformed payload", () => {
    expect(decodeConfig(spec, "{not json")).toEqual(defaultValues(spec))
    expect(decodeConfig(spec, "")).toEqual(defaultValues(spec))
  })

  it("percent-encodes the payload into the href", () => {
    const values = { ...defaultValues(spec), variant: "secondary" }
    const href = configHref(spec, values)
    expect(href.startsWith("/playground?c=demo&k=")).toBe(true)
    const parsed = new URLSearchParams(href.split("?")[1])
    expect(decodeConfig(spec, parsed.get("k") ?? "")).toEqual(values)
  })
})

describe("shuffle", () => {
  it("re-rolls every non-text knob within its domain", () => {
    const values = randomValues(spec, () => 0.99)
    expect(values.variant).toBe("secondary")
    expect(values.disabled).toBe(false) // 0.99 < 0.5 is false
    expect(values.count).toBe(4)
    // Random prose is noise, so text knobs keep their authored value.
    expect(values.label).toBe("Hello")
  })

  it("stays inside the numeric range at both extremes", () => {
    expect(randomValues(spec, () => 0).count).toBe(1)
    expect(randomValues(spec, () => 1).count).toBe(4)
  })

  it("only ever produces valid configurations", () => {
    let seed = 0
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < 50; i++) {
      const values = randomValues(spec, rng)
      expect(coerceValues(spec, values)).toEqual(values)
    }
  })
})

describe("presets", () => {
  beforeEach(() => localStorage.clear())

  it("saves, loads, and deletes by name", () => {
    const values = { ...defaultValues(spec), variant: "secondary" }
    expect(savePreset(spec, "Mine", values)).toEqual([{ name: "Mine", values }])
    expect(loadPresets(spec)).toEqual([{ name: "Mine", values }])
    expect(deletePreset(spec, "Mine")).toEqual([])
    expect(loadPresets(spec)).toEqual([])
  })

  it("overwrites a preset of the same name instead of duplicating it", () => {
    savePreset(spec, "Mine", defaultValues(spec))
    const next = { ...defaultValues(spec), count: 3 }
    const presets = savePreset(spec, "Mine", next)
    expect(presets).toHaveLength(1)
    expect(presets[0].values.count).toBe(3)
  })

  it("ignores a blank name", () => {
    expect(savePreset(spec, "   ", defaultValues(spec))).toEqual([])
  })

  it("validates stored values against the current knobs", () => {
    // A preset saved before a knob's options changed must not poison a render.
    localStorage.setItem(
      "seam-playground-presets",
      JSON.stringify({ demo: [{ name: "Stale", values: { variant: "gone" } }] })
    )
    expect(loadPresets(spec)[0].values.variant).toBe("default")
  })

  it("survives a corrupt store", () => {
    localStorage.setItem("seam-playground-presets", "{{{")
    expect(loadPresets(spec)).toEqual([])
  })
})

describe("spec registry", () => {
  it("has unique ids", () => {
    const ids = SPECS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("gives every knob a unique id within its spec", () => {
    for (const s of SPECS) {
      const ids = s.knobs.map((k) => k.id)
      expect(new Set(ids).size, `${s.id} has duplicate knob ids`).toBe(
        ids.length
      )
    }
  })

  it("keeps every enum default inside its own options", () => {
    for (const s of SPECS) {
      for (const knob of s.knobs) {
        if (knob.kind !== "enum") continue
        expect(
          knob.options.some((o) => o.value === knob.default),
          `${s.id}.${knob.id} default is not an option`
        ).toBe(true)
      }
    }
  })

  it("generates non-empty code for every spec's defaults", () => {
    for (const s of SPECS) {
      const code = s.code(defaultValues(s))
      expect(code.length, `${s.id} generated no code`).toBeGreaterThan(0)
      // Snippets are for consumer apps, so they must not leak registry paths.
      expect(code, `${s.id} leaks a registry import`).not.toContain(
        "@/registry/"
      )
    }
  })

  it("generates balanced JSX tags for every spec's defaults", () => {
    for (const s of SPECS) {
      const code = s.code(defaultValues(s))
      // Drop element-valued props (`render={<Button />}`) and self-closing
      // tags first — what's left must pair open tags with closing tags.
      const stripped = code
        .replace(/render=\{[^}]*\}/g, "")
        .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "")
      const opens = (stripped.match(/<[A-Z][A-Za-z]*/g) ?? []).length
      const closes = (stripped.match(/<\/[A-Z][A-Za-z]*>/g) ?? []).length
      expect(opens, `${s.id} has unbalanced JSX`).toBe(closes)
    }
  })

  it("indents generated code with even, two-space steps", () => {
    for (const s of SPECS) {
      for (const line of s.code(defaultValues(s)).split("\n")) {
        const lead = line.match(/^ */)?.[0].length ?? 0
        expect(lead % 2, `${s.id} has a ragged indent: "${line}"`).toBe(0)
      }
    }
  })

  it("falls back to the first spec for an unknown id", () => {
    expect(findSpec("nope")).toBe(SPECS[0])
    expect(findSpec(null)).toBe(SPECS[0])
    expect(findSpec("button").id).toBe("button")
  })

  it("groups every spec exactly once", () => {
    const grouped = groupedSpecs()
    const flat = grouped.flatMap((g) => g.specs)
    expect(flat).toHaveLength(SPECS.length)
    expect(new Set(flat.map((s) => s.id)).size).toBe(SPECS.length)
  })
})
