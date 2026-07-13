#!/usr/bin/env bun
/**
 * Drift gate — the two seamui-specific "did you regenerate?" checks.
 *
 *   1. Registry: `registry/seam/**` is the source; `public/r/*.json` is BUILD
 *      OUTPUT. Editing the JSON by hand, or forgetting `registry:build` after a
 *      source change, silently ships a stale registry to every consumer.
 *   2. Theme: `theme/theme.css` is canonical; `app/globals.css` is a generated
 *      copy (CLAUDE.md §2's two-file rule). Editing the copy directly drifts it.
 *
 * We rebuild / regenerate, then fail if the working tree changed.
 *
 * Run: `bun run scripts/check-drift.ts` (aka `bun run drift:check`).
 */
import { spawnSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const THEME_SRC = "apps/www/registry/seam/theme/theme.css"
const GLOBALS = "apps/www/app/globals.css"
const REGISTRY_PATHS = ["apps/www/public/r", "apps/www/registry.json"]

function sh(cmd: string, args: string[], cwd = ROOT) {
  return spawnSync(cmd, args, { cwd, encoding: "utf8", stdio: "pipe" })
}

function gitDiff(paths: string[]): string {
  const res = sh("git", ["diff", "--", ...paths])
  return (res.stdout ?? "").trim()
}

const failures: string[] = []

// ── 1. Registry build output ─────────────────────────────────────────
console.log("• Rebuilding registry (shadcn build)…")
const build = sh("bun", ["run", "registry:build"], join(ROOT, "apps/www"))
if (build.status !== 0) {
  console.error(build.stdout, build.stderr)
  console.error("✖ registry:build failed")
  process.exit(1)
}
const registryDiff = gitDiff(REGISTRY_PATHS)
if (registryDiff) {
  failures.push(
    "registry: public/r or registry.json is stale — run `bun run registry:build` and commit the output.\n" +
      registryDiff.split("\n").slice(0, 40).join("\n")
  )
}

// ── 2. Theme two-file rule ───────────────────────────────────────────
console.log("• Regenerating app/globals.css from theme.css…")
// theme.css now ships the Tailwind entry (`@import "tailwindcss"`) itself so
// consumers' globals.css is self-sufficient — so the docs globals.css is just
// a verbatim copy of theme.css (CLAUDE.md §2).
writeFileSync(join(ROOT, GLOBALS), readFileSync(join(ROOT, THEME_SRC), "utf8"))
const themeDiff = gitDiff([GLOBALS])
if (themeDiff) {
  failures.push(
    "theme: app/globals.css drifted from theme.css — edit theme.css, then regenerate globals (CLAUDE.md §2).\n" +
      themeDiff.split("\n").slice(0, 40).join("\n")
  )
}

if (failures.length > 0) {
  console.error(`\n✖ drift: ${failures.length} check(s) failed\n`)
  for (const f of failures) console.error(f + "\n")
  process.exit(1)
}

console.log("✔ drift: registry build output and theme copy are in sync")
