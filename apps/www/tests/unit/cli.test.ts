import { describe, expect, it } from "vitest"
import { spawnSync } from "node:child_process"
import { resolve } from "node:path"

// Repo root, from apps/www (the vitest cwd).
const ROOT = resolve(process.cwd(), "..", "..")
const ENTRY = resolve(ROOT, "packages/seamui/src/index.ts")

function runCli(args: string[]) {
  return spawnSync("bun", [ENTRY, ...args], {
    cwd: ROOT,
    encoding: "utf8",
  })
}

describe("seamui CLI", () => {
  it("prints help and exits 0", () => {
    const { status, stdout } = runCli(["--help"])
    expect(status).toBe(0)
    expect(stdout).toContain("seamui")
    // the two commands are advertised.
    expect(stdout).toContain("init")
    expect(stdout).toContain("add")
  })

  it("prints its version and exits 0", () => {
    const { status, stdout } = runCli(["--version"])
    expect(status).toBe(0)
    expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it("errors (exit 1) when `add` is given no components", () => {
    const { status, stderr } = runCli(["add"])
    expect(status).toBe(1)
    expect(stderr.toLowerCase()).toContain("component")
  })

  it("rejects an unknown framework for `init` (exit 1)", () => {
    const { status, stderr } = runCli(["init", "--template", "svelte"])
    expect(status).toBe(1)
    expect(stderr.toLowerCase()).toContain("unknown framework")
  })
})
