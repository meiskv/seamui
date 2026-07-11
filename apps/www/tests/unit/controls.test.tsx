import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Toggle } from "@/registry/seam/ui/toggle"
import { Input } from "@/registry/seam/ui/input"
import { Checkbox } from "@/registry/seam/ui/checkbox"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

describe("Toggle", () => {
  it("renders a native button with data-slot and toggles pressed on click", async () => {
    const user = userEvent.setup()
    render(<Toggle aria-label="Bold">B</Toggle>)
    const el = screen.getByRole("button", { name: "Bold" })
    expect(el.tagName).toBe("BUTTON")
    expect(el.getAttribute("data-slot")).toBe("toggle")
    expect(el.getAttribute("aria-pressed")).toBe("false")
    await user.click(el)
    expect(el.getAttribute("aria-pressed")).toBe("true")
  })
})

describe("Input", () => {
  it("renders a debossed <input> with data-slot and accepts typing", async () => {
    const user = userEvent.setup()
    render(<Input aria-label="Name" />)
    const el = screen.getByRole("textbox", { name: "Name" }) as HTMLInputElement
    expect(el.tagName).toBe("INPUT")
    expect(el.getAttribute("data-slot")).toBe("input")
    await user.type(el, "seam")
    expect(el.value).toBe("seam")
  })
})

describe("Checkbox", () => {
  it("renders role=checkbox with data-slot and toggles on keyboard", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept" />)
    const el = screen.getByRole("checkbox", { name: "Accept" })
    expect(el.getAttribute("data-slot")).toBe("checkbox")
    expect(el.getAttribute("aria-checked")).toBe("false")
    el.focus()
    await user.keyboard(" ")
    expect(el.getAttribute("aria-checked")).toBe("true")
  })
})

describe("Tabs", () => {
  it("renders a tablist and moves selection with arrow keys (roving focus intact)", async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
        <TabsContent value="c">Panel C</TabsContent>
      </Tabs>
    )
    expect(screen.getByRole("tablist")).toBeTruthy()
    const tabA = screen.getByRole("tab", { name: "A" })
    expect(tabA.getAttribute("data-slot")).toBe("tabs-trigger")
    expect(tabA.getAttribute("aria-selected")).toBe("true")

    // Roving focus moving to the next tab on ArrowRight is exactly the thing an
    // extra Button wrapper would break (it swallows Base UI's Tab ref).
    tabA.focus()
    await user.keyboard("{ArrowRight}")
    const tabB = screen.getByRole("tab", { name: "B" })
    expect(document.activeElement).toBe(tabB)
  })
})
