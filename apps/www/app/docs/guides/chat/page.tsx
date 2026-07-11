import type { Metadata } from "next"
import Link from "next/link"

import { Section } from "@/components/docs/section"
import { CodeBlock } from "@/registry/seam/ui/code-block"
import { exampleSource } from "@/lib/registry-source"
import ChatDemo from "@/registry/seam/examples/chat-demo"

export const metadata: Metadata = {
  title: "Building a chat app — seamui",
  description:
    "Compose composer, conversation, message, and response into a streamed chat — the AI suite end to end.",
}

export default function ChatGuide() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Building a chat app
      </h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Four components compose into a complete streamed chat: a stick-to-bottom{" "}
        <strong>Conversation</strong>, <strong>Message</strong> rows, a
        streaming-safe <strong>Response</strong> renderer, and the{" "}
        <strong>Composer</strong> well. Everything is controlled and
        transport-agnostic — the prop shapes line up with the AI SDK&apos;s{" "}
        <code>useChat</code>, but nothing here depends on it.
      </p>

      {/* Live result */}
      <div className="squircle bg-background my-6 flex justify-center rounded-xl border p-6">
        <ChatDemo />
      </div>

      <Section title="The pieces">
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Conversation</strong> — the scroll viewport; sticks to the
            bottom while tokens stream, releases when you scroll up.
          </li>
          <li>
            <strong>Message</strong> — one row: an assistant avatar + content,
            or a right-aligned user key.
          </li>
          <li>
            <strong>Response</strong> — renders assistant markdown safely
            mid-stream (no broken fences while a code block is half-typed).
          </li>
          <li>
            <strong>Composer</strong> — the debossed prompt well; its{" "}
            <code>status</code> swaps send ⇄ stop.
          </li>
        </ul>
        <CodeBlock
          language="bash"
          code={`bunx --bun @seamui/cli@latest add composer conversation message response`}
        />
      </Section>

      <Section title="1. The viewport">
        <p className="text-muted-foreground text-sm">
          <code>Conversation</code> owns the scroll. It pins to the bottom as
          content grows and drops the pin the moment the reader scrolls up; the{" "}
          <code>ConversationScrollButton</code> floats in to jump back down.
        </p>
        <CodeBlock
          language="tsx"
          code={`<Conversation>
  <ConversationContent>
    {messages.map((m) => (
      <Message key={m.id} from={m.from}>…</Message>
    ))}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>`}
        />
      </Section>

      <Section title="2. Messages">
        <p className="text-muted-foreground text-sm">
          A <code>Message</code>&apos;s <code>from</code> decides its side. The
          user&apos;s text is a raised key; the assistant sits flat on the
          canvas with an avatar, its markdown going through{" "}
          <code>Response</code> so it stays intact while streaming.
        </p>
        <CodeBlock
          language="tsx"
          code={`<Message from={m.from}>
  {m.from === "assistant" && <MessageAvatar name="Seam UI" />}
  <MessageContent>
    {m.from === "assistant" ? <Response>{m.text}</Response> : m.text}
  </MessageContent>
</Message>`}
        />
      </Section>

      <Section title="3. The composer">
        <p className="text-muted-foreground text-sm">
          The <code>Composer</code> is the signature debossed well. Pass a{" "}
          <code>status</code> of <code>&quot;ready&quot;</code> or{" "}
          <code>&quot;streaming&quot;</code> and <code>ComposerSubmit</code>{" "}
          renders send or stop automatically — wire <code>onStop</code> to
          cancel the stream. Enter submits, Shift+Enter adds a newline.
        </p>
        <CodeBlock
          language="tsx"
          code={`<Composer status={status} onStop={stop} onSubmit={submit}>
  <ComposerTextarea
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Ask anything…"
  />
  <ComposerToolbar>
    <ComposerSubmit disabled={status === "ready" && !value.trim()} />
  </ComposerToolbar>
</Composer>`}
        />
      </Section>

      <Section title="4. Wire it up">
        <p className="text-muted-foreground text-sm">
          Hold the messages in state, append a user message and an empty
          assistant message on submit, then grow the assistant&apos;s text as
          tokens arrive. Here it&apos;s a fake streaming backend; swapping in a
          real one (or the AI SDK&apos;s <code>useChat</code>) means replacing
          the <code>setInterval</code> with your stream — the components
          don&apos;t change.
        </p>
        <CodeBlock language="tsx" code={exampleSource("chat-demo")} />
      </Section>

      <Section title="Accessibility & motion">
        <p className="text-muted-foreground text-sm">
          <code>Conversation</code> is a <code>role=&quot;log&quot;</code> with{" "}
          <code>aria-live=&quot;polite&quot;</code>, so streamed messages
          announce without you wiring anything. Newly appended text fades in
          (opacity only — safe under reduced motion); the scroll button rises at
          overlay depth and auto-scroll becomes an instant jump when{" "}
          <code>prefers-reduced-motion</code> is on. Nothing bounces the text.
        </p>
      </Section>

      <Section title="Next steps">
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
          <li>
            Render fenced code with{" "}
            <Link className="underline" href="/docs/components/code-block">
              Code Block
            </Link>
            , and agent steps with{" "}
            <Link className="underline" href="/docs/components/tool">
              Tool
            </Link>
            .
          </li>
          <li>
            Ground answers using{" "}
            <Link className="underline" href="/docs/components/sources">
              Sources
            </Link>{" "}
            and inline citations.
          </li>
          <li>
            Add a pre-first-token{" "}
            <Link
              className="underline"
              href="/docs/components/typing-indicator"
            >
              Typing Indicator
            </Link>
            , then prompt{" "}
            <Link className="underline" href="/docs/components/suggestions">
              Suggestions
            </Link>
            .
          </li>
          <li>
            Give history temporal structure with{" "}
            <Link className="underline" href="/docs/components/chat-timeline">
              Chat Timeline
            </Link>
            .
          </li>
        </ul>
      </Section>
    </main>
  )
}
