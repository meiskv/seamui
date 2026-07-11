import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import VoiceVisualizerDemo from "@/registry/seam/examples/voice-visualizer-demo"
import VoiceVisualizerCaptionExample from "@/registry/seam/examples/voice-visualizer-caption"
import VoiceVisualizerBars from "@/registry/seam/examples/voice-visualizer-bars"
import VoiceVisualizerMic from "@/registry/seam/examples/voice-visualizer-mic"

export const metadata: Metadata = {
  title: "Voice Visualizer — seamui",
  description:
    "Agent-state dots driven by audio level, with an owned useAudioLevel hook.",
}

export default function VoiceVisualizerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Voice Visualizer</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The agent-presence indicator for a voice UI — dots (or bars) that move
        with the agent&apos;s state and audio level. It&apos;s the &ldquo;is
        this thing on?&rdquo; signal, so it never goes dead.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "States", component: <VoiceVisualizerDemo />, code: exampleSource("voice-visualizer-demo"), description: "Cycle through connecting → listening → thinking → speaking." },
          { key: "caption", title: "Caption", component: <VoiceVisualizerCaptionExample />, code: exampleSource("voice-visualizer-caption") },
          { key: "bars", title: "Bars", component: <VoiceVisualizerBars />, code: exampleSource("voice-visualizer-bars") },
          { key: "mic", title: "Live mic", component: <VoiceVisualizerMic />, code: exampleSource("voice-visualizer-mic"), description: "Feeds a real microphone track in — click to grant permission." },
        ]}
      />

      <Install name="voice-visualizer" />

      <Section title="Usage">
        <CodeBlock>{`import {
  VoiceVisualizer,
  VoiceVisualizerCaption,
  useAudioLevel,
} from "@/components/ui/voice-visualizer"`}</CodeBlock>
        <CodeBlock>{`<VoiceVisualizer state={state} audioTrack={agentTrack} />`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Transport-agnostic: pass a <code>state</code> and either a numeric{" "}
          <code>level</code> (0–1) or a <code>track</code> that the owned{" "}
          <code>useAudioLevel</code> hook analyses via Web Audio. The prop shape
          maps 1:1 onto the AI SDK / LiveKit voice-assistant hooks with no
          runtime dependency.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Each state has its own motion, and every channel maps to opacity under
          reduced motion (a call UI&apos;s liveness signal must never freeze):
        </p>
        <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
          <li><strong>connecting</strong> — a staggered opacity shimmer.</li>
          <li><strong>listening</strong> — the dots breathe with the mic level, spring-smoothed (<code>springs.snappy</code>) so raw analyser values never jitter the UI.</li>
          <li><strong>thinking</strong> — a sequential opacity sweep.</li>
          <li><strong>speaking</strong> — dots scale with the agent&apos;s output level, weighted so the center moves most.</li>
        </ul>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          A <code>role=&quot;status&quot;</code> labelled from the state
          (&ldquo;Agent is listening&rdquo;); the dots are{" "}
          <code>aria-hidden</code>. When a{" "}
          <code>VoiceVisualizerCaption</code> is present it&apos;s the visible
          equivalent of that label.
        </p>
      </Section>
    </main>
  )
}
