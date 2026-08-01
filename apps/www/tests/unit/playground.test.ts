import { describe, expect, it } from "vitest"

import { attrs, imports, lines } from "@/lib/playground/codegen"
import {
  SPECS,
  adjacentSpecs,
  findSpec,
  specsByGroup,
} from "@/lib/playground/registry"
import {
  decodeState,
  defaultsFor,
  encodeState,
  randomState,
} from "@/lib/playground/state"
import { buttonSpec } from "@/lib/playground/specs/button"
import type { PlaygroundSpec } from "@/lib/playground/types"

describe("codegen helpers", () => {
  it("quotes strings, bares booleans, braces numbers, drops falsy", () => {
    expect(
      attrs([
        ["variant", "secondary"],
        ["disabled", true],
        ["count", 3],
        ["size", false],
        ["title", undefined],
        ["alt", null],
      ])
    ).toBe(' variant="secondary" disabled count={3}')
  })

  it("returns an empty string when every prop is at its default", () => {
    expect(attrs([["variant", false]])).toBe("")
  })

  it("dedupes and sorts named imports, skipping empty modules", () => {
    expect(
      imports({ "@/components/ui/card": ["CardTitle", "Card", "Card"], x: [] })
    ).toBe('import { Card, CardTitle } from "@/components/ui/card"')
  })

  it("drops empty lines when assembling optional children", () => {
    expect(lines("a", false, null, undefined, "b")).toBe("a\nb")
  })
})

describe("spec registry", () => {
  it("has unique ids and resolves them", () => {
    const ids = SPECS.map((spec) => spec.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(findSpec(id)?.id).toBe(id)
  })

  it("returns undefined for unknown or empty ids", () => {
    expect(findSpec("nope")).toBeUndefined()
    expect(findSpec(null)).toBeUndefined()
  })

  it("groups specs without losing any", () => {
    const grouped = specsByGroup().flatMap((entry) => entry.specs)
    expect(grouped).toHaveLength(SPECS.length)
  })

  it("gives every control a unique id and a default within its own domain", () => {
    for (const spec of SPECS) {
      const ids = spec.controls.map((control) => control.id)
      expect(new Set(ids).size, `${spec.id} has duplicate control ids`).toBe(
        ids.length
      )
      for (const control of spec.controls) {
        if (control.type === "enum") {
          expect(
            control.options.some((option) => option.value === control.default),
            `${spec.id}.${control.id} default is not one of its options`
          ).toBe(true)
        }
        if (control.type === "number") {
          expect(control.default).toBeGreaterThanOrEqual(control.min)
          expect(control.default).toBeLessThanOrEqual(control.max)
        }
      }
    }
  })

  it("generates non-empty code for every spec's defaults", () => {
    for (const spec of SPECS) {
      const code = spec.code(defaultsFor(spec))
      expect(code.length, `${spec.id} generated no code`).toBeGreaterThan(0)
      expect(code, `${spec.id} generated an unresolved value`).not.toContain(
        "undefined"
      )
    }
  })
})

describe("adjacentSpecs (prev/next pagination)", () => {
  it("has no previous at the first spec and no next at the last", () => {
    expect(adjacentSpecs(SPECS[0].id).previous).toBeUndefined()
    expect(adjacentSpecs(SPECS[0].id).next?.id).toBe(SPECS[1].id)

    const last = SPECS[SPECS.length - 1]
    expect(adjacentSpecs(last.id).next).toBeUndefined()
    expect(adjacentSpecs(last.id).previous?.id).toBe(SPECS[SPECS.length - 2].id)
  })

  it("steps in SPECS order, and prev/next are inverses", () => {
    for (let i = 0; i < SPECS.length; i++) {
      const { previous, next } = adjacentSpecs(SPECS[i].id)
      expect(previous?.id).toBe(SPECS[i - 1]?.id)
      expect(next?.id).toBe(SPECS[i + 1]?.id)
      // stepping forward then back returns to where you started
      if (next) expect(adjacentSpecs(next.id).previous?.id).toBe(SPECS[i].id)
    }
  })

  it("walks the whole library from the first spec", () => {
    const walked = [SPECS[0].id]
    let cursor = adjacentSpecs(SPECS[0].id).next
    while (cursor) {
      walked.push(cursor.id)
      cursor = adjacentSpecs(cursor.id).next
    }
    expect(walked).toEqual(SPECS.map((spec) => spec.id))
  })

  it("returns nothing for an unknown id", () => {
    expect(adjacentSpecs("nope")).toEqual({})
  })
})

describe("url state", () => {
  it("omits knobs still at their default", () => {
    const encoded = encodeState(buttonSpec, defaultsFor(buttonSpec))
    expect(encoded).toBe("c=button")
  })

  it("round-trips a changed state", () => {
    const state = {
      ...defaultsFor(buttonSpec),
      variant: "ghost",
      disabled: true,
    }
    const params = new URLSearchParams(encodeState(buttonSpec, state))
    expect(params.get("variant")).toBe("ghost")
    expect(params.get("disabled")).toBe("1")
    expect(decodeState(buttonSpec, params)).toEqual(state)
  })

  it("ignores values that aren't valid for their control", () => {
    const params = new URLSearchParams("variant=chartreuse&disabled=maybe")
    expect(decodeState(buttonSpec, params)).toEqual(defaultsFor(buttonSpec))
  })

  it("clamps out-of-range numbers instead of dropping them", () => {
    const spec: PlaygroundSpec = {
      ...buttonSpec,
      controls: [
        {
          id: "count",
          label: "Count",
          type: "number",
          min: 1,
          max: 5,
          default: 3,
        },
      ],
    }
    expect(decodeState(spec, new URLSearchParams("count=99")).count).toBe(5)
    expect(decodeState(spec, new URLSearchParams("count=-4")).count).toBe(1)
  })
})

describe("randomState", () => {
  it("only produces values each control accepts", () => {
    for (const spec of SPECS) {
      // a deterministic "random" — always the last option / upper bound.
      const state = randomState(spec, () => 0.999)
      for (const control of spec.controls) {
        const value = state[control.id]
        if (control.type === "enum") {
          expect(control.options.some((option) => option.value === value)).toBe(
            true
          )
        }
        if (control.type === "number") {
          expect(Number(value)).toBeLessThanOrEqual(control.max)
          expect(Number(value)).toBeGreaterThanOrEqual(control.min)
        }
        if (control.type === "text") {
          // text knobs are content, not variants — shuffle leaves them alone.
          expect(value).toBe(control.default)
        }
      }
    }
  })
})
