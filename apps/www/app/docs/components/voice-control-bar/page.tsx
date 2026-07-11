import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
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

      <ApiTable
        rows={[
          { prop: "expanded", type: "boolean", desc: "Controlled expanded state of the panel." },
          { prop: "defaultExpanded", type: "boolean", default: "false", desc: "Uncontrolled initial state; the Trigger flips it." },
          { prop: "onExpandedChange", type: "(expanded: boolean) => void", desc: "Called when the panel opens or closes." },
        ]}
        footer={
          <>Props on the root <code>&lt;VoiceControlBar&gt;</code>; <code>Trigger</code> and <code>End</code> accept all Button props.</>
        }
      />

      <Notes>
        <li>
          The bar owns no transport — drop in whatever call controls you like
          and wire <code>VoiceControlBarEnd</code> to your disconnect. It
          defaults to an &ldquo;End call&rdquo; label when it renders
          icon-only.
        </li>
        <li>
          The morph is the one sanctioned duration case: the panel opens with
          the grid-rows <code>0fr → 1fr</code> height trick while the
          container&apos;s radius and padding transition together — pill
          (<code>rounded-full</code>) to card (<code>rounded-3xl</code>{" "}
          squircle). Under reduced motion it snaps
          (<code>motion-reduce:transition-none</code>) rather than freezing
          mid-morph, while every control inside keeps its own press feedback.
        </li>
        <li>
          The trigger drives <code>aria-expanded</code> (and{" "}
          <code>aria-pressed</code>) with a label that flips with the panel,
          and the panel is <code>aria-hidden</code> while collapsed so its
          contents stay out of the tab order.
        </li>
      </Notes>
    </main>
  )
}
