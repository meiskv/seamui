import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MotionConfig } from "motion/react"

import { useReducedMotion } from "@/lib/motion"

/**
 * seamui's `useReducedMotion` must be motion's CONFIG-aware hook, not its
 * media-query-only one — otherwise an app (or the docs playground) can never
 * force the reduced variant, and §5b's fallback is only reachable by changing
 * an OS setting. This pins that: the surrounding `MotionConfig` wins.
 */
function Probe() {
  const reduce = useReducedMotion()
  return <span data-testid="probe">{String(Boolean(reduce))}</span>
}

const read = () => screen.getByTestId("probe").textContent

describe("useReducedMotion from @/lib/motion", () => {
  it('honors <MotionConfig reducedMotion="always">', () => {
    render(
      <MotionConfig reducedMotion="always">
        <Probe />
      </MotionConfig>
    )
    expect(read()).toBe("true")
  })

  it('honors <MotionConfig reducedMotion="never">', () => {
    render(
      <MotionConfig reducedMotion="never">
        <Probe />
      </MotionConfig>
    )
    expect(read()).toBe("false")
  })

  it('falls back to the device preference under "user"', () => {
    // jsdom reports no preference, so the OS default is "not reduced".
    render(
      <MotionConfig reducedMotion="user">
        <Probe />
      </MotionConfig>
    )
    expect(read()).toBe("false")
  })
})
