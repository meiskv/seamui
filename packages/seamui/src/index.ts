#!/usr/bin/env node
/**
 * seamui CLI — a thin UX layer over the shadcn CLI.
 *
 * It never reimplements the registry protocol: `init` scaffolds a project and
 * wires up the @seamui namespace, `add` delegates to `shadcn add @seamui/<name>`.
 */
import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { resolve } from "node:path"

import { Command } from "commander"
import pc from "picocolors"

import {
  ensureNamespace,
  type NamespaceStatus,
  REGISTRY_NAMESPACE,
  resolveRefs,
} from "./config"

/** Foundation items installed on every `init`. */
const FOUNDATION = ["theme", "utils", "motion"]

type Framework = "next" | "vite" | "remix"

function run(cmd: string, args: string[], cwd: string): number {
  const printable = [cmd, ...args].join(" ")
  console.log(pc.dim(`$ ${printable}`))
  const res = spawnSync(cmd, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  })
  if (res.error) {
    console.error(pc.red(`Failed to run: ${printable}`))
    console.error(pc.red(String(res.error)))
    return 1
  }
  return res.status ?? 1
}

/** shadcn is invoked via the package runner so the user needs nothing global. */
function shadcn(args: string[], cwd: string): number {
  return run("bunx", ["--bun", "shadcn@latest", ...args], cwd)
}

/** Ensure the @seamui namespace, reporting the result. Exits on unreadable config. */
function syncNamespace(cwd: string): NamespaceStatus {
  try {
    const status = ensureNamespace(cwd)
    if (status === "registered") {
      console.log(
        pc.green(`✔ Registered ${REGISTRY_NAMESPACE} in components.json`)
      )
    }
    return status
  } catch (error) {
    console.error(
      pc.red(error instanceof Error ? error.message : String(error))
    )
    process.exit(1)
  }
}

function scaffold(framework: Framework, cwd: string): number {
  if (existsSync(resolve(cwd, "package.json"))) return 0 // operate in place
  console.log(pc.cyan(`Scaffolding a ${framework} app…`))
  switch (framework) {
    case "next":
      return run(
        "bunx",
        [
          "--bun",
          "create-next-app@latest",
          ".",
          "--ts",
          "--tailwind",
          "--app",
          "--eslint",
          "--use-bun",
          "--yes",
        ],
        cwd
      )
    case "vite":
      return run(
        "bunx",
        ["--bun", "create-vite@latest", ".", "--template", "react-ts"],
        cwd
      )
    case "remix":
      return run("bunx", ["--bun", "create-remix@latest", ".", "--yes"], cwd)
  }
}

const program = new Command()

program
  .name("seamui")
  .description(
    "Beautifully animated components you own — Base UI + motion.dev."
  )
  .version("0.1.4")

program
  .command("init")
  .description("Set up seamui in a new or existing project")
  .option(
    "-t, --template <framework>",
    "framework: next | vite | remix",
    "next"
  )
  .option("--cwd <dir>", "working directory", process.cwd())
  .option("-y, --yes", "skip confirmation prompts", false)
  .allowUnknownOption(true)
  .action((opts) => {
    const cwd = resolve(opts.cwd)
    const framework = opts.template as Framework
    if (!["next", "vite", "remix"].includes(framework)) {
      console.error(
        pc.red(`Unknown framework "${framework}". Use next | vite | remix.`)
      )
      process.exit(1)
    }

    if (scaffold(framework, cwd) !== 0) process.exit(1)
    // shadcn ≥4.13 repurposed `-b` to the component library (base|radix); the
    // Base-UI defaults preset (`-d` → base-nova) is the non-interactive setup.
    if (shadcn(["init", "-y", "-d"], cwd) !== 0) process.exit(1)
    const status = syncNamespace(cwd)
    // `-o` so the foundation (theme → app/globals.css) applies without an
    // interactive overwrite prompt that would hang a non-interactive run.
    if (
      shadcn(
        ["add", ...resolveRefs(FOUNDATION, status !== "missing"), "-y", "-o"],
        cwd
      ) !== 0
    ) {
      process.exit(1)
    }

    console.log()
    console.log(pc.green("✔ seamui is ready."))
    console.log(pc.dim("Next:"), pc.cyan("seamui add button"))
  })

program
  .command("add")
  .description("Add seamui components")
  .argument("[components...]", "component names, e.g. button")
  .option("--cwd <dir>", "working directory", process.cwd())
  .option("-y, --yes", "skip confirmation prompts", false)
  .allowUnknownOption(true)
  .action((components: string[], opts) => {
    const cwd = resolve(opts.cwd)
    if (!components.length) {
      console.error(
        pc.red("Specify at least one component, e.g. `seamui add button`.")
      )
      process.exit(1)
    }
    const status = syncNamespace(cwd)
    if (status === "missing") {
      console.log(
        pc.yellow(
          "No components.json found — installing via direct registry URLs; shadcn will set the project up first."
        )
      )
    }
    // `-y -o`: skip confirmations and overwrite existing files (shared deps
    // like button/badge recur across components; a prompt would hang non-TTY).
    const passthrough = opts.yes ? ["-y", "-o"] : []
    const refs = resolveRefs(components, status !== "missing")
    const code = shadcn(["add", ...refs, ...passthrough], cwd)
    // shadcn bootstraps components.json on a first-run add; register the
    // namespace in it so plain `shadcn add @seamui/<name>` works from now on.
    if (code === 0 && status === "missing") syncNamespace(cwd)
    process.exit(code)
  })

program.parse()
