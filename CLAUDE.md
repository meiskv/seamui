# CLAUDE.md — building on seamui

This file is the durable, model-agnostic contract for any agent (or human)
extending **seamui**. Read it before touching a component. It supersedes the
prose in `PLAN.md` wherever the two disagree — `PLAN.md` is the original build
spec; this file is how the library actually works now.

---

## 0. What seamui is (in one breath)

seamui is **shadcn/ui's distribution model** (you own the code; it's copied into
your app via a registry, not imported from a package) rebuilt on **Base UI**
primitives (`@base-ui/react`, not Radix) with a first-class **motion.dev**
(`motion`) animation layer designed around mobile principles: **springs, touch
feedback, and depth.**

Three things are copied verbatim from shadcn and must never change:

- **You own the code.** Components live in the consumer's repo. No runtime seamui package.
- **Tailwind v4 + CSS variables + `cva`** for styling.
- **The registry protocol.** `registry.json` → `shadcn build` → `public/r/*.json`.

Two things are deliberately swapped:

- **Radix → Base UI** for headless primitives.
- **CSS transitions → motion.dev** for animation.

If you are ever unsure whether a change is "in character," ask: *does it keep
those five properties true?* If not, don't ship it.

---

## 1. The three pillars (this is the product — do not dilute it)

Everything animated must express these. They are not decoration; they are the
reason seamui exists.

### Springs, not durations
Physics, not clocks. Every transform/position transition is a **spring** from
`@/lib/motion`. Plain `duration`-based tweens are allowed in exactly two places:
**opacity fades** (`fades.*`) and **layout dimensions** that can't spring cleanly
(height/width — accordion, progress, meter). Never write an inline spring config
or an ad-hoc `duration: 0.3` in a component.

### Touch feedback
Every interactive control reacts to press **in ≤1 frame** and settles springy on
release. Press = the control recedes *into* the surface (`depth.pressed`, a
subtle scale-down). Feedback must also fire on keyboard activation, and it must
never block the click — the control is usable during its own settle.

### Depth
The UI is a stack of surfaces on a virtual z-axis. Interactions move elements
along it:
- **Press** → recedes into the surface (`depth.pressed`).
- **Overlay enter** (popover, dropdown, tooltip, select) → rises toward the user (`depth.overlay`, springs.surface).
- **Modal enter** (dialog, alert-dialog, drawer) → rises to the top of the stack (`depth.modal`), backdrop dims what's below.
- **Dismiss** → falls back and fades.

The design language expresses depth *statically too* (see §2): raised white
"keys," debossed wells, soft diffuse shadows.

### The debossed/embossed rule (seamui's signature)

**This is the seamui language. Apply it to every control that has a "wrapper" or
container-plus-selection shape** — input, toggle group, tabs, radio, checkbox,
select, OTP, number field, and anything new of that kind:

> The **container/track the user acts *into*** is **debossed** — carved into the
> surface with the inset `shadow-well`, on a `--muted` background. The **thing the
> user selects, types, or activates** is **embossed** — a raised key with
> `shadow-resting` on a light (`--secondary`/`--primary`) surface.

Worked examples of the same one idea:
- **Radio** — debossed ring (`bg-muted` + `shadow-well`), embossed dot (`bg-primary` + `shadow-resting`).
- **Checkbox** — debossed box unchecked; when checked it becomes an embossed primary key (`data-[checked]:shadow-resting`).
- **Tabs / Toggle Group** — debossed well (`shadow-well`) holding embossed active key(s).
- **Input / OTP / Number field / Select trigger** — debossed entry wells you type or pick into.

If you're adding a control and can't tell which half is which, ask: *is this the
slot or the token in the slot?* Slot → debossed. Token → embossed.

---

## 2. Design language (the light theme)

seamui's canvas is a **warm light-gray**, and controls are **raised white keys**
with soft, diffuse shadows and **squircle** (continuous-curvature) corners.
Grouped controls sit in a **debossed well** and the active one **rises as an
embossed key**. Think physical, tactile, iOS-control-center — not flat Material.

Concretely:

