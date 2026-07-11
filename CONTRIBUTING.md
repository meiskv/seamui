# Contributing to seamui

Thanks for helping build seamui. This guide is the human-facing distillation of
[`CLAUDE.md`](./CLAUDE.md) (the canonical contract — read it in full before your
first component). If the two ever disagree, `CLAUDE.md` wins.

## What seamui is

seamui is shadcn/ui's distribution model — you own the code, installed via the
registry — rebuilt on **Base UI** primitives with a **motion.dev** animation
layer designed around mobile principles: **springs, touch feedback, and depth.**

Five properties every change must keep true:

1. **You own the code.** Components live in the consumer's repo; no runtime seamui package.
2. **Tailwind v4 + CSS variables + `cva`** for styling.
3. **The registry protocol.** `registry.json` → `shadcn build` → `public/r/*.json`.
4. **Base UI** (not Radix) for headless primitives.
5. **motion.dev** (not CSS transitions) for animation.

## The design language, in one paragraph

The canvas is warm light-gray; controls are raised white **keys** with soft
shadows and **squircle** corners. Containers the user acts *into* are
**debossed** wells (`bg-muted` + `shadow-well`); the thing the user selects,
types, or activates is **embossed** (`shadow-resting` on a light surface). Every
interactive control presses *into* the surface (`depth.pressed`) and settles
back on a spring. Overlays rise (`depth.overlay`); modals rise higher
(`depth.modal`). If you can't tell which half of your control is which, ask: *is
this the slot, or the token in the slot?* Slot → debossed. Token → embossed.

## Ground rules (the non-negotiables)

- Edit `apps/www/registry/seam/**`, never `apps/www/public/r/**` (generated —
  run `bun run registry:build` and commit the output).
- Motion comes only from `@/lib/motion` tokens. No inline springs, no ad-hoc
  `duration: 0.3`. Durations are allowed only for opacity fades and layout
  dimensions that can't spring (height/width).
- **Reduced motion is a variant, not a kill switch.** Swap movement for opacity
  (`reduced.pressed`, `reduced.fadeIn`, `reduced.instant`); never
  `reduceMotion ? undefined : …`. A reduced-motion user must still get feedback
  on every interaction.
- **Dogfood the foundation.** Button-shaped things reuse `Button` /
  `buttonVariants`; toggle-shaped things reuse `toggleVariants`; entry wells
  follow `Input`'s debossed styling. Never paste the button base classes or an
  inline `whileTap` into a new component.
- Base UI button-like parts get motion via the `render` prop (see
  `ui/button.tsx`), **never** `motion.create(BaseButton)`. Composite widgets
  (Tabs, Toolbar, Menu) need `buttonVariants(...)` classes on the composite-safe
  element instead of a wrapping `Button` — a wrapper breaks roving focus.
- Theme tokens live in `registry/seam/theme/theme.css`; regenerate
  `apps/www/app/globals.css` from it (command in `CLAUDE.md` §2) — never edit
  the copy directly.
- `data-slot` on every exported wrapper; shadcn-style names.

## Adding a component

1. Read the Base UI docs for the part: `base-ui.com/react/components/<name>` —
   anatomy, state attributes, mount/unmount behavior.
2. Create `apps/www/registry/seam/ui/<name>.tsx` following §4–§5 of `CLAUDE.md`.
3. Add examples in `registry/seam/examples/` — `<name>-demo.tsx` plus one per
   meaningful variant (aim for ≥3 where it makes sense).
4. Register in `registry.json`: npm `dependencies`, `registryDependencies`
   (always the `utils` URL; `motion` if animated; plus any seamui component it
   composes).
5. `bun run registry:build` — confirm `public/r/<name>.json` emits, commit it.
6. Add the docs page and nav entry (below).
7. Verify the four gates (below).

## The docs page template (v2 — code-first)

Every component gets `apps/www/app/docs/components/<name>/page.tsx` with this
exact section order (copy the reference page, `button`). The page is
**code-first and minimal**: the preview and its source carry the page;
everything else earns its place or doesn't exist.

1. **Title + one-line description** — what it is, in seam terms.
2. **`VariantPreview`** — the single persistent preview. Pass every meaningful
   example as a variant (the `<name>-demo` first). The live example shows on
   top; the variant keys sit in a row **below** it; and the selected variant's
   source is **always visible** in its own highlighted block underneath — no
   click to reveal the code, no long scroll of stacked examples.
