# seamui best-practices audit — 2026-07-18

Full-library audit of all 67 components in `apps/www/registry/seam/ui/` against
the CLAUDE.md contract (motion tokens, reduced-motion variants, debossed/embossed
language, dogfooding, haptics), shadcn-style minimal-code/DX conventions, registry
integrity, docs, CLI, and quality gates. Every finding below was verified against
the exact source lines cited.

**Baseline health: strong.** `bun run verify` passes end to end (Biome, typecheck
app + CLI, motion-contract 67/67 clean, 46 unit tests, drift check). Registry
inventory is complete (67/67 components registered, 185 examples registered,
docs page + nav entry for all 67, `public/r` fresh, theme.css ↔ globals.css
identical). The findings are about the gaps the gates don't see.

---

## Remediation status (branch `claude/seamui-best-practices-audit-ob4pg1`)

**Fixed and verified** (each browser-checked where interactive):

- **P0 registry deps** — accordion/drawer/otp-field/dropdown-menu entries
  corrected + an imports-vs-deps guard added to `tests/unit/registry.test.ts`
  so the class of bug can't recur.
- **toast** inline motion → `condense.toast` token; toast slots added.
- **number-field** decomposed into compound parts (the input is now labelable).
- **haptics sweep** — dropdown checkbox/radio items, select, and tabs now tick
  on commit.
- **flat-control press** — ghost/link now dim on press; sources/tool triggers
  wear the Button component (no inline motion).
- **ContextMenuGroup** added; **voice-control-bar** collapsed panel is `inert`;
  **select** rings tokenized (`--ring-hairline`); **progress** className/props
  unified; Dialog/Drawer/Popover/AlertDialog Close/Action re-exports wrapped
  with data-slots; **command-palette** gained an Autocomplete passthrough and
  honest hotkey typing; **useCopy** hook extracted (branch-chip/code-block/
  terminal-block).
- **data-table** — `options` passthrough for controlled/manual/server-side
  state; root/pagination slots; edit-trigger dogfoods `buttonVariants`.
- **New components** — Field, Form, Label (the forms story), plus Alert,
  Breadcrumb, Aspect Ratio. Now **73 components**.
- **Contract/docs** — CLAUDE.md (chevron carve-out, docs template, useMounted,
  Toolbar ref) and README (73 components) synced to reality.

**Still open** (tracked here, not yet done): context-menu still lacks
Checkbox/Radio/Sub items; number-field keyboard/press-hold commit haptics;
code-block stale-HTML-during-rehighlight; mode-selector one-required; radio
keyboard press feedback; slider disabled whileTap gate; unnamed focusable
scroll regions; the remaining split className/props LOWs (voice-avatar,
voice-control-bar, workbench-header); CLI `list`/`diff`; and the rest of the
missing components (autocomplete, checkbox-group, menubar, navigation-menu,
toolbar, pagination, calendar, chart, carousel, resizable).

---

## P0 — Broken standalone installs (registry dependency bugs)

Diffing every ui file's imports against its `registry.json` entry found four
entries that break or degrade a fresh `seamui add <name>`:

| Component | Bug |
|---|---|
| `accordion` | Missing npm dep `motion` **and** missing `motion.json` registryDependency, but `accordion.tsx:5,9` imports `motion/react` + `@/lib/motion`. A standalone `seamui add accordion` installs code that cannot compile. |
| `drawer` | Missing `motion.json` registryDependency; `drawer.tsx:7` imports `condense` from `@/lib/motion`. |
| `otp-field` | Missing npm dep `motion` (`otp-field.tsx:5` imports `motion/react`; only `@base-ui/react` declared). |
| `dropdown-menu` | Missing npm dep `lucide-react` (`dropdown-menu.tsx:5` imports `Check, ChevronRight, Circle`); conversely declares `motion` which it doesn't import. |

