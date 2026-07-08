# seamui CLI

The command-line installer for [seamui](https://seamui.vercel.app) — beautifully animated components you own, built on Base UI primitives with a motion.dev animation layer.

It's a thin wrapper over the shadcn CLI: it scaffolds your project, wires the `@seamui` registry namespace into `components.json`, and delegates installs to shadcn.

## Usage

```bash
# Set up seamui in a new or existing project
bunx --bun seamui@latest init -t next     # or: vite | remix

# Add components
bunx --bun seamui@latest add button
```

Prefer the shadcn CLI directly? Add the namespace to `components.json`:

```json
{ "registries": { "@seamui": "https://seamui.vercel.app/r/{name}.json" } }
```

then `bunx --bun shadcn@latest add @seamui/button`.

## Commands

| Command | Description |
|---|---|
| `init -t <framework>` | Scaffold (if empty), run `shadcn init`, register `@seamui`, install foundation (`theme`, `utils`, `motion`). |
| `add <component…>` | Ensure the `@seamui` namespace, then `shadcn add @seamui/<name>`. |

All commands accept `--cwd <dir>` and `--yes`, and pass unknown flags through to shadcn.
