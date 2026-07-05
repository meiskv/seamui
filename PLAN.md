# seamui — Implementation Plan

> **seamui** is a shadcn/ui-style component distribution built on **Base UI** primitives instead of Radix, with a first-class **motion layer** powered by **motion.dev** — animation designed around mobile principles: springs over durations, touch feedback, and depth.
>
> This document is the executable spec. An agent (or human) with no prior context should be able to build seamui end-to-end by following it top to bottom. Every phase has exact commands, full file contents, and acceptance criteria.

---

## Table of contents

1. [Vision & product shape](#1-vision--product-shape)
2. [Locked technical decisions](#2-locked-technical-decisions)
3. [The seam motion system (design principles)](#3-the-seam-motion-system)
4. [Repository structure](#4-repository-structure)
5. [Phase 0 — Scaffold the monorepo](#5-phase-0--scaffold-the-monorepo)
6. [Phase 1 — Foundation: tokens, utils, motion primitives, registry infra](#6-phase-1--foundation)
7. [Phase 2 — The Button primitive (reference implementation)](#7-phase-2--the-button-primitive)
8. [Phase 3 — Distribution: registry + CLI](#8-phase-3--distribution-registry--cli)
9. [Phase 4 — Docs page template (installation / usage / examples / API)](#9-phase-4--docs-page-template)
10. [Phase 5 — Component roadmap](#10-phase-5--component-roadmap)
11. [The replication pattern — checklist for every new component](#11-the-replication-pattern)
12. [Verification & definition of done](#12-verification--definition-of-done)

---

## 1. Vision & product shape

seamui copies the three things that made shadcn/ui win, and changes exactly two ingredients:

| Aspect | shadcn/ui | seamui |
|---|---|---|
| Distribution | Copy-paste code you own, installed via CLI/registry | **Same** (uses the shadcn registry protocol) |
| Styling | Tailwind + CSS variables + `cva` | **Same** |
| Headless primitives | Radix UI | **Base UI** (`@base-ui/react`) |
| Animation | CSS transitions / `tailwindcss-animate` | **motion.dev** (`motion`) — spring physics, depth, touch feedback |

**Non-negotiable product properties:**

- Users **own the code**. Components are copied into their project, not imported from an npm package.
- Every component works out of the box with **one CLI command** and degrades gracefully with `prefers-reduced-motion`.
- Motion is **not decoration** — it is a system (Section 3) with shared tokens, so every component feels like one product.
- Docs for every component follow one fixed template: **Installation → Usage → Examples → API Reference → Motion → Accessibility** (Section 9).

**End-user experience (the target):**

```bash
# One-time project setup (Phase 3a — via the shadcn CLI + seamui registry)
bunx --bun shadcn@latest init
bunx --bun shadcn@latest add @seamui/button

# Phase 3b — seamui's own CLI wrapper (same registry underneath)
bunx --bun seamui@latest init -t next
bunx --bun seamui@latest add button
```

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="default" size="lg">Continue</Button>
}
```

---

## 2. Locked technical decisions

These are decided. Do not re-litigate them during implementation.

| Decision | Value | Notes |
|---|---|---|
| Primitives | `@base-ui/react` (v1.6+) | ⚠️ The package was **renamed** from `@base-ui-components/react` to `@base-ui/react`. Never use the old name. Import per-component: `import { Button } from "@base-ui/react/button"`. |
| Animation | `motion` (v12+) | Import from `"motion/react"`. Never install `framer-motion`. |
| Styling | Tailwind CSS **v4** | Tokens via `@theme inline` + CSS variables, same convention as shadcn's Tailwind v4 style. |
| Variants | `class-variance-authority` | Identical pattern to shadcn. |
| Class merging | `clsx` + `tailwind-merge` via a `cn()` util | Identical to shadcn. |
| Distribution | shadcn **registry protocol** | `registry.json` + `registry-item.json` schemas from `https://ui.shadcn.com/schema/`. This gives us `shadcn add @seamui/*` compatibility for free. |
| CLI | Phase 3a: piggyback on `shadcn` CLI. Phase 3b: publish `seamui` npm package that wraps it. | Never fork the registry format — the seamui CLI is a thin UX layer over the same JSON. |
| Runtime | React 19+, RSC-compatible | Every animated component gets `"use client"`. |
| Package manager / runner | `bun` in all docs examples (`bunx --bun …`), but registry items must not assume any package manager. | |
| Registry style name | `seam` | Single style (no `new-york`/`default` split). Lives under `registry/seam/`. |
| Docs/registry host | Next.js app at `apps/www`, registry JSON served from `/r/{name}.json` | Domain placeholder: `https://seamui.dev`. Until the domain exists, use the deployment URL; it is referenced in exactly one place (`REGISTRY_URL` constant + docs), so swapping is trivial. |

**Key Base UI facts the implementer must know:**

- Base UI ships a real `Button` component (`@base-ui/react/button`) — with `disabled`, `focusableWhenDisabled`, and a `render` prop for composition (`render={<a href/>}` replaces Radix's `asChild`).
- Base UI popups require a stacking context on the app root. `init` must add `isolation: isolate` to the root layout element (documented in Base UI's quick start). Bake this into the seamui theme/init registry item so users never hit z-index bugs.
- Available Base UI parts (verified against the published package, for the roadmap in Section 10): accordion, alert-dialog, autocomplete, avatar, button, checkbox, checkbox-group, collapsible, combobox, context-menu, dialog, drawer, field, fieldset, form, input, menu, menubar, meter, navigation-menu, number-field, otp-field, popover, preview-card, progress, radio, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, toggle-group, toolbar, tooltip, use-render, merge-props.

---

## 3. The seam motion system

This is what differentiates seamui. Every animated behavior in every component must come from these tokens — no ad-hoc `duration: 0.3` anywhere.

### Principles (mobile-first physics)

1. **Springs, not durations.** Mobile OSes (iOS/Android) animate with physics so interactions feel interruptible and continuous. All transitions are spring-based; durations only for opacity-only fades.
2. **Depth, not just position.** The UI is a stack of surfaces. Interactions move elements along a virtual z-axis:
   - *Press* = element recedes **into** the surface (scale down slightly + shadow tightens).
   - *Overlay enter* (dialog, popover, toast) = surface **rises toward** the user (scale from ~0.96 → 1, shadow grows, backdrop dims what's "below").
   - *Dismiss* = surface falls back and fades.
3. **Touch feedback is instant, release is springy.** Press-down responds in ≤1 frame (stiff spring); release settles with soft overshoot. Feedback must also fire on keyboard activation, not just pointer.
4. **Interruptible & redirectable.** A mid-flight animation retargets instead of restarting (motion.dev does this natively — never gate animation behind `isAnimating` state).
5. **Reduced motion is a first-class variant.** When `prefers-reduced-motion` is on: scale/translate effects are removed, opacity fades remain. Use `useReducedMotion()` from `motion/react` in every animated component.
6. **Nothing blocks input.** Animations never delay interactivity — a button is clickable during its own settle.

### Motion tokens — `lib/motion.ts` (full file, shipped by registry item `motion`)

```ts
// lib/motion.ts
// seamui motion tokens — the single source of truth for all animation.
// Springs over durations; depth over flatness. See seamui docs → Motion.
import type { Transition } from "motion/react"

/** Spring presets, tuned against 60fps mobile feel. */
export const springs = {
  /** Press-down feedback: near-instant, no bounce. */
  press: { type: "spring", stiffness: 600, damping: 40, mass: 0.5 } satisfies Transition,
  /** Release / hover settle: quick with a hint of life. */
  snappy: { type: "spring", stiffness: 420, damping: 30, mass: 0.7 } satisfies Transition,
  /** Overlays entering (dialogs, popovers, sheets). */
  surface: { type: "spring", stiffness: 320, damping: 28, mass: 0.9 } satisfies Transition,
  /** Playful accents (toasts, badges). Use sparingly. */
  bouncy: { type: "spring", stiffness: 380, damping: 18, mass: 0.9 } satisfies Transition,
} as const

/** Opacity-only fades (the one place plain durations are allowed). */
export const fades = {
  fast: { duration: 0.12, ease: "easeOut" },
  normal: { duration: 0.2, ease: "easeOut" },
} as const satisfies Record<string, Transition>

/**
 * Depth scale — virtual z-axis positions expressed as scale + shadow pairs.
 * pressed  : element pushed into the surface
 * resting  : neutral
 * raised   : hover/lifted state
 * overlay  : floating surfaces (popover, dropdown)
 * modal    : top-of-stack surfaces (dialog, sheet)
 */
export const depth = {
  pressed: { scale: 0.97 },
  resting: { scale: 1 },
  raised: { scale: 1.02 },
  overlay: { initial: { opacity: 0, scale: 0.96, y: 4 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.98, y: 2 } },
  modal: { initial: { opacity: 0, scale: 0.96, y: 8 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.97, y: 6 } },
} as const
```

**Rules for implementers:**

- Components import from `@/lib/motion` — never inline spring configs.
- Adding a new preset requires updating this file **in the registry** so all future installs get it; never add per-component one-offs.
- Every animated component must have a reduced-motion branch (pattern shown in the Button, Section 7).

---

## 4. Repository structure

Bun workspaces monorepo:

```
seamui/
├── PLAN.md                      # this file
├── README.md
├── package.json                 # workspaces: ["apps/*", "packages/*"]
├── bun.lock
├── apps/
│   └── www/                     # Next.js: docs site + registry host
│       ├── app/
│       │   ├── (docs)/docs/components/button/page.mdx
│       │   └── layout.tsx
│       ├── public/r/            # BUILT registry output: r/{name}.json  (committed or built in CI)
│       ├── registry.json        # registry index (input to `shadcn build`)
│       ├── registry/
│       │   └── seam/
│       │       ├── ui/button.tsx        # component sources (canonical)
│       │       ├── lib/utils.ts
│       │       ├── lib/motion.ts
│       │       ├── theme/theme.css      # seam tokens (registry:theme item)
│       │       └── examples/button-*.tsx  # demo blocks used by docs AND shipped as examples
│       ├── components.json
│       └── package.json
└── packages/
    └── seamui/                  # the `seamui` CLI (Phase 3b) — npm package name: seamui
        ├── src/index.ts
        └── package.json
```

Canonical component code lives **once**, in `apps/www/registry/seam/…`. The docs site imports it directly (so docs demos are always the real shipped code), and `shadcn build` compiles it into `public/r/*.json`.

---

## 5. Phase 0 — Scaffold the monorepo

```bash
# from repo root
bun init -y
mkdir -p apps packages
cd apps
bunx --bun create-next-app@latest www --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-bun
cd ..
```

Root `package.json`:

```json
{
  "name": "seamui-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "bun run --cwd apps/www dev",
    "build": "bun run --cwd apps/www build",
    "registry:build": "bun run --cwd apps/www registry:build"
  }
}
```

In `apps/www`:

```bash
bun add @base-ui/react motion class-variance-authority clsx tailwind-merge lucide-react
bun add -d shadcn
```

Add to `apps/www/package.json` scripts: `"registry:build": "shadcn build"`.

**Acceptance:** `bun run dev` serves the Next.js app; `bun pm ls` shows `@base-ui/react@^1`, `motion@^12`.

---

## 6. Phase 1 — Foundation

Create these files under `apps/www/registry/seam/`. Each becomes a registry item.

### 6.1 `lib/utils.ts` (registry item: `utils`, type `registry:lib`)

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 6.2 `lib/motion.ts` (registry item: `motion`, type `registry:lib`)

Exactly the file from Section 3.

### 6.3 `theme/theme.css` (registry item: `theme`, type `registry:theme`)

Use shadcn's Tailwind v4 CSS-variable convention verbatim (`:root`/`.dark` with `--background`, `--foreground`, `--primary`, `--radius`, etc., mapped through `@theme inline`) so seamui components are drop-in compatible with existing shadcn themes. Two seamui additions:

```css
/* seamui additions on top of the standard shadcn v4 token block */
:root {
  /* depth shadows — used by the motion system's z-axis */
  --shadow-pressed: 0 1px 1px 0 rgb(0 0 0 / 0.04);
  --shadow-resting: 0 1px 2px 0 rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.08);
  --shadow-raised: 0 2px 4px -1px rgb(0 0 0 / 0.07), 0 4px 8px -2px rgb(0 0 0 / 0.08);
  --shadow-overlay: 0 4px 12px -2px rgb(0 0 0 / 0.1), 0 12px 24px -4px rgb(0 0 0 / 0.12);
  --shadow-modal: 0 8px 24px -4px rgb(0 0 0 / 0.14), 0 24px 48px -8px rgb(0 0 0 / 0.18);
}

/* Base UI requirement: popups need an isolated stacking context at the root. */
#root, body > div:first-child, main { isolation: isolate; }
```

(The `@theme inline` block must map these: `--shadow-*` tokens become `shadow-pressed` … `shadow-modal` utilities.)

**Acceptance:** a scratch page renders text styled with `bg-background text-foreground shadow-resting`; toggling `.dark` on `<html>` flips colors.

---

## 7. Phase 2 — The Button primitive

This is the **reference implementation** — every future component copies its anatomy: *Base UI primitive → motion layer → cva variants → cn merge → reduced-motion branch*.

### 7.1 `registry/seam/ui/button.tsx` — full source

```tsx
"use client"

import * as React from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import { motion, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { springs, depth } from "@/lib/motion"

const buttonVariants = cva(
  // base — note: no CSS transition classes; motion.dev owns transform/shadow.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-resting hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-resting hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-pressed hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-pressed hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

// Base UI Button composed with motion. motion.create() wraps any
// ref-forwarding component with animation props (whileTap, transition, …).
const MotionBase = motion.create(BaseButton)

/** Variants that sit flat on the surface don't animate depth on press. */
const FLAT_VARIANTS = new Set(["ghost", "link"])

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof MotionBase>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, disabled, ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const animatesDepth =
    !reduceMotion && !disabled && !FLAT_VARIANTS.has(variant ?? "default")

  return (
    <MotionBase
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      // seam motion: press recedes into the surface, release springs back.
      whileTap={animatesDepth ? depth.pressed : undefined}
      transition={springs.press}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

Implementation notes (verify each during the build):

- `motion.create(BaseButton)` works because Base UI components forward refs and spread unknown props. If `whileTap` visual feedback fails to fire on keyboard activation (Space/Enter), add `whileFocus`-independent handling: pass `onKeyDown`/`onKeyUp` handlers that toggle a pressed animate state — but **test first**; motion's `whileTap` handles keyboard activation on buttons in current versions.
- Link-style rendering uses Base UI composition, preserved through the wrapper: `<Button render={<a href="/docs" />}>Docs</Button>` — this replaces Radix/shadcn's `asChild`. Document it.
- Keep `buttonVariants` exported — other components (e.g. AlertDialog actions) reuse it, same as shadcn.
- Class names deliberately mirror shadcn's button so users can migrate by swapping files.

### 7.2 Examples — `registry/seam/examples/`

Ship at least these five demo files (each ~10 lines, also rendered in docs):

| File | Shows |
|---|---|
| `button-demo.tsx` | default button |
| `button-variants.tsx` | all six variants in a row |
| `button-sizes.tsx` | `sm` / `default` / `lg` / `icon` (icon uses `lucide-react`) |
| `button-loading.tsx` | disabled + `Loader2` spinner icon |
| `button-link.tsx` | `render={<a href … />}` composition |

Example (`button-demo.tsx`):

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return <Button>Continue</Button>
}
```

### 7.3 Registry item — `public/r/button.json` (built from `registry.json`)

`apps/www/registry.json` entry:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "seamui",
  "homepage": "https://seamui.dev",
  "items": [
    {
      "name": "theme",
      "type": "registry:theme",
      "title": "seam theme",
      "files": [{ "path": "registry/seam/theme/theme.css", "type": "registry:theme" }]
    },
    {
      "name": "utils",
      "type": "registry:lib",
      "dependencies": ["clsx", "tailwind-merge"],
      "files": [{ "path": "registry/seam/lib/utils.ts", "type": "registry:lib" }]
    },
    {
      "name": "motion",
      "type": "registry:lib",
      "title": "seam motion tokens",
      "dependencies": ["motion"],
      "files": [{ "path": "registry/seam/lib/motion.ts", "type": "registry:lib" }]
    },
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "Button built on Base UI with seam depth motion.",
      "dependencies": ["@base-ui/react", "motion", "class-variance-authority"],
      "registryDependencies": ["https://seamui.dev/r/utils.json", "https://seamui.dev/r/motion.json"],
      "files": [{ "path": "registry/seam/ui/button.tsx", "type": "registry:ui" }]
    }
  ]
}
```

Run `bun run registry:build` → outputs `public/r/{theme,utils,motion,button}.json`.

**Acceptance for Phase 2:**

1. `bun run registry:build` succeeds and `public/r/button.json` validates against `https://ui.shadcn.com/schema/registry-item.json`.
2. In a **fresh** throwaway Next.js app: `bunx --bun shadcn@latest add http://localhost:3000/r/button.json` (while `apps/www` dev server runs) installs `components/ui/button.tsx`, `lib/utils.ts`, `lib/motion.ts` and the npm deps, and the demo renders.
3. Press feedback: pointer-down scales to 0.97 with a stiff spring; release springs back; Space-key activation also shows feedback.
4. With OS reduced-motion enabled (or DevTools emulation), no scaling occurs; the button still works.
5. `render={<a href="#" />}` renders an anchor with button styles and motion.

---

## 8. Phase 3 — Distribution: registry + CLI

### Phase 3a — shadcn-native (ship first, zero CLI code)

Deploy `apps/www` (Vercel). Users configure the namespace once in their `components.json`:

```json
{
  "registries": {
    "@seamui": "https://seamui.dev/r/{name}.json"
  }
}
```

Then:

```bash
bunx --bun shadcn@latest add @seamui/button
```

Also support direct URLs with no config: `bunx --bun shadcn@latest add https://seamui.dev/r/button.json`.

### Phase 3b — the `seamui` CLI (npm package `seamui`)

A thin wrapper over the `shadcn` CLI — **it must not reimplement the registry protocol.** Commands:

```bash
bunx --bun seamui@latest init -t [framework]   # framework: next | vite | remix (default: next)
bunx --bun seamui@latest add [component...]    # e.g. add button
```

Behavior spec:

- **`init -t <framework>`**
  1. If no project exists in cwd, scaffold one (`create-next-app` / `create-vite` per `-t`), else operate in place.
  2. Run `shadcn init` programmatically (spawn `bunx --bun shadcn@latest init -y -b neutral` or the current equivalent flags).
  3. Patch `components.json`: add the `@seamui` registry namespace.
  4. Install the foundation items: `shadcn add @seamui/theme @seamui/utils @seamui/motion`.
  5. Print next steps (`seamui add button`).
- **`add <component…>`** → ensure `components.json` has the `@seamui` namespace (add it if missing), then spawn `shadcn add @seamui/<name> …` for each.
- Implementation: TypeScript, `commander` for args, `execa` (or `Bun.spawn`) for spawning, `@clack/prompts` for interactive bits. Build with `bun build --target=node` → publish with a `bin` entry: `{ "bin": { "seamui": "dist/index.js" } }`.
- Every command supports `--cwd`, `--yes`, and passes unknown flags through to `shadcn`.

**Acceptance for Phase 3:** in an empty directory, `bunx --bun seamui@latest init -t next` followed by `bunx --bun seamui@latest add button` produces a running app where the button demo works — with no manual steps in between.

---

## 9. Phase 4 — Docs page template

Every component gets one MDX page at `apps/www/app/(docs)/docs/components/<name>/page.mdx` with **exactly** these sections in this order. This is the template — `<name>` = button shown filled in:

````mdx
# Button

Displays a button. Built on Base UI, animated with seam depth motion.

<ComponentPreview name="button-demo" />

## Installation

<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">

```bash
bunx --bun seamui@latest add button
```

or with the shadcn CLI:

```bash
bunx --bun shadcn@latest add @seamui/button
```

</Tab>
<Tab value="Manual">

1. Install dependencies:

```bash
bun add @base-ui/react motion class-variance-authority
```

2. Copy `lib/motion.ts` and `lib/utils.ts` from the Foundation docs.
3. Copy the source below into `components/ui/button.tsx`.

<ComponentSource name="button" />

</Tab>
</Tabs>

## Usage

```tsx
import { Button } from "@/components/ui/button"
```

```tsx
<Button variant="outline" size="lg">Button</Button>
```

## Examples

### Variants
<ComponentPreview name="button-variants" />

### Sizes
<ComponentPreview name="button-sizes" />

### Loading
<ComponentPreview name="button-loading" />

### As a link
Use Base UI's `render` prop (replaces Radix `asChild`):
<ComponentPreview name="button-link" />

## API Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style. |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Dimensions. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Render a different element (e.g. `<a>`). From Base UI. |
| `disabled` | `boolean` | `false` | Also accepts Base UI's `focusableWhenDisabled`. |

Plus all native `<button>` props and motion props (`whileTap` etc. can be overridden).

## Motion

Press recedes to `depth.pressed` (scale 0.97) with `springs.press`; release settles with `springs.snappy`. `ghost` and `link` variants stay flat. Honors `prefers-reduced-motion` — depth animation is disabled, everything else works.

## Accessibility

Renders a native `<button>` by default. Keyboard activation (Space/Enter) triggers the same press feedback. Focus is visible via `focus-visible` ring. `focusableWhenDisabled` keeps tab order stable when disabling mid-interaction.
````

Docs infra needed to support this: `ComponentPreview` (renders the example component live + shows its source in a tab) and `ComponentSource` (pretty-prints registry file source). Use **Fumadocs** for the MDX docs framework (best Next.js App Router fit, used by many shadcn-registry projects); its Tabs components map directly to the template above.

**Acceptance:** `/docs/components/button` renders with live interactive demos, and copying the Manual instructions into a clean app works.

---

## 10. Phase 5 — Component roadmap

Build order after Button — chosen so each wave reuses the previous wave's motion patterns. All primitives come from `@base-ui/react/<part>` (verified available, Section 2):

| Wave | Components | New motion pattern introduced |
|---|---|---|
| 1 | Button ✅, Toggle, Toggle Group, Input, Separator, Avatar | press depth (`depth.pressed`) |
| 2 | Switch, Checkbox, Radio Group, Slider | continuous drag physics; thumb springs (`springs.snappy`) |
| 3 | Tooltip, Popover, Preview Card | `depth.overlay` enter/exit with `AnimatePresence`, origin-aware scaling |
| 4 | Dialog, Alert Dialog, Drawer (sheet) | `depth.modal`, backdrop dim = "page recedes"; drawer gets gesture-driven drag-to-dismiss |
| 5 | Select, Combobox, Autocomplete, Menu, Context Menu, Menubar | overlay + staggered item reveal |
| 6 | Tabs, Accordion, Collapsible, Navigation Menu | layout animation (`layout` prop) for indicator/height |
| 7 | Toast, Progress, Meter, Number Field, OTP Field, Scroll Area, Form/Field | `springs.bouncy` toast entrance; animated number transitions |

Exit animations for overlay components: Base UI keeps popups mounted during exit when animations are declared; pair its open state with motion's `AnimatePresence` — establish the canonical pattern in Wave 3 (Tooltip) and copy it everywhere.

---

## 11. The replication pattern

**Checklist for adding ANY new component `<name>` (this is the "pattern" — follow it mechanically):**

1. **Read the Base UI docs** for the part (`base-ui.com/react/components/<name>`). Identify its anatomy (Root/Trigger/Popup/etc.), state attributes (`data-open`, `data-pressed`, …), and whether it manages mounting (needs `AnimatePresence` pairing).
2. **Create** `apps/www/registry/seam/ui/<name>.tsx`:
   - `"use client"` at top.
   - Import parts from `@base-ui/react/<name>`, motion from `motion/react`, tokens from `@/lib/motion`, `cn` from `@/lib/utils`.
   - ⚠️ **`motion.create()` typing gotcha:** when you wrap a Base UI part with `motion.create()`, type the wrapper component's props with `React.ComponentPropsWithoutRef<typeof MotionX>` — **not** `React.ComponentProps<typeof BaseX>`. Base UI types DOM handlers like `onAnimationStart` as CSS-animation events, which collide with motion's lifecycle callbacks of the same name; taking props from the motion-wrapped component resolves the overload. (Learned building Button + Avatar.)
   - One exported wrapper per Base UI part, named like shadcn (`Dialog`, `DialogTrigger`, `DialogContent`, …), each with `data-slot` attributes.
   - Style with `cva` when the part has variants; plain `cn` otherwise.
   - Animate **only** with tokens from `lib/motion.ts`; assign the correct depth level (press → `pressed`, floating → `overlay`, top-of-stack → `modal`).
   - Add the `useReducedMotion()` branch.
3. **Create examples** in `registry/seam/examples/`: `<name>-demo.tsx` + one per meaningful variant/pattern (minimum 3).
4. **Register** it in `registry.json` with correct `dependencies` and `registryDependencies` (always include `utils` + `motion` URLs; include other seamui components it composes, e.g. dialog → button).
5. **Build & validate**: `bun run registry:build`; JSON validates; item installs into a clean app via `shadcn add <local url>`.
6. **Write the docs page** from the Section 9 template — all seven sections, no omissions.
7. **Test the four gates**: pointer interaction, keyboard interaction, reduced-motion, dark mode.
8. **Update** the components index page and CLI docs list.

---

## 12. Verification & definition of done

The project (through Phase 3) is **done** when all of the following pass:

```bash
# 1. Registry builds and serves
bun run registry:build && bun run build

# 2. Fresh-app install via shadcn CLI (namespace)
mkdir /tmp/smoke && cd /tmp/smoke
bunx --bun create-next-app@latest app --ts --tailwind --app --yes && cd app
bunx --bun shadcn@latest init -y
#   add {"registries":{"@seamui":"https://<deployed-host>/r/{name}.json"}} to components.json
bunx --bun shadcn@latest add @seamui/button
bun run build   # must compile

# 3. Fresh-app install via seamui CLI
mkdir /tmp/smoke2 && cd /tmp/smoke2
bunx --bun seamui@latest init -t next
bunx --bun seamui@latest add button
bun run build   # must compile
```

Manual QA matrix for every shipped component: pointer press/release feel, keyboard activation feedback, `prefers-reduced-motion`, dark mode, `render`-prop composition, SSR (no hydration warnings).

**Out of scope for now** (revisit later): non-React frameworks despite the `-t` flag (reserve `-t` values, error politely), theming marketplace, Figma kit, monorepo publishing of styled packages.