- **Canvas** = `--background` (warm gray, ~`oklch(0.958 0.003 106)`). Never pure white.
- **Keys / surfaces** = `--card` / `--popover` / `--secondary` (near-white) + `shadow-resting` or `shadow-raised`.
- **Wells** = `--muted` (recessed gray) + `shadow-well` (an **inset** shadow). Two families use this: (a) **grouped-control wells** the active key rises out of — tabs list, toggle group; (b) **entry fields**, which are debossed/carved-in — text input, OTP slots, number-field group, the default select trigger. Anything the user types or picks *into* reads as recessed; anything that's a tappable surface reads as raised.
- **Embossed active state** = white bg + `shadow-resting`, sitting inside the well (e.g. the selected tab / pressed toggle).
- **Corners** = the `squircle` utility (`corner-shape: squircle` where supported, falls back to `border-radius`). Apply it to keys, wells, pills, inputs, menus, dialogs — **not** to anything that must stay a true circle (avatars, switch thumbs, radio dots use `rounded-full` alone).
- **Generous padding.** seamui runs roomier than stock shadcn — default control height is `h-10`, wells use `p-1.5`. When in doubt, add breathing room.

### Depth tokens (shadows) — defined in `theme/theme.css`, mirrored in `app/globals.css`

| Token | Use |
|---|---|
| `--shadow-pressed` | inputs / controls that sit slightly *in* the surface |
| `--shadow-resting` | a key at rest on the canvas |
| `--shadow-raised` | hover / lifted key |
| `--shadow-overlay` | floating surfaces (popover, dropdown, tooltip) |
| `--shadow-modal` | top-of-stack surfaces (dialog, drawer) |
| `--shadow-well` | **inset** — the debossed container the keys sit in |