**This class of bug is also the biggest hole in the quality gates**: everything
else CLAUDE.md cares about is mechanized, but deps-vs-imports is convention-only.
A ~30-line addition to `tests/unit/registry.test.ts` (parse each ui file's
imports, diff against its entry's `dependencies`/`registryDependencies`) would
have caught all four and prevents recurrence.

---

## P1 — Contract violations (HIGH)

1. **`toast.tsx:40` — inline motion, the one outright breach of the
   non-negotiable.** Hand-rolled
   `[transition:transform_0.5s,opacity_0.35s] [transition-timing-function:cubic-bezier(0.22,1.3,0.36,1)]`
   on the toast root instead of a token. The mechanism (CSS keyed to
   `data-starting-style`/`data-ending-style`, reduced-motion opacity fallback) is
   correct; the numbers live in the wrong place, and the bezier duplicates
   `condense.surface`'s. Fix: extract a `condense.toast` token in `lib/motion.ts`.

2. **`number-field.tsx:15-44` — the input is unlabelable.** `...props` spread on
   `BaseNumberField.Root` (a div) and no sub-parts are exported, so `aria-label`,
   `id`, `name`, `placeholder` can never reach `BaseNumberField.Input`. The
   shipped demo renders an unlabeled spinbutton, and every consumer will too.
   Also monolithic (no Group/Input/Increment/Decrement parts, fixed `w-16`
   input), and `className` styles the inner Group while `...props` go to Root.

3. **`context-menu.tsx:70` — documented API that doesn't exist.** The
   `ContextMenuLabel` doc comment says "Use `ContextMenuGroup` for a labelled
   group," but no `ContextMenuGroup` is implemented or exported. Context menu is
   also the thinnest menu vs shadcn parity: no CheckboxItem, RadioGroup/RadioItem,
   Sub menus, or Shortcut.

4. **`voice-control-bar.tsx:79-97` — keyboard users can tab into an invisible
   panel.** The collapsed panel is `aria-hidden` + `opacity-0` +
   `pointer-events-none`, but its focusable children (inputs, buttons) stay in
   the tab order. `aria-hidden` with tabbable descendants is a WCAG failure —
   needs `inert` (or `visibility` toggled after the transition).

---

## P2 — Recurring cross-component patterns (fix once, sweep everywhere)

- **Chevron `transition-transform duration-200` idiom** — a CSS-duration
  **transform** transition the contract forbids (§3 allows durations only for
  opacity and layout dimensions) and that `motion:check` can't see (it doesn't
  scan Tailwind classes): `accordion.tsx:73`, `checks-panel.tsx:164`,
  `connector-card.tsx:147`, `sources.tsx:69`, `tool.tsx:132`. All carry
  `motion-reduce:transition-none`. Decide once: contract carve-out for icon
  rotations, or a shared spring — then apply to all five.

- **Uncleaned copy-feedback `setTimeout`** — setState-after-unmount + stacking
  timers, copy-pasted three times: `branch-chip.tsx:77`, `code-block.tsx:70`,
  `terminal-block.tsx:82`. Extract one shared `useCopy` hook.

- **Haptics contract (§3b) applied unevenly.** State controls that commit
  silently: `DropdownMenuCheckboxItem`/`RadioItem` (dropdown-menu.tsx:108-156 —
  which is why `device-selector` and `model-picker` selections are silent),
  `Select` on commit (its semantic twin RadioGroup ticks), `TabsTrigger`
  (commits a selection, no tick, no press feedback), number-field keyboard/
  press-and-hold steps. Press-targets with motion but no `tap` and no `haptic`
  prop: the disclosure triggers in `accordion.tsx:47`, `checks-panel.tsx:149`,
  `connector-card.tsx:132`, `sources.tsx:52`, `tool.tsx:117`, plus
  `ComboboxClear`/`ComboboxChipRemove` (combobox.tsx:52-62, 260-277 — those two
  have **no press motion at all**, using the buttonVariants-classes escape hatch
  outside its sanctioned composite-widget scope).

- **"Do flat controls press?" has three different answers.**
  `button.tsx:42,84-89` deliberately gives ghost/link `whileTap: undefined`
  (zero feedback, not even `reduced.pressed`'s dim — in tension with the §1
  pillar given how widely ghost icon-buttons are used); `sources.tsx:52-57` and
  `tool.tsx:117-120` hand-roll inline `whileTap` press motion onto ghost-styled
  triggers, re-adding what the foundation withholds; `tabs.tsx:83` gives its
  triggers nothing. Pick one rule, encode it in the foundation, delete the
  inline copies. The triplicated `buttonVariants + motion.button` disclosure-
  trigger idiom (checks-panel / connector-card / tool / sources) should collapse
  into one shared primitive — this is exactly the "30 independent one-offs"
  drift CLAUDE.md warns about.

- **Raw Base UI re-exports without `data-slot` or styling** — an unstyled native
  `<button>` when used without `render`: `DialogClose` (dialog.tsx:116),
  `DrawerClose` (drawer.tsx:103), `AlertDialogAction`/`Cancel`
  (alert-dialog.tsx:106-107), `PopoverClose`/`Title`/`Description`
  (popover.tsx:50-52). shadcn wraps these (AlertDialogAction even applies
  `buttonVariants`).

