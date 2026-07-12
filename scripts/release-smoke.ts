#!/usr/bin/env bun
/**
 * Release smoke — cheap "would a consumer's install actually work?" checks.
 *
 *   1. The CLI builds and RUNS under node (its `bin` consumers use node, not
 *      bun) — `node dist/index.js --help` must exit 0.
 *   2. Every `public/r/*.json` parses and carries the fields the shadcn client
 *      needs (`name`, `files`). A corrupt registry file is a broken install for
 *      every consumer of that component.
 *
 * The docs-site `next build` is the other half of the release-smoke gate and
 * runs as its own CI step (`bun run build`).
 *
 * Run: `bun run scripts/release-smoke.ts` (aka `bun run smoke`).
 */
import { spawnSync } from "node:child_process"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const CLI_DIR = join(ROOT, "packages/seamui")
const CLI_DIST = join(CLI_DIR, "dist/index.js")
const R_DIR = join(ROOT, "apps/www/public/r")
const R_DIR_NATIVE = join(R_DIR, "native")

const failures: string[] = []

// ── 1. CLI builds and runs under node ────────────────────────────────
console.log("• Building the seamui CLI…")
const build = spawnSync("bun", ["run", "build"], {
  cwd: CLI_DIR,
  encoding: "utf8",
})
if (build.status !== 0) {
  console.error(build.stdout, build.stderr)
  failures.push("CLI failed to build")
} else {
  console.log("• Running `node dist/index.js --help`…")
  const help = spawnSync("node", [CLI_DIST, "--help"], { encoding: "utf8" })
  if (help.status !== 0) {
    failures.push(`CLI --help exited ${help.status} under node`)
  } else if (!help.stdout.includes("seamui")) {
    failures.push("CLI --help output did not mention seamui")
  }
}

// ── 2. Every registry JSON parses and is well-formed (web + native) ──
console.log("• Validating public/r/*.json (+ native)…")
const registryDirs: Array<{ label: string; dir: string; required: boolean }> = [
  { label: "public/r", dir: R_DIR, required: true },
  { label: "public/r/native", dir: R_DIR_NATIVE, required: true },
]
let validated = 0
for (const { label, dir, required } of registryDirs) {
  if (!existsSync(dir)) {
    if (required) {
      failures.push(`${label}: missing — did \`registry:build\` run?`)
    }
    continue
  }
  const jsonFiles = readdirSync(dir).filter((f) => f.endsWith(".json"))
  if (jsonFiles.length === 0) {
    failures.push(
      `${label}: no registry JSON found — did \`registry:build\` run?`
    )
  }
  for (const file of jsonFiles) {
    let parsed: { name?: unknown; files?: unknown }
    try {
      parsed = JSON.parse(readFileSync(join(dir, file), "utf8"))
    } catch (err) {
      failures.push(
        `${label}/${file}: not valid JSON (${(err as Error).message})`
      )
      continue
    }
    if (typeof parsed.name !== "string" || !parsed.name) {
      failures.push(`${label}/${file}: missing "name"`)
    }
    if (!Array.isArray(parsed.files) || parsed.files.length === 0) {
      failures.push(`${label}/${file}: missing "files"`)
    }
    validated++
  }
}

if (failures.length > 0) {
  console.error(`\n✖ release-smoke: ${failures.length} failure(s)\n`)
  for (const f of failures) console.error(`  ${f}`)
  process.exit(1)
}

console.log(
  `✔ release-smoke: CLI runs under node; ${validated} registry files valid`
)
