import type { Metadata } from "next"

import { Section, CodeBlock, Install } from "@/components/docs/section"
import { HapticButtons } from "@/components/site/haptic-buttons"

export const metadata: Metadata = {
  title: "Haptics — seamui",
  description:
    "The tactile layer: HapticsProvider gives every seamui control a click and a buzz.",
}

export default function HapticsDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Haptics</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The tactile third of seam&apos;s touch-feedback pillar. Mount one
        provider and every control clicks and buzzes as you use it — the same
        feel as this site.
      </p>

      <div className="squircle bg-card my-4 rounded-xl border p-6">
        <HapticButtons />
      </div>

      <Install name="haptics" />

      <Section title="Usage">
        <CodeBlock>{`import { HapticsProvider } from "@/lib/haptics"

// once, around your app shell:
<HapticsProvider>
  <App />
</HapticsProvider>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          That&apos;s it — Button, Toggle (and everything dogfooding them, like
          Media Toggle and the voice suite), Switch, Checkbox, Radio, Slider,
          and OTP Field all fire through the ambient provider. Without one,
          every trigger is a silent no-op, so components work unchanged.
        </p>
        <CodeBlock>{`<HapticsProvider sound={false}>  // buzz only, no click audio
<HapticsProvider enabled={false}> // everything off (e.g. a user setting)`}</CodeBlock>
      </Section>

      <Section title="Per-component control">
        <p className="text-muted-foreground text-sm">
          Button and Toggle take a <code>haptic</code> prop — <code>true</code>{" "}
          (default) fires <code>&quot;tap&quot;</code> on press, a preset name
          overrides it, <code>false</code> opts out:
        </p>
        <CodeBlock>{`<Button haptic="success">Save</Button>
<Button haptic={false}>Quiet</Button>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          The presets: <code>tap</code> (press), <code>tick</code> (a state
          committing — toggle, check, slider release, OTP digit),{" "}
          <code>success</code>, and <code>error</code> (OTP fires it when{" "}
          <code>invalid</code> flips on). Custom components reach the channel
          with <code>useHaptics()</code>:
        </p>
        <CodeBlock>{`const { trigger } = useHaptics()
trigger("tick") // safe anywhere — no-op without a provider`}</CodeBlock>
      </Section>

      <Section title="Platform support">
        <p className="text-muted-foreground text-sm">
          Powered by <code>web-haptics</code>: the Vibration API on Android, its
          taptic <code>&lt;input switch&gt;</code> trick on iOS Safari, and
          click audio everywhere when <code>sound</code> is on. Where nothing is
          available it degrades silently — feedback never blocks the interaction
          or throws. Haptics are orthogonal to{" "}
          <code>prefers-reduced-motion</code>; expose the provider&apos;s{" "}
          <code>enabled</code> prop as a user setting if you want an off switch.
        </p>
      </Section>
    </main>
  )
}
