import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ChatTimelineDemo from "@/registry/seam/examples/chat-timeline-demo"
import ChatTimelineUnread from "@/registry/seam/examples/chat-timeline-unread"

export const metadata: Metadata = {
  title: "Chat Timeline — seamui",
  description:
    "Grouped, timestamped conversation history with sticky day headers.",
}

export default function ChatTimelineDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Chat Timeline</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A conversation with temporal structure — day headers that pin as you
        scroll, an unread divider, and collapsed avatars on consecutive
        messages from the same sender. Place it inside a Conversation.
      </p>

      <ComponentPreview code={exampleSource("chat-timeline-demo")}>
        <ChatTimelineDemo />
      </ComponentPreview>

      <Install name="chat-timeline" />

      <Section title="Usage">
        <CodeBlock>{`import {
  ChatTimeline,
  ChatTimelineGroup,
  ChatTimelineHeader,
  ChatTimelineDivider,
} from "@/components/ui/chat-timeline"`}</CodeBlock>
        <CodeBlock>{`<Conversation>
  <ConversationContent>
    <ChatTimeline>
      <ChatTimelineGroup>
        <ChatTimelineHeader>Today</ChatTimelineHeader>
        {/* <Message /> rows */}
      </ChatTimelineGroup>
    </ChatTimeline>
  </ConversationContent>
</Conversation>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Grouping is presentational — you pass ordered messages and decide the
          day boundaries and which consecutive-sender runs collapse their
          avatar. The component supplies the layout and the sticky headers.
        </p>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Unread divider
        </h3>
        <ComponentPreview code={exampleSource("chat-timeline-unread")}>
          <ChatTimelineUnread />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The date chips pin with a constant subtle backdrop — nothing
          translates, so they read the same with reduced motion on. New groups
          inherit the Message entrance. Regrouping is instant by design:
          reflowing history must never wobble, so there are no layout springs on
          the timeline itself.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The timeline is a <code>role=&quot;list&quot;</code> of message rows.
          The unread divider is a labeled <code>role=&quot;separator&quot;</code>{" "}
          announced once — the flanking rules are decorative. Collapsed avatars
          leave a spacer so alignment holds without adding noise for screen
          readers.
        </p>
      </Section>
    </main>
  )
}
