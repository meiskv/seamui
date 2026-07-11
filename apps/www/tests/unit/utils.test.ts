import { describe, expect, it } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("drops falsy values (conditional classes)", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c")
  })

  it("merges conflicting tailwind utilities, last wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
    expect(cn("text-sm", "text-lg")).toBe("text-lg")
  })

  it("keeps non-conflicting utilities", () => {
    expect(cn("px-2 py-1", "text-sm")).toBe("px-2 py-1 text-sm")
  })

  it("supports arrays and objects (clsx semantics)", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c")
  })
})
