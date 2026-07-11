import type { Metadata } from "next"
import Link from "next/link"

import { Section } from "@/components/docs/section"
import { CodeBlock } from "@/registry/seam/ui/code-block"
import { exampleSource } from "@/lib/registry-source"
import VoiceWidgetDemo from "@/registry/seam/examples/voice-widget-demo"

export const metadata: Metadata = {
  title: "Building a voice agent — seamui",
  description:
    "Compose the visualizer, control pill, media toggles, and device picker into a voice-agent widget — the voice suite end to end.",
}

export default function VoiceGuide() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Building a voice agent
      </h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A full call UI from four pieces: the agent-presence{" "}
        <strong>Voice Visualizer</strong>, the floating{" "}
        <strong>Voice Control Bar</strong> with its media keys, a{" "}
        <strong>Device Selector</strong> split control, and a{" "}
        <strong>Composer</strong> for typing instead. It&apos;s
        transport-agnostic — the prop shapes map onto LiveKit&apos;s{" "}
        <code>useVoiceAssistant</code> / <code>useTrackToggle</code> /{" "}
        <code>useMediaDeviceSelect</code>, with no runtime dependency and no
        permissions needed to run the demo.
      </p>

      {/* Live result */}
      <div className="squircle bg-background my-6 flex justify-center rounded-xl border p-6">
        <VoiceWidgetDemo />
      </div>

      <Section title="The pieces">
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Voice Visualizer</strong> — the &ldquo;is it live?&rdquo;
            signal: dots driven by the agent <code>state</code> and audio{" "}
            <code>level</code>.
          </li>
          <li>
            <strong>Voice Control Bar</strong> — the floating pill that holds
            the call keys and morphs open into a chat panel.
          </li>
          <li>
            <strong>Media Toggle</strong> + <strong>Device Selector</strong> —
            the mic/camera keys and the device split control.
          </li>
          <li>
            <strong>Composer</strong> — reused from the chat suite for the
            type-instead panel.
          </li>
        </ul>
        <CodeBlock
          language="bash"
          code={`bunx --bun seamui@latest add voice-control-bar voice-visualizer media-toggle device-selector composer`}
        />
      </Section>

      <Section title="1. Agent presence">
        <p className="text-muted-foreground text-sm">
          <code>VoiceVisualizer</code> takes a <code>state</code> (
          <code>listening</code> / <code>thinking</code> / <code>speaking</code>
          …) and either a numeric <code>level</code> (0–1) or a{" "}
          <code>track</code> that its owned <code>useAudioLevel</code> hook
          analyses. Each state has its own motion, and every channel maps to
          opacity under reduced motion — a liveness signal must never freeze.
        </p>
        <CodeBlock
          language="tsx"
          code={`<VoiceVisualizer state={state} level={level} size="lg" count={7} />
<VoiceVisualizerCaption>{caption}</VoiceVisualizerCaption>`}
        />
      </Section>

      <Section title="2. The control pill">
        <p className="text-muted-foreground text-sm">
          <code>VoiceControlBar</code> is a raised pill at overlay depth. Drop
          the call keys into <code>VoiceControlBarActions</code>: a{" "}
          <code>MediaToggle</code> and <code>DeviceSelector</code> cluster into
          one debossed well as a split control (mute is one press; picking the
          device is the small key beside it), and{" "}
          <code>VoiceControlBarEnd</code> is the destructive-soft hang-up key.
        </p>
        <CodeBlock
          language="tsx"
          code={`<VoiceControlBarActions>
  <div className="bg-muted flex items-center gap-1 rounded-full p-1 shadow-well">
    <MediaToggle kind="mic" defaultPressed className="size-8" />
    <DeviceSelector devices={mics} value={mic} onValueChange={setMic}>
      <DeviceSelectorTrigger />
      <DeviceSelectorContent />
    </DeviceSelector>
  </div>
  <MediaToggle kind="camera" />
  <VoiceControlBarTrigger><MessageSquare /></VoiceControlBarTrigger>
  <VoiceControlBarEnd />
</VoiceControlBarActions>`}
        />
      </Section>

      <Section title="3. Expand to chat">
        <p className="text-muted-foreground text-sm">
          The chat trigger morphs the pill open: it grows a{" "}
          <code>VoiceControlBarPanel</code> holding a <code>Composer</code> and
          squares off from a pill into a card. The morph is a height/radius
          transition (the sanctioned duration case) that snaps rather than
          freezes under reduced motion.
        </p>
        <CodeBlock
          language="tsx"
          code={`<VoiceControlBar>
  <VoiceControlBarPanel>
    <Composer onSubmit={send}>
      <ComposerTextarea placeholder="Type instead…" />
      <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
    </Composer>
  </VoiceControlBarPanel>
  <VoiceControlBarActions>…</VoiceControlBarActions>
</VoiceControlBar>`}
        />
      </Section>

      <Section title="4. Wire it up">
        <p className="text-muted-foreground text-sm">
          Feed the visualizer a <code>state</code> and <code>level</code>, and
          the device selector its list. Here a fake agent cycles the states and
          wobbles the level so it breathes without a real track; swapping in
          LiveKit means passing <code>useVoiceAssistant()</code>&apos;s{" "}
          <code>state</code> and <code>audioTrack</code> straight through — the
          components don&apos;t change.
        </p>
        <CodeBlock language="tsx" code={exampleSource("voice-widget-demo")} />
      </Section>

      <Section title="Accessibility & motion">
        <p className="text-muted-foreground text-sm">
          The visualizer is a <code>role=&quot;status&quot;</code> labelled from
          its state; the caption is the visible equivalent. Off/ending states —
          muted mic, camera off, END — are destructive-tinted <em>and</em> carry
          a non-color signal (a slashed icon, a label), never color alone. Under
          reduced motion every animated channel becomes opacity, so the
          &ldquo;is it live?&rdquo; signal stays alive.
        </p>
      </Section>

      <Section title="Next steps">
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
          <li>
            Swap the fake agent for a real transport (LiveKit, or your own
            WebRTC) — only the <code>state</code>/<code>level</code>/
            <code>devices</code> sources change.
          </li>
          <li>
            Feed a live mic <code>track</code> into the{" "}
            <Link
              className="underline"
              href="/docs/components/voice-visualizer"
            >
              Voice Visualizer
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/docs/components/voice-avatar">
              Voice Avatar
            </Link>
            .
          </li>
          <li>
            Enumerate real hardware with the{" "}
            <Link className="underline" href="/docs/components/device-selector">
              Device Selector
            </Link>
            &apos;s owned <code>useMediaDevices</code> hook.
          </li>
        </ul>
      </Section>
    </main>
  )
}
