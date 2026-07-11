import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import VoiceControlBarDemo from "@/registry/seam/examples/voice-control-bar-demo"
import VoiceControlBarExpand from "@/registry/seam/examples/voice-control-bar-expand"
import VoiceWidgetDemo from "@/registry/seam/examples/voice-widget-demo"

export const metadata: Metadata = {
  title: "Voice Control Bar — seamui",
  description:
    "Floating call pill that morphs open into a chat composer — the voice suite capstone.",
}

export default function VoiceControlBarDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Voice Control Bar</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The capstone of the voice suite — a floating call pill that holds the
        media controls and the hang-up key, and <em>morphs</em> open into a chat
        composer. It&apos;s where Media Toggle, Device Selector, and Composer
        come together into one control.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <VoiceControlBarDemo />, code: exampleSource("voice-control-bar-demo"), description: "A split mic control, camera/screen keys, a chat toggle, and the hang-up key." },
          { key: "expand", title: "Expand to chat", component: <VoiceControlBarExpand />, code: exampleSource("voice-control-bar-expand"), description: "Toggle chat and the pill grows a composer while squaring off from a pill into a card." },
          { key: "widget", title: "Full widget", component: <VoiceWidgetDemo />, code: exampleSource("voice-widget-demo"), description: "The whole thing wired to a fake agent: state-driven visualizer, caption, and the pill." },
        ]}
      />

      <Install name="voice-control-bar" />

      <Section title="Usage">
        <CodeBlock>{`import {
  VoiceControlBar,
  VoiceControlBarPanel,
  VoiceControlBarActions,
  VoiceControlBarTrigger,
  VoiceControlBarEnd,
} from "@/components/ui/voice-control-bar"`}</CodeBlock>
        <CodeBlock>{`<VoiceControlBar>
  <VoiceControlBarPanel>
    {/* a Composer, transcript, or anything to reveal on expand */}
  </VoiceControlBarPanel>
  <VoiceControlBarActions>
    <MediaToggle kind="mic" />
    <VoiceControlBarTrigger><MessageSquare /></VoiceControlBarTrigger>
    <VoiceControlBarEnd onClick={endCall} />
  </VoiceControlBarActions>
</VoiceControlBar>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Expansion is uncontrolled by default (the <code>Trigger</code> flips
          it); pass <code>expanded</code> / <code>onExpandedChange</code> to
          drive it yourself. The bar owns no transport — drop in whatever call
          controls you like and wire <code>VoiceControlBarEnd</code> to your
          disconnect.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The morph is the one sanctioned duration case — a layout change that
          can&apos;t spring cleanly:
        </p>
        <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>The panel opens with the grid-rows <code>0fr → 1fr</code> height trick, so it eases to its natural height with no measured pixels.</li>
          <li>The container&apos;s radius and padding transition together — pill (<code>rounded-full</code>) to card (<code>rounded-3xl</code> squircle).</li>
          <li>Every control inside keeps its own spring feedback: the toggles, the dogfooded Button trigger, and the END key all press at <code>depth.pressed</code>.</li>
        </ul>
        <p className="text-muted-foreground mt-2 text-sm">
          Under reduced motion the morph snaps (<code>motion-reduce:transition-none</code>)
          rather than freezing mid-animation, and the press feedback dims instead
          of scaling.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The trigger carries <code>aria-expanded</code> and{" "}
          <code>aria-label</code> that flip with the panel, which is{" "}
          <code>aria-hidden</code> while collapsed so its contents stay out of
          the tab order. <code>VoiceControlBarEnd</code> defaults to an{" "}
          &ldquo;End call&rdquo; label when it renders icon-only.
        </p>
      </Section>
    </main>
  )
}
