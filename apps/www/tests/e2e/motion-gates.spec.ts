import { expect, test } from "@playwright/test"

// The dialog demo page carries everything the gates need: seam Buttons, a
// Dialog (Base UI overlay), and the docs shell (theme toggle + reduced-motion
// notice).
const PAGE = "/docs/components/dialog"

/** Parse the horizontal scale (the `a`) out of a CSS transform matrix. */
function scaleOf(transform: string): number {
  if (!transform || transform === "none") return 1
  const m = transform.match(/matrix\(([^)]+)\)/)
  if (!m) return 1
  return Number.parseFloat(m[1].split(",")[0])
}

test.describe("motion gates (CLAUDE.md §6)", () => {
  test("pointer: a press springs the control into the surface (scale < 1)", async ({
    page,
  }) => {
    await page.goto(PAGE)
    const button = page.getByRole("button", { name: "Edit profile" })
    await expect(button).toBeVisible()

    const box = (await button.boundingBox())!
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()

    // Mid-gesture the spring recedes the key: computed scale drops below 1.
    await expect
      .poll(
        async () =>
          scaleOf(
            await button.evaluate((el) => getComputedStyle(el).transform)
          ),
        { timeout: 2000 }
      )
      .toBeLessThan(0.999)

    // Release off-element so the gesture ends without firing a click (which
    // would open the dialog and disturb the control we're measuring).
    await page.mouse.move(box.x - 40, box.y - 40)
    await page.mouse.up()

    // On release it settles back to rest (identity).
    await expect
      .poll(
        async () =>
          scaleOf(
            await button.evaluate((el) => getComputedStyle(el).transform)
          ),
        { timeout: 2000 }
      )
      .toBeGreaterThan(0.999)
  })

  test("keyboard: activating the trigger with Enter opens the dialog", async ({
    page,
  }) => {
    await page.goto(PAGE)
    const trigger = page.getByRole("button", { name: "Edit profile" })
    await trigger.focus()
    await expect(trigger).toBeFocused()
    await page.keyboard.press("Enter")

    await expect(
      page.locator('[data-slot="dialog-content"]').first()
    ).toBeVisible()
  })

  test("reduced motion: feedback stays present as opacity, not removed", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(PAGE)

    // The docs surface tells the visitor what they're seeing — proof the app
    // treats reduced motion as a variant, not a dead library.
    await expect(page.getByText("Reduce Motion is enabled")).toBeVisible()

    // Press feedback swaps movement for a dim: opacity drops, scale does NOT.
    const button = page.getByRole("button", { name: "Edit profile" })
    const box = (await button.boundingBox())!
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    await expect
      .poll(
        async () =>
          Number.parseFloat(
            await button.evaluate((el) => getComputedStyle(el).opacity)
          ),
        { timeout: 2000 }
      )
      .toBeLessThan(1)
    // still no scale movement under reduced motion
    const scale = scaleOf(
      await button.evaluate((el) => getComputedStyle(el).transform)
    )
    expect(scale).toBeGreaterThan(0.999)
    await page.mouse.up()
  })

  test("dark mode: the theme toggle flips tokens without console errors", async ({
    page,
  }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await page.goto(PAGE)

    const bgBefore = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    )
    await page.getByRole("button", { name: "Toggle theme" }).click()

    await expect(page.locator("html")).toHaveClass(/dark/)
    await expect
      .poll(async () =>
        page.evaluate(() => getComputedStyle(document.body).backgroundColor)
      )
      .not.toBe(bgBefore)

    expect(errors, errors.join("\n")).toEqual([])
  })

  test("overlay: the dialog animates via CSS condense and dismisses cleanly", async ({
    page,
  }) => {
    await page.goto(PAGE)
    await page.getByRole("button", { name: "Edit profile" }).click()

    const content = page.locator('[data-slot="dialog-content"]').first()
    await expect(content).toBeVisible()

    // condense is CSS, not motion.dev — the popup carries a real CSS transition
    // (Base UI awaits it before unmounting). A motion-spring exit would show 0s.
    const duration = await content.evaluate(
      (el) => getComputedStyle(el).transitionDuration
    )
    expect(duration).not.toBe("0s")

    // Dismiss falls back and unmounts.
    await page.keyboard.press("Escape")
    await expect(content).toBeHidden()
  })
})
