import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { spawnSync } from "node:child_process"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

import {
  ensureNamespace,
  itemUrl,
  REGISTRY_NAMESPACE,
  REGISTRY_URL,
  resolveRefs,
} from "../../../../packages/seamui/src/config"

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

  it("errors (exit 1) on a malformed components.json before invoking shadcn", () => {
    const dir = mkdtempSync(join(tmpdir(), "seamui-cli-"))
    try {
      writeFileSync(join(dir, "components.json"), "{ not json")
      const { status, stdout, stderr } = runCli(["add", "button", "--cwd", dir])
      expect(status).toBe(1)
      expect(stderr).toContain("components.json")
      // it must fail fast, never reaching the shadcn delegation.
      expect(stdout).not.toContain("shadcn")
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe("registry config (ensureNamespace)", () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "seamui-config-"))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const read = () =>
    JSON.parse(readFileSync(join(dir, "components.json"), "utf8"))

  it('returns "missing" when components.json does not exist', () => {
    expect(ensureNamespace(dir)).toBe("missing")
  })

  it("registers @seamui in an existing components.json, preserving other keys", () => {
    writeFileSync(
      join(dir, "components.json"),
      JSON.stringify({ style: "new-york", registries: { "@acme": "x" } })
    )
    expect(ensureNamespace(dir)).toBe("registered")
    const json = read()
    expect(json.registries[REGISTRY_NAMESPACE]).toBe(REGISTRY_URL)
    expect(json.registries["@acme"]).toBe("x")
    expect(json.style).toBe("new-york")
  })

  it("is idempotent on a second run", () => {
    writeFileSync(join(dir, "components.json"), "{}")
    expect(ensureNamespace(dir)).toBe("registered")
    const after = readFileSync(join(dir, "components.json"), "utf8")
    expect(ensureNamespace(dir)).toBe("already-registered")
    expect(readFileSync(join(dir, "components.json"), "utf8")).toBe(after)
  })

  it("heals a stale registry URL", () => {
    writeFileSync(
      join(dir, "components.json"),
      JSON.stringify({ registries: { [REGISTRY_NAMESPACE]: "https://old" } })
    )
    expect(ensureNamespace(dir)).toBe("registered")
    expect(read().registries[REGISTRY_NAMESPACE]).toBe(REGISTRY_URL)
  })

  it("throws on malformed components.json instead of overwriting it", () => {
    writeFileSync(join(dir, "components.json"), "{ not json")
    expect(() => ensureNamespace(dir)).toThrow(/components\.json/)
    expect(readFileSync(join(dir, "components.json"), "utf8")).toBe(
      "{ not json"
    )
  })
})

describe("registry refs (resolveRefs)", () => {
  it("namespaces plain names when the registry is configured", () => {
    expect(
      resolveRefs(["button", "@acme/thing", "https://x/y.json"], true)
    ).toEqual([
      `${REGISTRY_NAMESPACE}/button`,
      "@acme/thing",
      "https://x/y.json",
    ])
  })

  it("falls back to direct item URLs when the registry is not configured", () => {
    expect(
      resolveRefs(["button", `${REGISTRY_NAMESPACE}/dialog`], false)
    ).toEqual([itemUrl("button"), itemUrl("dialog")])
    expect(itemUrl("button")).toBe("https://seamui.dev/r/button.json")
  })

  it("leaves foreign refs alone even when unconfigured", () => {
    expect(resolveRefs(["@acme/thing", "https://x/y.json"], false)).toEqual([
      "@acme/thing",
      "https://x/y.json",
    ])
  })
})
