import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import MediaToggleDemo from "@/registry/seam/examples/media-toggle-demo"
import MediaToggleCustomIcons from "@/registry/seam/examples/media-toggle-custom-icons"

export const metadata: Metadata = {
  title: "Media Toggle — seamui",
  description:
    "Round mic/camera/screen-share key; muted goes destructive-tinted.",
}

export default function MediaToggleDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Media Toggle</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A round call-control key for a mic, camera, or screen share. Enabled is
        a neutral embossed key; muted goes destructive-tinted with a slashed
        icon — muting is a state you should notice, not an absence.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Controls", component: <MediaToggleDemo />, code: exampleSource("media-toggle-demo") },
          { key: "custom-icons", title: "Custom icons", component: <MediaToggleCustomIcons />, code: exampleSource("media-toggle-custom-icons") },
        ]}
      />

      <Install name="media-toggle" />

      <Section title="Usage">
        <CodeBlock>{`import { MediaToggle } from "@/components/ui/media-toggle"`}</CodeBlock>
        <CodeBlock>{`<MediaToggle kind="mic" pressed={enabled} onPressedChange={setEnabled} />`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          <code>pressed</code> means the track is <em>enabled</em> (on);
          unpressed is muted. <code>kind</code> is{" "}
          <code>&quot;mic&quot;</code>, <code>&quot;camera&quot;</code>, or{" "}
          <code>&quot;screen-share&quot;</code> — or pass{" "}
          <code>iconOn</code>/<code>iconOff</code> for any other control. Maps
          onto the AI/LiveKit <code>TrackToggle</code> shape with no dependency.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Press recedes with <code>depth.pressed</code>, inherited from Toggle —
          a call control must feel instant. Toggling on/off crossfades the tint
          and the on/off icon on opacity, so it&apos;s identical under reduced
          motion.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          A native toggle button with <code>aria-pressed</code>; the{" "}
          <code>aria-label</code> defaults per kind. Color is never the only
          signal — the slashed icon carries the muted state for color-blind
          users.
        </p>
      </Section>
    </main>
  )
}
