import type { KnobValue } from "./types"

/**
 * Renders a JSX attribute list from `[name, value]` pairs.
 *
 * Skips anything that shouldn't appear in the snippet: `undefined`, `false`
 * (an absent boolean prop), and empty strings. `true` renders bare (`disabled`),
 * numbers render braced (`cols={3}`), strings render quoted.
 */
export function attrs(
  pairs: ReadonlyArray<readonly [string, KnobValue | undefined]>
): string {
  const out: string[] = []
  for (const [name, value] of pairs) {
    if (value === undefined || value === false || value === "") continue
    if (value === true) out.push(name)
    else if (typeof value === "number") out.push(`${name}={${value}}`)
    else out.push(`${name}="${value}"`)
  }
  return out.length > 0 ? ` ${out.join(" ")}` : ""
}

/**
 * Builds the import block for a snippet. Modules are emitted in the repo's
 * conventional order — third-party (lucide) first, then `@/components/ui/*`
 * alphabetically — so the generated code reads like hand-written source and
 * stays byte-stable between renders (no churn when copying twice).
 */
export function imports(map: Record<string, readonly string[]>): string {
  const lines = Object.entries(map)
    .filter(([, names]) => names.length > 0)
    .map(([module, names]) => {
      const unique = [...new Set(names)].sort()
      return `import { ${unique.join(", ")} } from "${module}"`
    })

  const external = lines.filter((l) => !l.includes('"@/'))
  const internal = lines.filter((l) => l.includes('"@/')).sort()

  return [...external, ...internal].join("\n")
}

/** Indents a whole block by `spaces` — for nesting a child under a parent tag. */
export function indent(text: string, spaces: number): string {
  const pad = " ".repeat(spaces)
  return text
    .split("\n")
    .map((line) => (line === "" ? line : pad + line))
    .join("\n")
}

/** Joins snippet sections, collapsing the blank lines an empty section leaves. */
export function snippet(...parts: Array<string | null | undefined>): string {
  return parts
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .join("\n\n")
    .trimEnd()
}
