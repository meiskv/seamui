# seamui

Beautifully animated components you own. shadcn/ui's distribution model, rebuilt on [Base UI](https://base-ui.com) primitives with a [motion.dev](https://motion.dev) animation layer designed around mobile principles — springs, touch feedback, and depth.

```bash
bunx --bun seamui@latest init -t next
bunx --bun seamui@latest add button
```

Or with the shadcn CLI directly:

```bash
bunx --bun shadcn@latest add @seamui/button
```

## Repository

```
apps/www/                     # Next.js docs site + registry host
  registry/seam/              # canonical component sources (the product)
    lib/{utils,motion}.ts     # cn() + seam motion tokens (springs + depth)
    theme/theme.css           # shadcn-compatible Tailwind v4 tokens + depth shadows
    ui/button.tsx             # Button — Base UI primitive + motion.dev depth
    examples/button-*.tsx     # live demos, also shipped as registry examples
  registry.json               # registry index (input to `shadcn build`)
  public/r/*.json             # built registry items served at /r/{name}.json
  app/docs/components/button   # docs page (installation/usage/examples/API/motion/a11y)
packages/seamui/              # the `seamui` CLI — thin wrapper over shadcn
```

## Status

**Phase 0–4 implemented and verified.** The Button primitive builds on Base UI
with the seam depth-motion layer, the registry compiles to valid
`registry-item.json`, the docs site builds and prerenders, and the `seamui`
CLI builds. The full executable spec and roadmap live in [PLAN.md](./PLAN.md).

### Local development

```bash
bun install
bun run dev              # docs site at http://localhost:3000
bun run registry:build   # compile registry/ → apps/www/public/r/*.json
```

> Note: the `@seamui` registry currently points at the `https://seamui.dev`
> placeholder host. Publishing (deploying `apps/www` + the `seamui` npm
> package) is Phase 3a and is not done yet, so the `bunx seamui@latest` /
> `shadcn add @seamui/button` commands go live once that host exists.
