import { describe, expect, it } from "vitest"
import {
  condense,
  depth,
  fades,
  personalities,
  reduced,
  shake,
  springs,
} from "@/lib/motion"

const ROLES = ["press", "snappy", "surface", "bouncy"] as const

describe("personalities", () => {
  it("defines all four spring roles for every personality", () => {
    for (const [name, personality] of Object.entries(personalities)) {
      for (const role of ROLES) {
        expect(personality[role], `${name}.${role}`).toBeDefined()
        expect(personality[role].type, `${name}.${role}.type`).toBe("spring")
      }
    }
  })

  it("uses positive, physical spring params (stiffness/damping/mass)", () => {
    for (const personality of Object.values(personalities)) {
      for (const role of ROLES) {
        const s = personality[role] as {
          stiffness: number
          damping: number
          mass: number
        }
        expect(s.stiffness).toBeGreaterThan(0)
        expect(s.damping).toBeGreaterThan(0)
        expect(s.mass).toBeGreaterThan(0)
      }
    }
  })
})

describe("springs", () => {
  it("is the `seam` personality (the shipped default)", () => {
    expect(springs).toBe(personalities.seam)
  })
})

describe("fades", () => {
  it("are opacity-only, duration-based tweens (no spring, no transform)", () => {
    for (const fade of Object.values(fades)) {
      expect(fade).not.toHaveProperty("type", "spring")
      expect(typeof fade.duration).toBe("number")
      expect(fade.duration).toBeGreaterThan(0)
    }
    // fast must be quicker than normal.
    expect(fades.fast.duration).toBeLessThan(fades.normal.duration)
  })
})

describe("depth", () => {
  it("exposes sane scalar scales that recede/rest/raise in order", () => {
    expect(depth.pressed.scale).toBeLessThan(depth.resting.scale)
    expect(depth.resting.scale).toBeLessThan(depth.raised.scale)
    expect(depth.resting.scale).toBe(1)
  })

  it("overlay and modal each carry initial/animate/exit", () => {
    for (const key of ["overlay", "modal"] as const) {
      for (const phase of ["initial", "animate", "exit"] as const) {
        expect(depth[key][phase], `${key}.${phase}`).toBeDefined()
      }
      // enters fully opaque, leaves transparent.
      expect(depth[key].animate.opacity).toBe(1)
      expect(depth[key].initial.opacity).toBe(0)
      expect(depth[key].exit.opacity).toBe(0)
    }
  })
})

describe("condense (CSS overlay motion)", () => {
  it("keys transitions to Base UI starting/ending styles", () => {
    for (const cls of Object.values(condense)) {
      expect(cls).toContain("data-[starting-style]")
      expect(cls).toContain("data-[ending-style]")
    }
  })

  it("degrades to opacity-only under reduced motion", () => {
    expect(condense.surface).toContain("motion-reduce:")
    expect(condense.sheet).toContain("motion-reduce:")
  })
})

describe("reduced (the reduced-motion variants)", () => {
  it("keeps feedback as opacity, never as movement", () => {
    // press dims instead of scaling.
    expect(reduced.pressed.opacity).toBeLessThan(1)
    expect(reduced.pressed).not.toHaveProperty("scale")
    // entrance is opacity-only.
    expect(reduced.fadeIn.initial.opacity).toBe(0)
    expect(reduced.fadeIn.animate.opacity).toBe(1)
    expect(reduced.fadeIn.initial).not.toHaveProperty("y")
    // layout jumps instantly.
    expect(reduced.instant.duration).toBe(0)
    // error feedback flashes opacity, no x-shake.
    expect(reduced.flash.animate.opacity).toBeDefined()
    expect(reduced.flash.animate).not.toHaveProperty("x")
  })
})

describe("shake (error feedback)", () => {
  it("moves on x and carries its own duration", () => {
    expect(Array.isArray(shake.animate.x)).toBe(true)
    expect(shake.transition.duration).toBeGreaterThan(0)
  })
})
