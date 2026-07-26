import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MotionConfig } from "motion/react"

/**
 * seamui's `useReducedMotion` has one job that outranks every other: with no
 * provider anywhere — the configuration every consumer app and every docs page
 * actually runs in — it must follow the OS.
 *
 * A previous version delegated to motion's `useReducedMotionConfig`, whose
 * context defaults to `reducedMotion: "never"`. That returns `false` outright
 * without ever consulting the media query, so reduced motion became
 * unreachable library-wide. The earlier test missed it by wrapping *every*
 * case in a `<MotionConfig>`; the no-provider cases below are the guard.
 *
 * The device signal is mocked rather than driven through `matchMedia`: motion
 * caches the media query in module-level state on first read, so a second stub
 * in the same file would silently have no effect and the suite would pass for
 * the wrong reason.
 */
let systemPrefersReduced = false
vi.mock("motion/react", async (importOriginal) => {
  const mod = await importOriginal<typeof import("motion/react")>()
  return { ...mod, useReducedMotion: () => systemPrefersReduced }
})

const { MotionPreferenceProvider, useReducedMotion } = await import(
  "@/lib/motion"
)

function Probe() {
  return <span data-testid="probe">{String(Boolean(useReducedMotion()))}</span>
}

const read = () => screen.getByTestId("probe").textContent

function renderWith(system: boolean, ui: React.ReactElement) {
  systemPrefersReduced = system
  render(ui)
  return read()
}

describe("useReducedMotion with no provider (the shipped default)", () => {
  it("follows the OS when the device asks for reduced motion", () => {
    expect(renderWith(true, <Probe />)).toBe("true")
  })

  it("follows the OS when the device has no preference", () => {
    expect(renderWith(false, <Probe />)).toBe("false")
  })
})

describe("MotionPreferenceProvider overrides the OS", () => {
  it('forces the reduced variant with preference="reduce"', () => {
    expect(
      renderWith(
        false,
        <MotionPreferenceProvider preference="reduce">
          <Probe />
        </MotionPreferenceProvider>
      )
    ).toBe("true")
  })

  it('forces full motion with preference="full"', () => {
    expect(
      renderWith(
        true,
        <MotionPreferenceProvider preference="full">
          <Probe />
        </MotionPreferenceProvider>
      )
    ).toBe("false")
  })

  it('defers to the OS with preference="system"', () => {
    expect(
      renderWith(
        true,
        <MotionPreferenceProvider preference="system">
          <Probe />
        </MotionPreferenceProvider>
      )
    ).toBe("true")
  })
})

describe("motion's own MotionConfig", () => {
  it('honors reducedMotion="always" — an unambiguous opt-in', () => {
    expect(
      renderWith(
        false,
        <MotionConfig reducedMotion="always">
          <Probe />
        </MotionConfig>
      )
    ).toBe("true")
  })

  it('ignores reducedMotion="never", which is the context default and would otherwise mask the OS', () => {
    expect(
      renderWith(
        true,
        <MotionConfig reducedMotion="never">
          <Probe />
        </MotionConfig>
      )
    ).toBe("true")
  })
})
