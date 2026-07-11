import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

// Unmount React trees between tests so the DOM never leaks across cases.
afterEach(() => {
  cleanup()
})

/**
 * `useReducedMotion()` (motion.dev) reads `matchMedia`. Provide a controllable
 * stub defaulting to "no preference" so tests exercise the full-motion path,
 * and let a test flip it via `setReducedMotion(true)` to assert the reduced
 * variant.
 */
let reducedMotion = false

export function setReducedMotion(value: boolean) {
  reducedMotion = value
}

vi.stubGlobal("matchMedia", (query: string) => ({
  matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
}))
