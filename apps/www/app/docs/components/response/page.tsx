import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ResponseDemo from "@/registry/seam/examples/response-demo"
import ResponseStreaming from "@/registry/seam/examples/response-streaming"
import ResponseCode from "@/registry/seam/examples/response-code"

export const metadata: Metadata = {
  title: "Response — seamui",
  description: "Streaming-safe markdown renderer that hardens incomplete blocks.",
}

export default function ResponseDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Response</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Renders an assistant&apos;s markdown as flat seam prose — hardened so a
        half-arrived response never flashes broken markup mid-stream.
      </p>

      <ComponentPreview code={exampleSource("response-demo")}>
        <ResponseDemo />
      </ComponentPreview>

      <Install name="response" />

      <Section title="Usage">
        <CodeBlock>{`import { Response } from "@/components/ui/response"`}</CodeBlock>
        <CodeBlock>{`<Response>{message.text}</Response>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Pass the (possibly incomplete) markdown string as the only child.
          Built on <code>react-markdown</code> + <code>remark-gfm</code>; an
          unterminated code fence is auto-closed each frame so streaming tokens
          stay renderable.
        </p>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Streaming
        </h3>
        <ComponentPreview code={exampleSource("response-streaming")}>
          <ResponseStreaming />
        </ComponentPreview>

        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Code &amp; tables
        </h3>
        <ComponentPreview code={exampleSource("response-code")}>
          <ResponseCode />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Static by design. Streamed text appends with no per-character
          animation (explicitly forbidden in seamui) and no layout springs —
          reflowing prose must never bounce. The sense of life comes from the
          Conversation viewport following along, not from the letters. This
          makes the reduced-motion story trivial: nothing moves either way.
          Fenced code renders as a debossed well today and will adopt the{" "}
          <code>code-block</code> component through the same overrides when it
          lands.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Emits semantic HTML from the markdown pipeline — heading levels,
          lists, and tables are preserved; links open in a new tab with{" "}
          <code>rel=&quot;noreferrer&quot;</code>; wide code and tables scroll in
          keyboard-focusable containers. Announcement of streamed content is the
          Conversation&apos;s responsibility, so Response stays quiet to avoid
          double-announcing.
        </p>
      </Section>
    </main>
  )
}