3. **`<Install name="<name>" />`** — the compact command row (no heading).
4. **`ApiTable`** (optional) — `{ prop, type, default?, desc }` rows for
   components with meaningful props, derived from the component source. This
   replaces prose that describes props in sentences.
5. **`<Notes>`** — the ONLY prose section: 1–4 terse bullets of facts *unique
   to this component* (a signature motion detail, a permission caveat, an a11y
   quirk the consumer must know). It auto-appends the link line to the global
   Motion/Haptics policy pages — **never restate global policy per page**
   ("honors reduced motion", "press recedes", "focus-visible ring" are all
   boilerplate; cut them).

A **Usage** section exists only when it shows something no variant displays
(a provider requirement, a controlled-props pattern) — a bare code block, one
sentence max. If the variant source already shows the import and basic JSX,
Usage duplicating it is a bug, not documentation.

**The `VariantPreview` (examples switcher).** `components/docs/variant-preview.tsx`
takes `variants: { key, title, component, code, description? }[]`. `key` is a
URL-hash-safe slug (the selected variant is reflected in the hash, so
`…/button#loading` deep-links). `code` is `exampleSource("<example-name>")` so it
never drifts from what ships. The variant keys dogfood the seamui `Button` at
its smallest size (active = a raised `secondary` key, `aria-pressed`); the code
block dogfoods the seamui `CodeBlock`, so it comes syntax-highlighted with a
copy key for free. The example swap is opacity-only (identical under reduced
motion). Don't reintroduce a stacked "Examples" section below it — the switcher
*is* the examples.

Then add the component to **both** hand-maintained indexes:
- `components/site/nav-items.ts` (sidebar group)
- `app/docs/components/page.tsx` (`COMPONENTS` overview grid)

Docs debt is a bug: a component without a docs page, or a docs page whose
Notes/API don't match the code, should be filed and fixed like any other
defect. So is bloat — a Usage block duplicating the variant source, or global
policy restated per page.

## Quality gates (CI)

Every push and PR runs `.github/workflows/ci.yml`. Run the same gates locally
before you push — `bun run verify` chains the fast ones:

| Command | Gate | What it enforces |
|---|---|---|
| `bun run lint` | Format, Lint, Typecheck | Biome format + lint (`biome ci`) |
| `bun run typecheck` | Format, Lint, Typecheck | `tsc --noEmit` in the docs app **and** the CLI |
| `bun run motion:check` | Format, Lint, Typecheck | the motion contract: no reduced-motion kill switches, no inline springs/durations (§3/§5) |
| `bun run test` | Unit Test | Vitest — motion tokens, `cn`, haptics, foundation components, CLI, registry integrity |
| `bun run test:coverage` | Test Coverage Gate | Vitest coverage thresholds on `registry/seam/lib/**` |
| `bun run drift:check` | Release Smoke | `public/r/**` rebuilt + `app/globals.css` regenerated (no hand-edits) |
| `bun run smoke` | Release Smoke | the CLI runs under node; every `public/r/*.json` is valid |
| `bun run build` | Release Smoke | the docs site builds |
| `bun run test:e2e` | Browser Smoke | Playwright drives the four gates below in a real browser |

`bun run verify` = lint + typecheck + motion:check + test + drift. The browser
smoke (`test:e2e`) and `build` are heavier; run them when you touch motion or
the build.

Adding an ambient, infinite-repeat animation that legitimately needs an inline
`duration`? Add its file to `scripts/motion-contract-allow.txt` with a one-line
justification — that's a reviewed exception, not a workaround.

## Verifying — the four gates

Compilation proves nothing about motion. `bun run test:e2e` automates these, but
also run the dev server (`bun run dev`) and check them by hand in a real browser:

1. **Pointer** — press feedback fires in ≤1 frame, settles on a spring, never
   blocks the click.
2. **Keyboard** — same feedback on keyboard activation; focus visible; arrow
   keys work in composite widgets.
3. **Reduced motion** — emulate `prefers-reduced-motion: reduce`; every
   interaction still gives (opacity) feedback. Nothing goes dead.
4. **Dark mode** — tokens flip, depth still reads.

## Pull requests

Keep PRs to one component or one concern. The PR template's checklist mirrors
this guide — fill it honestly; "N/A" is a fine answer with a reason. Include a
screenshot or clip for anything visual (light + dark).
