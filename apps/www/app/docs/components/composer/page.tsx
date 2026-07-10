import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ComposerDemo from "@/registry/seam/examples/composer-demo"
import ComposerStreaming from "@/registry/seam/examples/composer-streaming"
import ComposerAttachments from "@/registry/seam/examples/composer-attachments"

export const metadata: Metadata = {
  title: "Composer — seamui",
  description:
    "The prompt input — a debossed well with send/stop, attachments, and Enter-to-send.",
}

export default function ComposerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Composer</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The prompt input, and the clearest expression of the seam language: the
        whole surface is a debossed well you act into; the send key inside it is
        the embossed token that fires the action.
      </p>

      <ComponentPreview code={exampleSource("composer-demo")}>
        <ComposerDemo />
      </ComponentPreview>

      <Install name="composer" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Composer,
  ComposerTextarea,
  ComposerToolbar,
  ComposerTools,
  ComposerSubmit,
  ComposerAttachments,
  ComposerAttachment,
} from "@/components/ui/composer"`}</CodeBlock>
        <CodeBlock>{`<Composer status={status} onStop={stop} onSubmit={send}>
  <ComposerTextarea value={value} onChange={…} placeholder="Ask anything…" />
  <ComposerToolbar>
    <ComposerSubmit disabled={!value.trim()} />
  </ComposerToolbar>
</Composer>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Fully controlled and transport-agnostic: you own <code>value</code>,{" "}
          <code>onSubmit</code>, and a <code>status</code> of{" "}
          <code>&quot;ready&quot;</code> or <code>&quot;streaming&quot;</code>.
          The shape maps 1:1 onto the AI SDK&apos;s <code>useChat</code>, with no
          runtime dependency on it.
        </p>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Streaming (send becomes stop)
        </h3>
        <ComponentPreview code={exampleSource("composer-streaming")}>
          <ComposerStreaming />
        </ComponentPreview>

        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Attachments
        </h3>
        <ComponentPreview code={exampleSource("composer-attachments")}>
          <ComposerAttachments />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Send and stop press with <code>depth.pressed</code> inherited from
          Button; the icon crossfades between them on opacity. Attachment chips
          rise in and fall out on <code>springs.snappy</code>. The well itself
          stays still — text entry is calm, with only a focus ring for feedback.
          Under reduced motion the chip enter/exit and icon swap collapse to
          opacity fades.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          A real <code>&lt;form&gt;</code>: <kbd>Enter</kbd> submits,{" "}
          <kbd>Shift</kbd>+<kbd>Enter</kbd> inserts a newline, and submitting via
          keyboard never steals focus from the textarea. The submit/stop control
          swaps its <code>aria-label</code> and its button <code>type</code> with
          the status; the attachment remove control dogfoods a resized ghost
          Button.
        </p>
      </Section>
    </main>
  )
}
