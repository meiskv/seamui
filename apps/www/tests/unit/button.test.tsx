import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button, buttonVariants } from "@/components/ui/button"

describe("Button (the foundation)", () => {
  it("renders a real native <button> carrying data-slot", () => {
    render(<Button>Save</Button>)
    const el = screen.getByRole("button", { name: "Save" })
    expect(el.tagName).toBe("BUTTON")
    expect(el.getAttribute("data-slot")).toBe("button")
  })

  it("keeps the caller's element when rendered as a link (render prop, Pattern A)", () => {
    // Pattern A must NOT motion.create() the part into a <div>/<button>: the
    // caller's <a href> stays an anchor (navigable), while Base UI advertises
    // role=button for correct semantics.
    render(<Button render={<a href="/docs" />}>Docs</Button>)
    const el = screen.getByRole("button", { name: "Docs" })
    expect(el.tagName).toBe("A")
    expect(el.getAttribute("href")).toBe("/docs")
    expect(el.getAttribute("data-slot")).toBe("button")
  })

  it("fires onClick on pointer activation", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Go</Button>)
    await user.click(screen.getByRole("button", { name: "Go" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("fires onClick on keyboard activation (Enter and Space)", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Go</Button>)
    screen.getByRole("button", { name: "Go" }).focus()
    await user.keyboard("{Enter}")
    await user.keyboard(" ")
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>
    )
    await user.click(screen.getByRole("button", { name: "Nope" }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("exposes buttonVariants so other controls can dogfood the foundation", () => {
    const cls = buttonVariants({ variant: "ghost", size: "icon" })
    expect(typeof cls).toBe("string")
    // the focus ring + squircle language must be encoded once, here.
    expect(cls).toContain("focus-visible:ring-2")
    expect(cls).toContain("squircle")
  })
})
