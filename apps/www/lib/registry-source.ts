import { readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * Reads the source of a registry example straight from the built registry
 * JSON, so docs code blocks always match the shipped component.
 */
export function exampleSource(name: string): string {
  const file = join(process.cwd(), "public", "r", `${name}.json`)
  const item = JSON.parse(readFileSync(file, "utf8"))
  return (item.files?.[0]?.content ?? "").trimEnd()
}
