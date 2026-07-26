/**
 * Code-generation helpers shared by every spec.
 *
 * Each spec writes its own `code(state)` template rather than serializing a
 * React tree generically: a generic serializer produces technically-correct
 * but unidiomatic JSX (every default spelled out, composition flattened),
 * and the whole point of the Code tab is that you can paste it into your app
 * and it reads like the examples in the docs.
 */

type AttrValue = string | number | boolean | undefined | null

/**
 * Render JSX attributes, dropping anything that's at its default.
 *
 * `true` renders as a bare flag (`disabled`), strings quote, numbers and
 * everything else brace. Pass `undefined`/`null`/`false` to omit a prop —
 * so specs can write `["disabled", disabled && true]` inline.
 */
export function attrs(pairs: Array<[string, AttrValue]>): string {
  const out: string[] = []
  for (const [name, value] of pairs) {
    if (value === undefined || value === null || value === false) continue
    if (value === true) out.push(name)
    else if (typeof value === "string") out.push(`${name}="${value}"`)
    else out.push(`${name}={${value}}`)
  }
  return out.length > 0 ? ` ${out.join(" ")}` : ""
}

/** Indent every line of a block by `depth` levels of two spaces. */
export function indent(block: string, depth = 1): string {
  const pad = "  ".repeat(depth)
  return block
    .split("\n")
    .map((line) => (line.trim() === "" ? line : pad + line))
    .join("\n")
}

/** Join parts, dropping empties — for assembling optional child lines. */
export function lines(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter((part): part is string => Boolean(part)).join("\n")
}

/**
 * An import statement per module, sorted for stable output.
 * `imports({ "@/components/ui/button": ["Button"] })`
 */
export function imports(map: Record<string, string[]>): string {
  return Object.entries(map)
    .filter(([, names]) => names.length > 0)
    .map(
      ([module, names]) =>
        `import { ${[...new Set(names)].sort().join(", ")} } from "${module}"`
    )
    .join("\n")
}
