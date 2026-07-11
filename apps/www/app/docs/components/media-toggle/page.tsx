import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
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
          {
            key: "default",
            title: "Controls",
            component: <MediaToggleDemo />,
            code: exampleSource("media-toggle-demo"),
          },
          {
            key: "custom-icons",
            title: "Custom icons",
            component: <MediaToggleCustomIcons />,
            code: exampleSource("media-toggle-custom-icons"),
          },
        ]}
      />

      <Install name="media-toggle" />

      <ApiTable
        rows={[
          {
            prop: "kind",
            type: `"mic" | "camera" | "screen-share"`,
            default: `"mic"`,
            desc: "Picks the icon pair and the default aria-label.",
          },
          {
            prop: "iconOn",
            type: "LucideIcon",
            desc: "Override the enabled icon for a custom control.",
          },
          {
            prop: "iconOff",
            type: "LucideIcon",
            desc: "Override the muted icon.",
          },
          {
            prop: "pressed",
            type: "boolean",
            desc: "Controlled state — pressed means the track is enabled; unpressed is muted. Uncontrolled it starts enabled.",
          },
          {
            prop: "haptic",
            type: `boolean | "tap" | "tick" | "success" | "error"`,
            default: "true",
            desc: "Via Toggle — haptic on press when a HapticsProvider is mounted; false opts out.",
          },
        ]}
        footer={
          <>
            Plus all Toggle props (<code>onPressedChange</code>,{" "}
            <code>defaultPressed</code>, <code>variant</code>, <code>size</code>
            , …).
          </>
        }
      />

      <Notes>
        <li>
          The prop shape maps onto the AI/LiveKit <code>TrackToggle</code> (
          <code>useTrackToggle</code>) shape with no runtime dependency.
        </li>
        <li>
          Muted is destructive-tinted <em>and</em> slash-iconed — color is never
          the only signal.
        </li>
        <li>
          Toggling crossfades the tint and the on/off icon on opacity only, so
          it reads identically under reduced motion.
        </li>
        <li>
          A native toggle button with <code>aria-pressed</code>; the{" "}
          <code>aria-label</code> defaults per kind (&ldquo;Microphone&rdquo;,
          &ldquo;Camera&rdquo;, &ldquo;Share screen&rdquo;).
        </li>
      </Notes>
    </main>
  )
}
