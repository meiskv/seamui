import { beforeEach, describe, expect, it, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import type * as React from "react"

// Mock motion/react's imperative pieces so we can assert on the exact
// token targets without running real animations. Everything else (types)
// passes through untouched.
const animateMock = vi.fn()
let reducedMotion = false
vi.mock("motion/react", async (importOriginal) => {
  const mod = await importOriginal<typeof import("motion/react")>()
  return {
    ...mod,
    animate: (...args: unknown[]) => animateMock(...args),
    useReducedMotion: () => reducedMotion,
  }
})

import { depth, fades, reduced, springs, usePressDepth } from "@/lib/motion"

// The merger is generic over the incoming props; give the empty case an
// explicit shape so the returned handlers are visible to the type checker.
type PressProps = {
  onPointerDown?: React.PointerEventHandler<HTMLElement>
  onPointerUp?: React.PointerEventHandler<HTMLElement>
  onPointerCancel?: React.PointerEventHandler<HTMLElement>
  onPointerLeave?: React.PointerEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>
}
const empty: PressProps = {}

function pointerEvent(button = 0) {
  return {
    button,
    currentTarget: document.createElement("button"),
  } as unknown as React.PointerEvent<HTMLElement>
}

function keyEvent(key: string, repeat = false) {
  return {
    key,
    repeat,
    currentTarget: document.createElement("button"),
  } as unknown as React.KeyboardEvent<HTMLElement>
}

describe("usePressDepth", () => {
  beforeEach(() => {
    animateMock.mockClear()
    reducedMotion = false
  })

  it("presses with depth.pressed + springs.press and settles with depth.resting + springs.snappy", () => {
    const { result } = renderHook(() => usePressDepth())
    const props = result.current(empty)

    const down = pointerEvent()
    props.onPointerDown?.(down)
    expect(animateMock).toHaveBeenCalledWith(
      down.currentTarget,
      depth.pressed,
      springs.press
    )

    const up = pointerEvent()
    props.onPointerUp?.(up)
    expect(animateMock).toHaveBeenCalledWith(
      up.currentTarget,
      depth.resting,
      springs.snappy
    )
  })

  it("chains the original handlers instead of replacing them", () => {
    const original = vi.fn()
    const { result } = renderHook(() => usePressDepth())
    const props = result.current({ onPointerDown: original })
    props.onPointerDown?.(pointerEvent())
    expect(original).toHaveBeenCalledTimes(1)
    expect(animateMock).toHaveBeenCalledTimes(1)
  })

  it("ignores non-primary buttons and does nothing when disabled", () => {
    const { result: disabled } = renderHook(() => usePressDepth(true))
    disabled.current(empty).onPointerDown?.(pointerEvent())
    expect(animateMock).not.toHaveBeenCalled()

    const { result } = renderHook(() => usePressDepth())
    result.current(empty).onPointerDown?.(pointerEvent(2))
    expect(animateMock).not.toHaveBeenCalled()
  })

  it("presses on keyboard activation (Enter/Space), ignoring repeats and other keys", () => {
    const { result } = renderHook(() => usePressDepth())
    const props = result.current(empty)

    props.onKeyDown?.(keyEvent("Enter"))
    props.onKeyDown?.(keyEvent(" "))
    expect(animateMock).toHaveBeenCalledTimes(2)

    props.onKeyDown?.(keyEvent("Enter", true)) // held key repeat
    props.onKeyDown?.(keyEvent("ArrowRight")) // roving-focus keys stay free
    expect(animateMock).toHaveBeenCalledTimes(2)

    props.onKeyUp?.(keyEvent("Enter"))
    expect(animateMock).toHaveBeenCalledTimes(3)
    props.onKeyUp?.(keyEvent("Escape"))
    expect(animateMock).toHaveBeenCalledTimes(3)
  })

  it("settles on pointer cancel and leave too", () => {
    const { result } = renderHook(() => usePressDepth())
    const props = result.current(empty)
    props.onPointerCancel?.(pointerEvent())
    props.onPointerLeave?.(pointerEvent())
    expect(animateMock).toHaveBeenCalledTimes(2)
    for (const call of animateMock.mock.calls) {
      expect(call[1]).toEqual(depth.resting)
    }
  })

  it("reduced motion: dims via reduced.pressed + fades.fast, never moves (§5b — variant, not kill switch)", () => {
    reducedMotion = true
    const { result } = renderHook(() => usePressDepth())
    const props = result.current(empty)

    const down = pointerEvent()
    props.onPointerDown?.(down)
    expect(animateMock).toHaveBeenCalledWith(
      down.currentTarget,
      reduced.pressed,
      fades.fast
    )

    const up = pointerEvent()
    props.onPointerUp?.(up)
    expect(animateMock).toHaveBeenCalledWith(
      up.currentTarget,
      { opacity: 1 },
      fades.fast
    )
    // No call ever animated a transform under reduced motion.
    for (const call of animateMock.mock.calls) {
      expect(call[1]).not.toHaveProperty("scale")
    }
  })
})
