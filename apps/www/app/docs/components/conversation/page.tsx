import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ConversationDemo from "@/registry/seam/examples/conversation-demo"
import ConversationScrollButton from "@/registry/seam/examples/conversation-scroll-button"

export const metadata: Metadata = {
  title: "Conversation — seamui",
  description:
    "Stick-to-bottom chat viewport with a floating scroll-to-latest key.",
}

export default function ConversationDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Conversation</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The scrolling viewport for a chat. It follows new content while
        you&apos;re at the bottom, releases the moment you scroll up, and offers
        a floating key to jump back to the latest message.
      </p>

      <ComponentPreview code={exampleSource("conversation-demo")}>
        <ConversationDemo />
      </ComponentPreview>

      <Install name="conversation" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/conversation"`}</CodeBlock>
        <CodeBlock>{`<Conversation>
  <ConversationContent>
    {messages.map((m) => <Message key={m.id} … />)}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Scroll-to-latest key
        </h3>
        <ComponentPreview code={exampleSource("conversation-scroll-button")}>
          <ConversationScrollButton />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The scroll-to-latest key rises at overlay depth
          (<code>springs.surface</code>) and falls away when you return to the
          bottom. While pinned, the viewport follows streamed content
          instantly, so it never lags behind the tokens. Explicit jumps scroll
          smoothly — but under reduced motion all scrolling is instant
          (<code>behavior: &quot;auto&quot;</code>) and the key fades rather than
          rising.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The viewport is a <code>role=&quot;log&quot;</code> with{" "}
          <code>aria-live=&quot;polite&quot;</code>, so appended messages are
          announced without interrupting. It is focusable and keyboard
          scrollable; the scroll button carries an <code>aria-label</code>. The
          stick-to-bottom logic ships in the component file — no dependency.
        </p>
      </Section>
    </main>
  )
}
