import type { Metadata } from "next"

import { Section, CodeBlock } from "@/components/docs/section"

export const metadata: Metadata = {
  title: "Motion — seamui",
  description:
    "How seamui animates: spring tokens, depth, personalities, and the reduced-motion policy.",
}

export default function MotionDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Motion</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Every seamui animation comes from one file you own —{" "}
        <code>lib/motion.ts</code>. Springs over durations, depth over
        flatness, and a single dial to retune the whole library.
      </p>

      <Section title="Change the feel in one line">
        <p className="text-muted-foreground text-sm">
          All springs derive from <code>springs</code>, which just picks a{" "}
          <strong>personality</strong>. Swap the pick and all components
          change feel together — no component files to touch:
        </p>
        <CodeBlock>{`// lib/motion.ts
export const springs = personalities.seam     // the default
export const springs = personalities.brisk    // tighter, no overshoot
export const springs = personalities.relaxed  // softer, calmer
export const springs = personalities.playful  // more life everywhere`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Each personality defines the same four roles —{" "}
          <code>press</code> (press-down feedback), <code>snappy</code>{" "}
          (release/settle), <code>surface</code> (overlays entering), and{" "}
          <code>bouncy</code> (accents). Want a custom feel? Edit the numbers
          or add your own personality to the table; every component picks it
          up automatically.
        </p>
      </Section>

      <Section title="The tokens">
        <p className="text-muted-foreground text-sm">
          Components never inline motion — they import tokens:
        </p>
        <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
          <li><code>springs</code> — the four spring roles above.</li>
          <li><code>fades</code> — opacity-only durations (<code>fast</code>/<code>normal</code>), the one sanctioned duration case besides layout dimensions.</li>
          <li><code>depth</code> — the virtual z-axis: <code>pressed</code>/<code>resting</code>/<code>raised</code> scalars plus <code>overlay</code>/<code>modal</code> enter–exit objects (for elements motion.dev controls end to end).</li>
          <li><code>condense</code> — the overlay CSS motion (below): <code>surface</code>, <code>backdrop</code>, <code>sheet</code>.</li>
          <li><code>shake</code> — error feedback, a brief horizontal shake.</li>
          <li><code>reduced</code> — the reduced-motion swaps (below).</li>
        </ul>
      </Section>

      <Section title="Overlays — the condense">
        <p className="text-muted-foreground text-sm">
          Every overlay (dialog, popover, dropdown, select, tooltip, sheet…)
          shares one motion: <strong>rise fast, settle alive; fall back
          quicker than you rose</strong>, with the backdrop dimming on the same
          clock. This one lives in CSS — the <code>condense</code> token — not
          a spring, because Base UI keeps a popup mounted through its exit and
          awaits CSS transitions before unmounting. It can&apos;t await
          motion&apos;s rAF springs, so a spring exit gets cut off instantly
          (the bug this fixes).
        </p>
        <p className="text-muted-foreground text-sm">
          Popups grow out of their trigger (scale from Base UI&apos;s{" "}
          <code>--transform-origin</code>), modals pop from center, sheets
          slide up; all fade in, and reverse — a touch quicker — on dismiss. A
          spring-shaped bezier keeps the seam bounce. Under reduced motion the
          scale/slide is dropped and it&apos;s an opacity fade both ways, never
          dead.
        </p>
      </Section>

      <Section title="Reduced motion is a variant, not a kill switch">
        <p className="text-muted-foreground text-sm">
          When <code>prefers-reduced-motion</code> is on, seamui swaps{" "}
          <em>movement</em> for <em>opacity</em> — feedback never disappears.
          Press dims (<code>reduced.pressed</code>) instead of scaling,
          entrances fade (<code>reduced.fadeIn</code>) instead of rising,
          layout changes jump (<code>reduced.instant</code>) instead of
          springing, and the error shake becomes an opacity flash
          (<code>reduced.flash</code>).
        </p>
      </Section>

      <Section title="Per-component overrides">
        <p className="text-muted-foreground text-sm">
          Because you own the code, the escape hatch is the component file
          itself: change which token a component uses (e.g.{" "}
          <code>springs.bouncy</code> on a toast) rather than inlining a
          config — that keeps the personality dial working for everything.
        </p>
      </Section>
    </main>
  )
}
