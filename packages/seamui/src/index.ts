#!/usr/bin/env node
/**
 * seamui CLI — a thin UX layer over the shadcn CLI.
 *
 * It never reimplements the registry protocol: `init` scaffolds a project and
 * wires up the @seamui namespace, `add` delegates to `shadcn add @seamui/<name>`.
 */
import { spawnSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

import { Command } from "commander"
import pc from "picocolors"

/** The public seamui registry. Namespace resolves {name} → registry item. */
const REGISTRY_NAMESPACE = "@seamui"
const REGISTRY_URL = "https://seamui.dev/r/{name}.json"

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

/** Ensure components.json declares the @seamui namespace. Idempotent. */
function ensureNamespace(cwd: string): void {
  const file = resolve(cwd, "components.json")
  if (!existsSync(file)) return
  const json = JSON.parse(readFileSync(file, "utf8"))
  json.registries ??= {}
  if (json.registries[REGISTRY_NAMESPACE] !== REGISTRY_URL) {
    json.registries[REGISTRY_NAMESPACE] = REGISTRY_URL
    writeFileSync(file, JSON.stringify(json, null, 2) + "\n")
    console.log(
      pc.green(`✔ Registered ${REGISTRY_NAMESPACE} in components.json`)
    )
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
  .version("0.1.0")

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
    if (shadcn(["init", "-y", "-b", "neutral"], cwd) !== 0) process.exit(1)
    ensureNamespace(cwd)
    if (
      shadcn(
        ["add", ...FOUNDATION.map((n) => `${REGISTRY_NAMESPACE}/${n}`)],
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
    ensureNamespace(cwd)
    const passthrough = opts.yes ? ["-y"] : []
    const refs = components.map((c) =>
      c.includes("/") || c.startsWith("http") ? c : `${REGISTRY_NAMESPACE}/${c}`
    )
    process.exit(shadcn(["add", ...refs, ...passthrough], cwd))
  })

program.parse()
