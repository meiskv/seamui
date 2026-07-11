# seamui

Beautifully animated components you own. shadcn/ui's distribution model, rebuilt on [Base UI](https://base-ui.com) primitives with a [motion.dev](https://motion.dev) animation layer designed around mobile principles — springs, touch feedback, and depth.

```bash
bunx --bun @seamui/cli@latest init -t next
bunx --bun @seamui/cli@latest add button
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

## Components (27)

All seven waves of the [PLAN.md](./PLAN.md) roadmap are implemented, each with a
demo and a docs page, all built on Base UI and animated with the seam motion
system:

| Wave | Components | Motion |
|---|---|---|
| 1 | Button, Toggle, Input, Avatar, Separator | press-depth |
| 2 | Switch, Checkbox, Radio Group, Slider | thumb-spring, pop-in, drag cue |
| 3 | Tooltip, Popover, Preview Card | overlay-depth entrance |
| 4 | Dialog, Alert Dialog, Drawer | modal-depth + dimming backdrop / native swipe |
| 5 | Dropdown Menu, Select, Context Menu | overlay-depth menus |
| 6 | Tabs, Accordion, Collapsible | layout animation (sliding indicator, eased height) |
| 7 | Progress, Meter, Number Field, OTP Field, Scroll Area, Toast | eased fill, bouncy toasts |

## Status

**All components implemented and verified.** Every component builds on Base UI
with the seam depth-motion layer; the registry compiles to valid
`registry-item.json` for all items; the docs site builds and prerenders every
page; and the `seamui` CLI builds. Flagship interactions (press, switch, slider,
popover, dialog, select, tabs, toast, OTP) were each driven in a headless
browser to confirm behavior — not just compiled.

**Live:** the registry is deployed at [`https://seamui.dev`](https://seamui.dev)
— `shadcn add @seamui/<name>` and the `@seamui/cli` installer both resolve
against it.

### Local development

```bash
bun install
bun run dev              # docs site at http://localhost:3000
bun run registry:build   # compile registry/ → apps/www/public/r/*.json
```

> The `@seamui` registry is served from `https://seamui.dev` (the built
> `public/r/*.json`), so `bunx --bun @seamui/cli@latest add button` and
> `shadcn add @seamui/button` work against the live host.

### Contributing

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the component checklist, the
docs-page template, and the four verification gates. The full design/motion
contract lives in [`CLAUDE.md`](./CLAUDE.md). New components start as a
[component request](.github/ISSUE_TEMPLATE/component-request.yml) specced in
the seam language — debossed/embossed mapping, motion tokens, and the
reduced-motion variant — before any code.
