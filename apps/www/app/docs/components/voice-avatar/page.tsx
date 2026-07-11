import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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

      <Section title="Usage">
        <CodeBlock>{`import { VoiceAvatar } from "@/components/ui/voice-avatar"`}</CodeBlock>
        <CodeBlock>{`<VoiceAvatar name="Ada" src={url} speaking={isSpeaking} level={level} />`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Dogfoods Avatar (image + initials fallback). Pass{" "}
          <code>speaking</code>, a numeric <code>level</code> (0–1), or a{" "}
          <code>track</code> that the shared <code>useAudioLevel</code> hook
          analyses — the same hook as Voice Visualizer, so the analyser
          isn&apos;t re-rolled.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          With a live level the halo scales and brightens on{" "}
          <code>springs.snappy</code> (spring-smoothed so raw analyser values
          never jitter it); with only <code>speaking</code> known it settles
          into a gentle opacity pulse. Under reduced motion the scale is dropped
          and the halo&apos;s opacity tracks the level — the indicator never
          disappears while someone is talking.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The halo is decorative (<code>aria-hidden</code>). Speaking state is
          exposed to assistive tech through a visually-hidden{" "}
          <code>role=&quot;status&quot;</code> (&ldquo;Ada is speaking&rdquo;)
          that only announces on change, and the avatar carries a real
          accessible name via its image alt / fallback.
        </p>
      </Section>
    </main>
  )
}
