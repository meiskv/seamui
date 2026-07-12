/**
 * Registry-config helpers for the seamui CLI.
 *
 * Kept free of CLI concerns (no process.exit, no colored output) so they can
 * be unit-tested directly.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

/** Web vs native target. seamui ships one registry per platform (RNR-style). */
export type Platform = "web" | "native"

/** The public seamui registry. Namespace resolves {name} → registry item.
 *  Web and native are separate namespaces backed by separate registry paths
 *  (`/r/*.json` vs `/r/native/*.json`) so a name like `button` resolves to the
 *  right implementation for the project's platform. */
export const REGISTRY_NAMESPACE = "@seamui"
export const REGISTRY_URL = "https://seamui.dev/r/{name}.json"
export const REGISTRY_NAMESPACE_NATIVE = "@seamui-native"
export const REGISTRY_URL_NATIVE = "https://seamui.dev/r/native/{name}.json"

function namespaceFor(platform: Platform): string {
  return platform === "native" ? REGISTRY_NAMESPACE_NATIVE : REGISTRY_NAMESPACE
}

function registryUrlFor(platform: Platform): string {
  return platform === "native" ? REGISTRY_URL_NATIVE : REGISTRY_URL
}

/** Direct URL for a registry item — installable without any registry config. */
export function itemUrl(name: string, platform: Platform = "web"): string {
  return registryUrlFor(platform).replace("{name}", name)
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
export function ensureNamespace(
  cwd: string,
  platform: Platform = "web"
): NamespaceStatus {
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
  const namespace = namespaceFor(platform)
  const url = registryUrlFor(platform)
  const registries = (json.registries ?? {}) as Record<string, unknown>
  json.registries = registries
  if (registries[namespace] === url) {
    return "already-registered"
  }
  registries[namespace] = url
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
  namespaceConfigured: boolean,
  platform: Platform = "web"
): string[] {
  const namespace = namespaceFor(platform)
  return components.map((c) => {
    if (c.startsWith("http")) return c
    if (namespaceConfigured) {
      return c.includes("/") ? c : `${namespace}/${c}`
    }
    if (c.startsWith(`${namespace}/`)) {
      return itemUrl(c.slice(namespace.length + 1), platform)
    }
    return c.includes("/") ? c : itemUrl(c, platform)
  })
}
