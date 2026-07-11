import { existsSync } from "node:fs"
import { defineConfig, devices } from "@playwright/test"

// Use the environment's pre-installed Chromium when present (the managed CI
// image ships it at this stable symlink and blocks `playwright install`);
// otherwise fall back to Playwright's own browser download for local dev.
const PREINSTALLED_CHROMIUM =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium"
const executablePath = existsSync(PREINSTALLED_CHROMIUM)
  ? PREINSTALLED_CHROMIUM
  : undefined

/**
 * Browser smoke — the four CLAUDE.md §6 gates (pointer, keyboard, reduced
 * motion, dark mode) plus the overlay-exit check, automated. Chromium only;
 * this is a smoke gate, not a cross-browser visual suite.
 *
 * Runs against a production build (`next start`). CI builds first, then runs
 * this; locally, run `bun run build` once before `bun run test:e2e`.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { executablePath },
      },
    },
  ],
  webServer: {
    command: "bun run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
