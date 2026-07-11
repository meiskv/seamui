import { describe, expect, it } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

type RegistryFile = { path: string; type: string; target?: string }
type RegistryItem = {
  name: string
  type: string
  files?: RegistryFile[]
  registryDependencies?: string[]
}
type Registry = { items: RegistryItem[] }

const root = process.cwd() // apps/www
const registry = JSON.parse(
  readFileSync(resolve(root, "registry.json"), "utf8")
) as Registry

const names = new Set(registry.items.map((i) => i.name))

describe("registry.json integrity", () => {
  it("has items, each with a name and type", () => {
    expect(registry.items.length).toBeGreaterThan(0)
    for (const item of registry.items) {
      expect(item.name, JSON.stringify(item)).toBeTruthy()
      expect(item.type).toMatch(/^registry:/)
    }
  })

  it("has unique item names", () => {
    expect(names.size).toBe(registry.items.length)
  })

  it("points every declared file at a real source on disk", () => {
    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        expect(
          existsSync(resolve(root, file.path)),
          `${item.name} → ${file.path}`
        ).toBe(true)
      }
    }
  })

  it("resolves every internal registryDependency to an item that exists", () => {
    for (const item of registry.items) {
      for (const dep of item.registryDependencies ?? []) {
        const match = dep.match(/\/r\/([^/]+)\.json$/)
        if (!match) continue // external (npm) dep — not our concern here
        expect(
          names.has(match[1]),
          `${item.name} depends on missing registry item "${match[1]}"`
        ).toBe(true)
      }
    }
  })

  it("marks every ui component that uses hooks/motion as a client component", () => {
    const uiItems = registry.items.filter((i) => i.type === "registry:ui")
    expect(uiItems.length).toBeGreaterThan(0)
    for (const item of uiItems) {
      for (const file of item.files ?? []) {
        if (!file.path.endsWith(".tsx")) continue
        const src = readFileSync(resolve(root, file.path), "utf8")
        const needsClient =
          /\bmotion\/react\b/.test(src) ||
          /\bReact\.use[A-Z]/.test(src) ||
          /\buse(State|Effect|Context|Ref|Reduced|Memo|Callback)\b/.test(src)
        if (needsClient) {
          expect(
            src.trimStart().startsWith('"use client"'),
            `${file.path} uses hooks/motion but is missing "use client"`
          ).toBe(true)
        }
      }
    }
  })
})
