/**
 * Registry-config helpers for the seamui CLI.
 *
 * Kept free of CLI concerns (no process.exit, no colored output) so they can
 * be unit-tested directly.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

/** The public seamui registry. Namespace resolves {name} → registry item. */
export const REGISTRY_NAMESPACE = "@seamui"
export const REGISTRY_URL = "https://seamui.dev/r/{name}.json"

/** Direct URL for a registry item — installable without any registry config. */
export function itemUrl(name: string): string {
  return REGISTRY_URL.replace("{name}", name)
}

export type NamespaceStatus = "registered" | "already-registered" | "missing"

/**
 * Ensure components.json declares the @seamui namespace. Idempotent.
 *
 * Returns "missing" when there is no components.json to write into (shadcn
 * init hasn't run yet) — callers fall back to direct item URLs so `shadcn add`
 * can bootstrap the project itself. Throws when components.json exists but
 * can't be parsed: overwriting a file we can't read would destroy user config.
 */
export function ensureNamespace(cwd: string): NamespaceStatus {
  const file = resolve(cwd, "components.json")
  if (!existsSync(file)) return "missing"
  let json: Record<string, unknown>
  try {
    json = JSON.parse(readFileSync(file, "utf8"))
  } catch (error) {
    throw new Error(
      `Could not parse ${file} — fix the JSON and re-run. (${String(error)})`
    )
  }
  const registries = (json.registries ?? {}) as Record<string, unknown>
  json.registries = registries
  if (registries[REGISTRY_NAMESPACE] === REGISTRY_URL) {
    return "already-registered"
  }
  registries[REGISTRY_NAMESPACE] = REGISTRY_URL
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`)
  return "registered"
}

/**
 * Map user-supplied component names to `shadcn add` references.
 *
 * Plain names get the @seamui namespace. When the namespace isn't configured
 * (no components.json yet), fall back to direct item URLs — shadcn installs
 * those without any registry config and bootstraps the project on the way.
 */
export function resolveRefs(
  components: string[],
  namespaceConfigured: boolean
): string[] {
  return components.map((c) => {
    if (c.startsWith("http")) return c
    if (namespaceConfigured) {
      return c.includes("/") ? c : `${REGISTRY_NAMESPACE}/${c}`
    }
    if (c.startsWith(`${REGISTRY_NAMESPACE}/`)) {
      return itemUrl(c.slice(REGISTRY_NAMESPACE.length + 1))
    }
    return c.includes("/") ? c : itemUrl(c)
  })
}