- **Split `className`/`...props` targeting** — consumer's `className` and
  `style`/handlers land on *different elements*: `progress.tsx:14-20`
  (className→Track, props→Root, Indicator unreachable), `number-field.tsx`
  (className→Group, props→Root), `voice-avatar.tsx:66-84`,
  `voice-control-bar.tsx:80-94`, `workbench-header.tsx:31-46` (also hardcodes
  `<h1>` with no render escape). Convention should be: both target the outermost
  element.

- **Theme-bypassing hardcoded colors** — `select.tsx:109,115` inline
  `ring-[oklch(0.6_0.006_106)]` (retheming `theme.css` leaves seam's warm-gray
  hairlines behind; should be a token); `terminal-block.tsx:29-30`
  emerald/amber palette classes (no `--success`/`--warning` tokens exist —
  consider adding them).

- **Unnecessary `"use client"`** on hook-free recipe files (meter,
  mode-selector, model-picker, media-toggle, session-item, context-meter, …) —
  near-zero cost since Base UI parts are client anyway, but `input.tsx`/
  `kbd.tsx`/`workbench-header.tsx` show the leaner pattern. Bigger:
  **`table.tsx:1,27-38` is client-only** (`useState` + `ResizeObserver` for a
  conditional scroll tabstop), breaking the shadcn expectation that Table
  renders in server components.

---

## DX gaps vs shadcn minimalism

- **`data-table.tsx` (567 lines) is a closed monolith** (data-table.tsx:101-124):
  sorting/filters/selection/visibility are hardwired to internal `useState` —
  no controlled props, no `manualPagination`/server mode, no way to pass extra
  `useReactTable` options. shadcn ships a TanStack *recipe* so consumers own
  this; here anything server-driven means forking 567 lines. Also:
  `DataTableEditableCell`'s trigger re-pastes the foundation focus-ring string
  instead of `buttonVariants` and loses the haptic tap (:479-484);
  `DataTablePagination` accepts no className/props (:296-312); root `DataTable`
  div has no `data-slot` (:135); filter keystrokes remount the whole tbody via
  `reflowKey`, destroying in-progress cell edits (:130-132).
- **`command-palette.tsx:75-107`** hardcodes the `Autocomplete.Root` config and
  forwards only `items` — no `filter`, `itemToStringValue`, controlled
  `value`/`onValueChange`; real ⌘K surfaces need custom filtering quickly.
  Also `onOpenChange?.(!open, undefined as never)` (:54) can runtime-TypeError a
  consumer reading `eventDetails`.
- **`toast.tsx:13-23`** — `ToastProvider` force-mounts a hardcoded `Toaster`
  (fixed viewport position, title/description-only, no action buttons even
  though Base UI supports them).
- **`dropdown-menu.tsx`** — no `inset` prop, no `variant="destructive"` on items
  (common shadcn reaches); `menuItemClass` (:11) exists to keep items in sync
  but `DropdownMenuItem` (:60-64) duplicates the string inline instead of using it.
- **`branch-chip.tsx:134` / `checks-panel.tsx:135`** — `{...(props as
  React.ComponentProps<…>)}` casts leak Button/Collapsible-only props onto plain
  DOM elements while hiding it from the compiler.
- **CLI (`packages/seamui`)** — solid core (standalone `add` bootstraps without
  components.json; namespace registration is idempotent with good errors), but:
  no `list`/`search` to discover the 67 components; `add -y` implies `-o` and
  **silently overwrites user-modified files** (shadcn diffs/prompts); no
  `diff`/`update` story; `HapticsProvider` mounting isn't mentioned by `init`
  even though the haptics pillar is a no-op without it; version string duplicated
  in package.json and `program.version()`.
- **Examples:** 27 of 67 components have <3 examples (contract aims ≥3 where
  meaningful). Thinnest where it matters: `toast` (1), `table` (1),
  `command-palette` (2), `conversation` (2). Fine as-is: badge, kbd, skeleton,
  separator.

## Notable smaller correctness items

- `code-block.tsx:125-148` — after the first highlight, changing `source` shows
  the *previous* stale highlighted HTML until the async re-highlight resolves
  (the "never blank mid-stream" fallback only covers first render); N instances
  also emit N duplicate `<style>` tags (:159).
- `mode-selector.tsx:15-24` — ToggleGroup allows deselecting the active mode,
  leaving an agent/plan/ask selector with *no* mode; should enforce
  one-required.
- `model-picker.tsx:104-136` — without the (undocumented) `items` prop on the
  root, the trigger renders the full two-line item block via `ItemText`.
- `radio-group.tsx:58-62` — press-recede rides `whileTap` on a non-focusable
  inner span, so keyboard activation never shows press feedback (§1 requires it).
- `slider.tsx:44-49` — thumb `whileTap` not gated on `disabled` (Toggle/Radio/
  Switch all gate it).
