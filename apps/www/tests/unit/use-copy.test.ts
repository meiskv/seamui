import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { act, renderHook } from "@testing-library/react"
import { useCopy } from "@/lib/use-copy"

describe("useCopy", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  function mockClipboard(writeText: (text: string) => Promise<void>) {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })
  }

  it("copies, flips `copied`, and resets after the timeout", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    mockClipboard(writeText)

    const { result } = renderHook(() => useCopy(1000))
    expect(result.current.copied).toBe(false)

    let ok = false
    await act(async () => {
      ok = await result.current.copy("hello")
    })
    expect(ok).toBe(true)
    expect(writeText).toHaveBeenCalledWith("hello")
    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.copied).toBe(false)
  })

  it("re-arms (not stacks) the reset timer on rapid re-copies", async () => {
    mockClipboard(vi.fn().mockResolvedValue(undefined))
    const { result } = renderHook(() => useCopy(1000))

    await act(async () => {
      await result.current.copy("one")
    })
    act(() => {
      vi.advanceTimersByTime(600)
    })
    await act(async () => {
      await result.current.copy("two")
    })
    // 600ms after the second copy the first timer would have fired — the
    // flag must still be up because the timer was re-armed, not stacked.
    act(() => {
      vi.advanceTimersByTime(600)
    })
    expect(result.current.copied).toBe(true)
    act(() => {
      vi.advanceTimersByTime(400)
    })
    expect(result.current.copied).toBe(false)
  })

  it("resolves false and stays un-copied when the clipboard is unavailable", async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error("insecure context")))
    const { result } = renderHook(() => useCopy())

    let ok = true
    await act(async () => {
      ok = await result.current.copy("nope")
    })
    expect(ok).toBe(false)
    expect(result.current.copied).toBe(false)
  })

  it("clears the pending reset on unmount (no late setState)", async () => {
    mockClipboard(vi.fn().mockResolvedValue(undefined))
    const { result, unmount } = renderHook(() => useCopy(1000))
    await act(async () => {
      await result.current.copy("bye")
    })
    unmount()
    // Advancing past the reset must not warn/throw after unmount.
    expect(() => {
      vi.advanceTimersByTime(2000)
    }).not.toThrow()
  })
})
