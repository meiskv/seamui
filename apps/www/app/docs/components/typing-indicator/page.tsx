import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
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

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <TypingIndicatorDemo />,
            code: exampleSource("typing-indicator-demo"),
          },
          {
            key: "in-message",
            title: "In a message",
            component: <TypingIndicatorInMessage />,
            code: exampleSource("typing-indicator-in-message"),
          },
        ]}
      />

      <Install name="typing-indicator" />

      <Notes>
        <li>
          seamui&apos;s reference case for reduced motion as a <em>variant</em>:
          the dots bounce on a staggered <code>springs.bouncy</code> loop (the
          one sanctioned use), and under reduced motion the bounce becomes a
          staggered opacity pulse — the feedback is never removed, it just stops
          traveling.
        </li>
        <li>
          Render it while awaiting the first token (e.g.{" "}
          <code>status === &quot;submitted&quot;</code> from the AI SDK&apos;s{" "}
          <code>useChat</code>).
        </li>
        <li>
          The container is a <code>role=&quot;status&quot;</code> labeled
          &ldquo;Assistant is typing&rdquo;; the individual dots are{" "}
          <code>aria-hidden</code>, so the state is announced once rather than
          as three moving elements.
        </li>
      </Notes>
    </main>
  )
}