> **Two-file rule:** the canonical theme is `registry/seam/theme/theme.css` (this
> is what consumers install). `apps/www/app/globals.css` is a copy with a
> `@import "tailwindcss";` header for the docs site. **Edit `theme.css`, then
> regenerate globals** so they never drift:
> ```bash
> { echo '@import "tailwindcss";'; echo; \
>   echo '/* seam theme tokens (kept in sync with registry/seam/theme/theme.css). */'; \
>   echo; tail -n +9 apps/www/registry/seam/theme/theme.css; } \
>   > apps/www/app/globals.css
> ```
> (`tail -n +9` skips theme.css's own top comment block.)

---

## 3. The motion tokens — `lib/motion.ts` (the single source of truth)

Import from `@/lib/motion`. Never inline. Adding a preset means editing this
file *in the registry* so every future install gets it.

- **`springs`** — `press` (stiff, instant), `snappy` (release/settle), `surface` (overlays), `bouncy` (toasts/accents, sparingly).
- **`fades`** — `fast` / `normal`, opacity-only durations.
- **`depth`** — `pressed` / `resting` / `raised` scalars + `overlay` / `modal` enter/exit objects.
- **`reduced`** — the reduced-motion fallbacks (see §5). `pressed` (dim, no move), `fadeIn` (opacity-only enter), `instant` (zero-duration layout jump).

---

## 4. How to build a component (the mechanical checklist)

For any new component `<name>`:

1. **Read the Base UI docs** for the part: `base-ui.com/react/components/<name>`. Note the anatomy (Root/Trigger/Popup/…), the state attributes (`data-pressed`, `data-popup-open`, `data-checked`, …), and whether Base UI manages mount/unmount (it usually does — it keeps the element mounted through exit, so you animate with `initial`/`animate`, **not** `AnimatePresence`).
2. **Create** `apps/www/registry/seam/ui/<name>.tsx`:
   - `"use client"` at top (any component using hooks or motion).
   - Import the part from `@base-ui/react/<name>`, `motion`/`useReducedMotion` from `motion/react`, tokens from `@/lib/motion`, `cn` from `@/lib/utils`.
   - One exported wrapper per Base UI part, named shadcn-style (`Dialog`, `DialogTrigger`, `DialogContent`…), each carrying a `data-slot`.
   - Style with `cva` if it has variants, else plain `cn`. Apply the design language from §2 (keys, wells, squircle, roomy padding).
   - Animate **only** with `@/lib/motion` tokens at the right depth level.
   - Add the reduced-motion branch (§5) — mandatory.
3. **Examples** in `registry/seam/examples/`: `<name>-demo.tsx` plus one per meaningful variant (aim for ≥3 total where it makes sense).
4. **Register** in `registry.json`: correct `dependencies` (npm) and `registryDependencies` (always the `utils` + `motion` URLs; add any seamui component it composes, e.g. a group → its item).
5. **Build**: `bun run registry:build`. Confirm `public/r/<name>.json` + demo JSON emit.
6. **Docs page** from the template: Installation → Usage → Examples → Motion → Accessibility. Add a nav entry in `components/site/nav-items.ts`.
7. **Verify the four gates in a real browser** (§6): pointer, keyboard, reduced-motion, dark mode.

---

## 5. Animating Base UI parts — the two correct patterns

There are two ways to attach motion to a Base UI primitive. **Choosing the wrong
one is the single most common way to break a seamui component**, so this section
is prescriptive.

### Pattern A — interactive controls (buttons, toggles, steppers): use `render`, NOT `motion.create`

Base UI's button-like parts (`Button`, `Toggle`, `NumberField.Increment`, …)
render a **native `<button>`** and warn (and lose form/a11y semantics) if you
replace it with a non-button. Wrapping the whole part in `motion.create(BasePart)`
does exactly that and also swallows the `render` prop consumers rely on
(`<Button render={<Link/>}>`). **Do not `motion.create()` a Base UI button.**

Instead, keep the Base UI part as-is and pass a `motion.button` (or a
motion-wrapped version of the caller's `render` element) into its `render` prop:

```tsx
<BaseToggle
  data-slot="toggle"
  className={cn(toggleVariants({ variant, size, className }))}
  disabled={disabled}
  render={
    <motion.button
      whileTap={disabled ? undefined : reduceMotion ? reduced.pressed : depth.pressed}
      transition={reduceMotion ? fades.fast : springs.press}
    />
  }
  {...props}
/>
```

`Button` goes one step further: it accepts a consumer `render` (e.g. a `<Link>`),
motion-wraps whatever element type that is (cached `motion.create` per type), and
sets Base UI's `nativeButton` prop correctly so semantics stay intact. See
`registry/seam/ui/button.tsx` — copy that shape for anything button-like.

### Always dogfood the foundation — reuse `Button`/`buttonVariants`, never re-roll it

**seamui is a set of components built *on its own foundation*, not 30 independent
one-offs.** The foundation primitives — `Button` (and its exported
`buttonVariants`), `Toggle` (`toggleVariants`), `Input` — are the single source of
truth for how those shapes look, size, focus, and give feedback. Any *new* control
that is button-shaped (a trigger, a close "✕", a stepper, an icon button, a
pressable key, a segmented option) must **wear the foundation**, not hand-roll a
copy of it.

Two allowed ways to dogfood, in order of preference:

1. **Render the `Button` component** through the Base UI part's `render` prop:
   `<Something.Close render={<Button variant="ghost" size="icon" />}>`. You get the
   base classes, sizes, focus ring, disabled handling, and press motion for free.
2. **Reuse `buttonVariants(...)` classes** on the part's own native element when
   wrapping it in the `Button` *component* would break the part. This is not a
   loophole — it's required for **Base UI composite widgets** (Tabs, Toolbar, Menu)
   where the parent manages roving focus through the child's ref; an extra `Button`
   wrapper swallows that ref and **kills arrow-key navigation** (this actually
   happened with Tabs). There, do
   `className={cn(buttonVariants({ variant: "ghost", size }), …)}` on the plain
   composite-safe element. Same idea for toggle-shaped controls → `toggleVariants`.

**Never** paste the button base string (`inline-flex items-center justify-center …
focus-visible:ring-2 focus-visible:ring-ring/50 … disabled:pointer-events-none …`)
or an inline `whileTap={depth.pressed}` into a component when the foundation already
encodes it. If you're tempted to, you're forking the foundation — stop and reuse it.

**Not everything clickable is a Button.** Debossed *entry wells* (text input, the
default Select trigger, OTP slots, number-field group) are inputs, not keys — they
follow the debossed rule (§1), not `buttonVariants`. Circular thumbs/dots (switch,
slider, radio) are Pattern B. And a slot that only ever renders a
**consumer-provided** element (`DialogTrigger`, `DialogClose`, `PopoverTrigger`) is
already dogfooding — the demo passes a `<Button>` in; leave it be.

### Pattern B — non-button parts (overlays, thumbs, indicators): `render={<motion.div/>}` or `motion.create`

For popups, thumbs, dots, and indicators there's no native-button constraint, so
either pass `render={<motion.div .../>}` (preferred — see `dialog.tsx`,
`popover.tsx`, `select.tsx`) or, for parts you fully control, `motion.create()`
the part.

> **`motion.create()` typing gotcha** (only relevant when you do use it): type the
> wrapper's props with `React.ComponentPropsWithoutRef<typeof MotionX>`, **not**
> `React.ComponentProps<typeof BaseX>`. Base UI types DOM handlers like
> `onAnimationStart` as CSS-animation events, which collide with motion's
> lifecycle callbacks of the same name.

### Overlay entrance pattern (Base UI keeps parts mounted through exit)

```tsx
render={
  <motion.div
    initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}
    animate={depth.overlay.animate}
    transition={reduceMotion ? fades.normal : springs.surface}
  />
}
```

---

## 5b. Reduced motion is a first-class VARIANT — never a kill switch

**This is load-bearing. The most damaging bug in seamui's history was treating
`prefers-reduced-motion` as "turn everything off."** A large fraction of users
(and every machine with the OS accessibility setting on) then saw a completely
dead library and concluded "the motion doesn't work."

The rule: **reduced motion swaps *movement* for *opacity*, it never removes
feedback.**

- Press → `reduced.pressed` (a brief dim) instead of `depth.pressed` (a scale).
- Overlay/modal enter → `reduced.fadeIn` (opacity only) instead of scale+translate.
- Layout/position (switch thumb, tab indicator) → `reduced.instant` (zero-duration jump) or a static styled element instead of a `layout` spring.
- Transitions → `fades.fast`/`fades.normal` instead of springs.

Anti-pattern to grep for and delete on sight:

```tsx
whileTap={reduceMotion ? undefined : depth.pressed}          // ❌ dead on press
initial={reduceMotion ? false : depth.overlay.initial}       // ❌ dead entrance
```

Correct:

```tsx
whileTap={reduceMotion ? reduced.pressed : depth.pressed}    // ✅ still gives feedback
initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}  // ✅ fades in
```

For CSS-transition components (accordion/collapsible height, toast), pair the
transition with `motion-reduce:transition-none` (or a reduced-only opacity
transition) so it still resolves without lurching.

The docs site surfaces this to visitors via
`components/site/reduced-motion-notice.tsx` — a banner that appears only when the
setting is on, explaining what they're seeing and how to turn it off. Keep it.

---

## 6. Verifying — drive it in a real browser, don't just compile

Compilation proves nothing about motion. For any nontrivial change, run the four
gates against the running dev server:

```bash
bun install
bun run dev            # docs at http://localhost:3000
bun run registry:build # after ANY registry/ change
```

The repo's preferred browser driver is the **`agent-browser` CLI** (token-frugal;
`agent-browser skills get core --full` for reference). Emulate the media state you
need — a lot of dev machines have Reduce Motion on, which will make you think
motion is broken:

```bash
agent-browser set media light no-preference   # full motion
agent-browser set media light reduced-motion  # test the fallback variant
agent-browser set media dark                  # dark mode gate
```

Confirm a press actually springs by reading the computed transform mid-gesture
(dispatch `pointerdown`, sample `getComputedStyle(el).transform` — it should be a
sub-1.0 scale matrix, then settle to `none`). A blank page after a burst of edits
usually means the Next dev server's HMR got into a bad state — kill it, `rm -rf
apps/www/.next`, and restart clean rather than debugging phantom errors.

The four gates: **pointer** interaction, **keyboard** activation, **reduced
motion** (feedback still present, just faded), **dark mode** (tokens flip, depth
still reads).

---

## 7. Repo map & commands

```
apps/www/
  registry/seam/            # THE PRODUCT — canonical component sources
    lib/{utils,motion}.ts   # cn() + motion tokens (springs, depth, fades, reduced)
    theme/theme.css         # tokens + depth/well shadows (edit HERE, regen globals)
    ui/<name>.tsx           # one file per component
    examples/<name>-*.tsx   # live demos, shipped as registry examples
  registry.json             # registry index (input to `shadcn build`)
  public/r/*.json           # BUILD OUTPUT — never hand-edit; regenerate
  app/globals.css           # docs-site copy of theme.css (kept in sync)
  app/docs/components/<name>/page.tsx
  components/site/           # docs shell, nav, theme toggle, reduced-motion notice
packages/seamui/            # the `seamui` CLI (thin wrapper over shadcn)
```

- `bun run dev` — docs site.
- `bun run registry:build` — compile `registry/` → `public/r/*.json`. **Run after every registry change; commit the JSON.**
- `npx tsc --noEmit` (in `apps/www`) — typecheck before you claim done.

### Non-negotiables recap
- Edit `registry/seam/**`, never `public/r/**` (generated).
- Edit `theme/theme.css`, then regenerate `app/globals.css`.
- Motion only from `@/lib/motion`. No inline springs/durations.
- Every animated component ships a reduced-motion *fallback* (not an off switch).
- Interactive Base UI buttons use the `render` pattern (§5A), never `motion.create`.
- Dogfood the foundation: button-shaped controls reuse `Button`/`buttonVariants` (§5A), never a hand-rolled copy of the button base classes or inline `whileTap`.
- `data-slot` on every wrapper; shadcn-style names; squircle + depth per §2.
- Verify in a browser across the four gates before declaring done.
