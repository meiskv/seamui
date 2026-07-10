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

## The docs page template

Every component gets `apps/www/app/docs/components/<name>/page.tsx` with this
exact section order (copy an existing page, e.g. `button`):

1. **Title + one-line description** — what it is, in seam terms.
2. **`VariantPreview`** — the single persistent preview panel. Pass every
   meaningful example as a variant (the `<name>-demo` first); the switcher swaps
   the live example *and* its source in place, so the whole examples set lives
   in one panel instead of a long scroll. Use `ComponentPreview` only for a
   truly single-example component.
3. **Installation** — `<Install name="<name>" />`.
4. **Usage** — import + minimal JSX snippet.
5. **Motion** — what animates, at which depth, with which tokens, *and what the
   reduced-motion variant does*. If the component is static, say that it's
   static by design and why.
6. **Accessibility** — what element renders, what Base UI provides, what the
   consumer must still do.

**The `VariantPreview` (examples switcher).** `components/docs/variant-preview.tsx`
takes `variants: { key, title, component, code, description? }[]`. `key` is a
URL-hash-safe slug (the selected variant is reflected in the hash, so
`…/button#loading` deep-links). `code` is `exampleSource("<example-name>")` so it
never drifts from what ships. The switcher and the Preview/Code toggle both
dogfood the seamui `Tabs`; the panel swap is opacity-only (identical under
reduced motion). Don't reintroduce a stacked "Examples" section below it — the
switcher *is* the examples.

Then add the component to **both** hand-maintained indexes:
- `components/site/nav-items.ts` (sidebar group)
- `app/docs/components/page.tsx` (`COMPONENTS` overview grid)

Docs debt is a bug: a component without a docs page, or a docs page whose
Motion section doesn't match the code, should be filed and fixed like any other
defect.

## Verifying — the four gates

Compilation proves nothing about motion. Run the dev server (`bun run dev`) and
check, in a real browser:

1. **Pointer** — press feedback fires in ≤1 frame, settles on a spring, never
   blocks the click.
2. **Keyboard** — same feedback on keyboard activation; focus visible; arrow
   keys work in composite widgets.
3. **Reduced motion** — emulate `prefers-reduced-motion: reduce`; every
   interaction still gives (opacity) feedback. Nothing goes dead.
4. **Dark mode** — tokens flip, depth still reads.

Also run `npx tsc --noEmit` in `apps/www` before you claim done.

## Pull requests

Keep PRs to one component or one concern. The PR template's checklist mirrors
this guide — fill it honestly; "N/A" is a fine answer with a reason. Include a
screenshot or clip for anything visual (light + dark).
