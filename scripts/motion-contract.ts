#!/usr/bin/env bun
/**
 * Motion-contract gate.
 *
 * Enforces the load-bearing, mechanically-checkable rules from CLAUDE.md §3/§5
 * across the component sources in `registry/seam/ui`. These are the rules that,
 * when broken, silently kill seamui's whole reason to exist:
 *
 *   1. Reduced motion must be a VARIANT, never a kill switch (§5b). The
 *      anti-pattern `reduceMotion ? undefined : …` swaps feedback for nothing.
 *   2. No inline spring configs (`stiffness`/`damping`/… ). Springs come from a
 *      personality in `@/lib/motion`, never forked into a component.
 *   3. No inline `duration:` tweens. Physics, not clocks — the only exceptions
 *      are ambient infinite-repeat animations, explicitly allowlisted in
 *      `scripts/motion-contract-allow.txt`.
 *
 * Rules scan the whole file (not line by line) so a ternary the formatter has
 * wrapped across lines — `reduceMotion\n  ? undefined` — is still caught. Line
 * comments are blanked first (preserving offsets) so justifications never trip
 * a rule.
 *
 * Run: `bun run scripts/motion-contract.ts` (aka `bun run motion:check`).
 * Exits non-zero and prints `file:line — rule` for every violation.
 */
import { Glob } from "bun"
import { readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const UI_GLOB = "apps/www/registry/seam/ui/*.tsx"
const ALLOW_FILE = "scripts/motion-contract-allow.txt"

type Rule = {
  id: string
  test: RegExp
  message: string
  /** Files in the allowlist skip this rule. */
  allowlisted?: boolean
  /**
   * Optional gate: given the full source and a match, decide whether it's a
   * real violation. Lets a coarse regex stay precise (e.g. only flag a
   * reduced-motion `? undefined` when it nulls a *feedback* prop).
   */
  accept?: (src: string, match: RegExpExecArray) => boolean
}

// motion feedback/entrance props. Setting ANY of these to undefined/false under
// reduced motion is the kill-switch bug (dead press / dead entrance). Note this
// deliberately EXCLUDES `variants`/`transition`: `variants={reduceMotion ? …}`
// legitimately drops a movement keyframe set while feedback lives on whileTap,
// and `transition` is always a real value.
const FEEDBACK_PROPS = new Set([
  "whileTap",
  "whileHover",
  "whileFocus",
  "whileDrag",
  "whileInView",
  "initial",
  "animate",
])

// Non-feedback motion props whose `reduceMotion ? undefined` is legitimate
// (e.g. dropping a movement keyframe set). Listed so the backward scan can tell
// them apart from a feedback prop — and so value tokens like `undefined` (which
// a ternary colon makes look like `undefined:`) are never mistaken for a prop.
const NON_FEEDBACK_PROPS = [
  "variants",
  "transition",
  "style",
  "exit",
  "layout",
  "drag",
  "custom",
]
const PROP_RE = new RegExp(
  `\\b(${[...FEEDBACK_PROPS, ...NON_FEEDBACK_PROPS].join("|")})\\s*[=:]`,
  "g"
)

/** The nearest known motion prop governing the expression at `index`. */
function governingProp(src: string, index: number): string | null {
  const before = src.slice(Math.max(0, index - 160), index)
  const props = [...before.matchAll(PROP_RE)]
  return props.at(-1)?.[1] ?? null
}

const RULES: Rule[] = [
  {
    id: "reduced-motion-kill-switch",
    // `reduceMotion ? undefined : …` (or false) — including when the formatter
    // wraps the ternary across lines. The bounded `\s` window spans a newline +
    // indentation but not unrelated code. `useReducedMotion() ?? false` uses
    // `??`, so it's exempt. `accept` then confirms it nulls a feedback prop.
    test: /\breduce(?:Motion)?\s{0,40}\?\s{0,12}(?:undefined|false)\b/g,
    accept: (src, m) => {
      const prop = governingProp(src, m.index)
      return prop !== null && FEEDBACK_PROPS.has(prop)
    },
    message:
      "reduced motion used as a kill switch on a feedback prop — swap movement for opacity (reduced.pressed / reduced.fadeIn), never `? undefined`",
  },
  {
    id: "inline-spring-config",
    test: /\b(?:stiffness|damping|mass|restSpeed|restDelta)\s*:/g,
    message:
      "inline spring config — springs must come from a personality in @/lib/motion, never be written in a component",
  },
  {
    id: "reduced-motion-wrong-import",
    // `useReducedMotion` pulled from motion/react instead of @/lib/motion.
    // Motion's own hook reads only the device media query, so a component
    // using it can't be overridden by <MotionConfig reducedMotion>, and the
    // reduced variant becomes unreachable except via OS settings.
    test: /import\s*\{[^}]*\buseReducedMotion\b[^}]*\}\s*from\s*"motion\/react"/g,
    message:
      "useReducedMotion imported from motion/react — import it from @/lib/motion (the config-aware variant), see CLAUDE.md §3",
  },
  {
    id: "inline-duration",
    test: /\bduration\s*:/g,
    message:
      "inline duration tween — use a spring token from @/lib/motion (ambient infinite loops must be added to motion-contract-allow.txt)",
    allowlisted: true,
  },
]

function loadAllowlist(): Set<string> {
  const raw = readFileSync(join(ROOT, ALLOW_FILE), "utf8")
  const files = new Set<string>()
  for (const line of raw.split("\n")) {
    const path = line.split("#")[0].trim()
    if (path) files.add(path)
  }
  return files
}

/** Blank `//` line comments to spaces, preserving every offset and newline. */
function blankLineComments(src: string): string {
  return src
    .split("\n")
    .map((line) => {
      const idx = line.indexOf("//")
      return idx === -1
        ? line
        : line.slice(0, idx) + " ".repeat(line.length - idx)
    })
    .join("\n")
}

/** 1-based line number of a character offset. */
function lineAt(src: string, offset: number): number {
  let line = 1
  for (let i = 0; i < offset && i < src.length; i++) {
    if (src[i] === "\n") line++
  }
  return line
}

const allowlist = loadAllowlist()
const violations: string[] = []
let scanned = 0

for (const abs of new Glob(UI_GLOB).scanSync({ cwd: ROOT, absolute: true })) {
  scanned++
  const rel = relative(ROOT, abs).replaceAll("\\", "/")
  const src = blankLineComments(readFileSync(abs, "utf8"))
  for (const rule of RULES) {
    if (rule.allowlisted && allowlist.has(rel)) continue
    rule.test.lastIndex = 0
    let match: RegExpExecArray | null
    // biome-ignore lint/suspicious/noAssignInExpressions: standard global-regex walk
    while ((match = rule.test.exec(src)) !== null) {
      if (rule.accept && !rule.accept(src, match)) continue
      const line = lineAt(src, match.index)
      violations.push(`${rel}:${line} — ${rule.id}: ${rule.message}`)
    }
  }
}

if (violations.length > 0) {
  console.error(`✖ motion-contract: ${violations.length} violation(s)\n`)
  for (const v of violations) console.error(`  ${v}`)
  console.error(
    `\nSee CLAUDE.md §3/§5. To allow an ambient infinite-repeat animation, add the file to ${ALLOW_FILE} with a justification.`
  )
  process.exit(1)
}

console.log(
  `✔ motion-contract: ${scanned} components clean (${allowlist.size} allowlisted for ambient loops)`
)
