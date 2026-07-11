import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import VoiceAvatarDemo from "@/registry/seam/examples/voice-avatar-demo"
import VoiceAvatarGroup from "@/registry/seam/examples/voice-avatar-group"
import VoiceAvatarFallback from "@/registry/seam/examples/voice-avatar-fallback"

export const metadata: Metadata = {
  title: "Voice Avatar — seamui",
  description: "Avatar with a speaking halo that breathes with audio level.",
}

export default function VoiceAvatarDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Voice Avatar</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A speaking avatar for a call roster — the photo is a raised circular
        key; a halo <em>outside</em> it lights up and breathes with the
        speaker&apos;s audio level, so the face never distorts.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Speaking", component: <VoiceAvatarDemo />, code: exampleSource("voice-avatar-demo") },
          { key: "group", title: "Roster", component: <VoiceAvatarGroup />, code: exampleSource("voice-avatar-group"), description: "The active speaker's halo lights up as it rotates." },
          { key: "fallback", title: "Fallback", component: <VoiceAvatarFallback />, code: exampleSource("voice-avatar-fallback") },
        ]}
      />

      <Install name="voice-avatar" />

      <Notes>
        <li>
          Dogfoods Avatar (image + initials fallback). Drive it with{" "}
          <code>speaking</code>, a numeric <code>level</code> (0–1), or a{" "}
          <code>track</code> — the shared <code>useAudioLevel</code> hook (the
          same one as Voice Visualizer) analyses it, so the analyser isn&apos;t
          re-rolled.
        </li>
        <li>
          With a live level the halo scales and brightens on{" "}
          <code>springs.snappy</code> (spring-smoothed so raw analyser values
          never jitter it); with only <code>speaking</code> known it settles
          into a gentle opacity pulse.
        </li>
        <li>
          Under reduced motion the scale is dropped and the halo&apos;s opacity
          tracks the level — the indicator never disappears while someone is
          talking.
        </li>
        <li>
          The halo is decorative (<code>aria-hidden</code>); speaking state is
          exposed through a visually-hidden <code>role=&quot;status&quot;</code>{" "}
          (&ldquo;Ada is speaking&rdquo;) that only announces on change, and the
          avatar carries a real accessible name via its image alt / fallback.
        </li>
      </Notes>
    </main>
  )
}
