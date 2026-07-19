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
    lib/{utils,motion,haptics,use-copy}  # cn() + motion tokens + haptics provider + copy hook
    theme/theme.css           # shadcn-compatible Tailwind v4 tokens + depth shadows
    ui/button.tsx             # Button — Base UI primitive + motion.dev depth
    examples/button-*.tsx     # live demos, also shipped as registry examples
  registry.json               # registry index (input to `shadcn build`)
  public/r/*.json             # built registry items served at /r/{name}.json
  app/docs/components/button   # docs page (preview + examples → install → notes)
packages/seamui/              # the `seamui` CLI — thin wrapper over shadcn
```

## Components (67)

Every component ships with demos and a docs page, all built on Base UI and
animated with the seam motion system. The foundation is the seven-wave
[PLAN.md](./PLAN.md) roadmap:

| Wave | Components | Motion |
|---|---|---|
| 1 | Button, Toggle, Input, Avatar, Separator | press-depth |
| 2 | Switch, Checkbox, Radio Group, Slider | thumb-spring, pop-in, drag cue |
| 3 | Tooltip, Popover, Preview Card | overlay-depth entrance |
| 4 | Dialog, Alert Dialog, Drawer | modal-depth + dimming backdrop / native swipe |
| 5 | Dropdown Menu, Select, Context Menu | overlay-depth menus |
| 6 | Tabs, Accordion, Collapsible | layout animation (sliding indicator, eased height) |
| 7 | Progress, Meter, Number Field, OTP Field, Scroll Area, Toast | eased fill, bouncy toasts |

On top of that foundation the library adds richer, domain-specific sets — badge,
card, table/data-table, command palette, combobox, sidebar, skeleton, spinner,
kbd, and code/terminal blocks, plus **AI/agent** (message, conversation,
composer, response, tool, sources, suggestions, plan/permission/connector cards,
agent-status, …), **voice** (voice avatar / visualizer / control bar,
dictation), and **workbench** (workbench header, session item, branch chip,
checks panel, device selector, …) components. Browse the full catalogue at
[`seamui.dev/docs`](https://seamui.dev/docs).

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
