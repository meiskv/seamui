import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TypingIndicatorDemo from "@/registry/seam/examples/typing-indicator-demo"
import TypingIndicatorInMessage from "@/registry/seam/examples/typing-indicator-in-message"

export const metadata: Metadata = {
  title: "Typing Indicator — seamui",
  description:
    "Pre-first-token dots; bounce becomes an opacity pulse under reduced motion.",
}

export default function TypingIndicatorDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Typing Indicator
      </h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The pre-first-token state — distinct from a Spinner&apos;s generic
        loading. It says someone is about to talk, so it sits where the
        assistant&apos;s reply will land.
      </p>

      <ComponentPreview code={exampleSource("typing-indicator-demo")}>
        <TypingIndicatorDemo />
      </ComponentPreview>

      <Install name="typing-indicator" />

      <Section title="Usage">
        <CodeBlock>{`import { TypingIndicator } from "@/components/ui/typing-indicator"`}</CodeBlock>
        <CodeBlock>{`{status === "submitted" && <TypingIndicator />}`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          In a message
        </h3>
        <ComponentPreview code={exampleSource("typing-indicator-in-message")}>
          <TypingIndicatorInMessage />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          This is seamui&apos;s reference case for reduced motion as a{" "}
          <em>variant</em>. The dots bounce on a staggered loop
          (<code>springs.bouncy</code> — the one sanctioned use). Turn on{" "}
          <em>Reduce Motion</em> and the bounce becomes a staggered opacity pulse
          instead: the feedback is never removed, it just stops traveling. That
          swap is the whole seamui reduced-motion policy in one component.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The container is a <code>role=&quot;status&quot;</code> labeled
          &ldquo;Assistant is typing&rdquo;; the individual dots are{" "}
          <code>aria-hidden</code>, so the state is announced once rather than as
          three moving elements.
        </p>
      </Section>
    </main>
  )
}
