import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
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
      <h1 className="text-2xl font-semibold tracking-tight">
        Voice Visualizer
      </h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The agent-presence indicator for a voice UI — dots (or bars) that move
        with the agent&apos;s state and audio level. It&apos;s the &ldquo;is
        this thing on?&rdquo; signal, so it never goes dead.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "States",
            component: <VoiceVisualizerDemo />,
            code: exampleSource("voice-visualizer-demo"),
            description:
              "Cycle through connecting → listening → thinking → speaking.",
          },
          {
            key: "caption",
            title: "Caption",
            component: <VoiceVisualizerCaptionExample />,
            code: exampleSource("voice-visualizer-caption"),
          },
          {
            key: "bars",
            title: "Bars",
            component: <VoiceVisualizerBars />,
            code: exampleSource("voice-visualizer-bars"),
          },
          {
            key: "mic",
            title: "Live mic",
            component: <VoiceVisualizerMic />,
            code: exampleSource("voice-visualizer-mic"),
            description:
              "Feeds a real microphone track in — click to grant permission.",
          },
        ]}
      />

      <Install name="voice-visualizer" />

      <ApiTable
        rows={[
          {
            prop: "state",
            type: `"disconnected" | "connecting" | "listening" | "thinking" | "speaking"`,
            default: `"listening"`,
            desc: "Drives the motion and the accessible label.",
          },
          {
            prop: "level",
            type: "number",
            desc: "Audio level 0–1; takes precedence over track analysis.",
          },
          {
            prop: "track",
            type: "MediaStreamTrack | null",
            desc: "Analysed via Web Audio by the owned useAudioLevel hook.",
          },
          {
            prop: "count",
            type: "number",
            default: "5",
            desc: "Number of dots or bars.",
          },
          {
            prop: "size",
            type: `"sm" | "default" | "lg"`,
            default: `"default"`,
            desc: "Dot/bar dimensions.",
          },
          {
            prop: "variant",
            type: `"dots" | "bars"`,
            default: `"dots"`,
            desc: "Dots scale uniformly; bars stretch vertically.",
          },
        ]}
      />

      <Notes>
        <li>
          Each state has its own motion: <strong>connecting</strong> is a
          staggered opacity shimmer, <strong>listening</strong> breathes with
          the mic level (spring-smoothed on <code>springs.snappy</code> so raw
          analyser values never jitter the UI), <strong>thinking</strong> is a
          sequential opacity sweep, and <strong>speaking</strong> scales with
          the agent&apos;s output level, weighted so the center moves most.
        </li>
        <li>
          Every channel maps to opacity under reduced motion — a call UI&apos;s
          liveness signal must never freeze.
        </li>
        <li>
          Transport-agnostic: pass a numeric <code>level</code> or a{" "}
          <code>track</code> for the owned <code>useAudioLevel</code> hook. The
          prop shape maps 1:1 onto the AI SDK / LiveKit{" "}
          <code>useVoiceAssistant</code> hooks with no runtime dependency.
        </li>
        <li>
          A <code>role=&quot;status&quot;</code> labelled from the state
          (&ldquo;Agent is listening&rdquo;); the dots are{" "}
          <code>aria-hidden</code>, and <code>VoiceVisualizerCaption</code> is
          the visible equivalent of that label.
        </li>
      </Notes>
    </main>
  )
}