- `sidebar.tsx:184` — generic primitive hardcodes `aria-label="{count}
  sessions"`.
- `chat-timeline.tsx:15` — `role="list"` with no `listitem` children provided
  or documented.
- Unnamed focusable scroll regions: `table.tsx:46-49` (only if consumer omits a
  label), `terminal-block.tsx:144-147`, `conversation.tsx:98-101`,
  `checks-panel.tsx:168-172` — `tabIndex={0}` with no role/name.
- `device-selector.tsx:29-30,101` — "pass `devices` to skip enumeration" is
  false: `useMediaDevices` always runs; the result is just discarded.
- `voice-visualizer.tsx:134-139` — disconnected-state `scaleY` settle rides
  `fades.normal` (contractually opacity-only) with no reduce branch;
  `useAudioLevel` re-renders the tree per rAF frame (a motion value would keep
  it off the React render path).
- Tabs unit test triggers a React `act(...)` warning (noise in every test run).

## What's missing (components)

Base UI 1.6.0 primitives seamui doesn't wrap (= easy adds by the §4 checklist):

- **`field` / `fieldset` / `form` / label — the entire forms story is absent.**
  Highest shadcn-parity impact; Form/Label/Field is table stakes and Base UI
  ships all of it.
- `autocomplete` (separate from combobox in 1.6.0), `checkbox-group`,
  `menubar`, `navigation-menu`, `toolbar` (CLAUDE.md §5A even cites Toolbar as
  if it exists).

Missing vs shadcn with no Base UI primitive: `alert`, `breadcrumb`,
`aspect-ratio` (all trivial statics), `pagination`, then the big lifts —
`calendar`/date-picker, `chart`, `carousel`, `resizable`.

Covered by rename: hover-card→`preview-card`, sonner→`toast`,
command→`command-palette`, input-otp→`otp-field`, sheet→`drawer` — **but drawer
is bottom-only**; shadcn's Sheet does four sides (side-panel variant missing).

## Contract & docs drift (CLAUDE.md / README are lying in places)

- CLAUDE.md §4 step 6 prescribes docs pages as "Installation → Usage → Examples
  → Motion → Accessibility"; all 67 actual pages use the v2 template
  (Preview → Install → ApiTable → Notes, with motion/a11y centralized on
  `/docs/motion` + `/docs/haptics`). An agent following the contract produces an
  off-template page. Update §4.
- `useMounted` (lib/motion.ts:20) is exported, load-bearing (SSR hydration
  guard), and undocumented in CLAUDE.md §3.
- Root README says "Components (27)" with a seven-wave table — 67 ship; repo map
  omits `lib/haptics.tsx`.
- Foundation nits: `depth.resting` has zero usages (dead export); haptics `tick`
  and `success` map to the same `"medium"` intensity (two of four presets are
  physically identical); `sound` defaults to `true`, so web-haptics' click audio
  is on by default for any bare `<HapticsProvider>` — surprising default.

## Quality-gate gaps (what's convention-only today)

Enforced mechanically: motion contract (kill-switches, inline springs/durations
in JS — but **not** Tailwind transition classes), registry structure + files
exist, theme/registry drift, browser motion gates, lib coverage. Not enforced:
npm/registry deps vs imports (→ the P0 bugs), `data-slot` presence, docs page
per component, example counts, dogfooding (no grep for pasted button base
strings or inline `whileTap`). Unit tests touch 5 of 67 components (~7%).

---

## Recommended order of attack

1. Fix the four `registry.json` dep entries + add the imports-vs-deps test (P0).
2. `condense.toast` token; sweep the five chevron `transition-transform` sites
   with one decision; extract `useCopy`.
3. Decompose `number-field` into parts (fixes the labeling HIGH); add
   `ContextMenuGroup` (+ CheckboxItem/RadioItem/Sub); `inert` the collapsed
   voice-control-bar panel.
4. One decision on flat-control press feedback, encoded in Button; shared
   disclosure-trigger primitive; haptics sweep (dropdown items, select, tabs,
   number-field commits, combobox clear/chip-remove).
5. Wrap the Close/Action re-exports (data-slot + buttonVariants defaults);
   normalize split className/props targeting; tokenize select's oklch rings.
6. Ship the forms story (Field/Form/Fieldset/Label) — the single
   highest-value missing piece — then alert/breadcrumb/aspect-ratio as quick
   wins.
7. data-table: expose controlled state + `useReactTable` options passthrough
   (or slim to a recipe); command-palette: forward Autocomplete config.
8. Update CLAUDE.md (§4 template, `useMounted`, Toolbar reference) and README
   (67 components, haptics in repo map); CLI `list` command + overwrite
   warning.
