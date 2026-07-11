import { describe, expect, it } from "vitest"
import { renderHook } from "@testing-library/react"
import type * as React from "react"
import { HapticsProvider, useHaptics } from "@/lib/haptics"

describe("useHaptics", () => {
  it("is a silent no-op without a provider (never throws)", () => {
    const { result } = renderHook(() => useHaptics())
    expect(result.current.enabled).toBe(false)
    // Every preset must be callable and swallow errors.
    for (const preset of ["tap", "tick", "success", "error"] as const) {
      expect(() => result.current.trigger(preset)).not.toThrow()
    }
    expect(() => result.current.trigger()).not.toThrow()
  })

  it("reports enabled and never throws when wrapped in a provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticsProvider sound={false}>{children}</HapticsProvider>
    )
    const { result } = renderHook(() => useHaptics(), { wrapper })
    expect(result.current.enabled).toBe(true)
    expect(() => result.current.trigger("success")).not.toThrow()
  })

  it("stays a no-op (and enabled=false) when explicitly disabled", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticsProvider enabled={false} sound={false}>
        {children}
      </HapticsProvider>
    )
    const { result } = renderHook(() => useHaptics(), { wrapper })
    expect(result.current.enabled).toBe(false)
    expect(() => result.current.trigger("tick")).not.toThrow()
  })
})
