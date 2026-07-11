import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
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

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <ChatTimelineDemo />, code: exampleSource("chat-timeline-demo") },
          { key: "unread", title: "Unread divider", component: <ChatTimelineUnread />, code: exampleSource("chat-timeline-unread") },
        ]}
      />

      <Install name="chat-timeline" />

      <Notes>
        <li>
          Grouping is presentational — you pass ordered messages and decide the
          day boundaries and which consecutive-sender runs collapse their
          avatar; the component supplies the layout and the sticky headers.
        </li>
        <li>
          The date chips pin with a constant subtle backdrop — nothing
          translates, so they read the same with reduced motion on. New groups
          inherit the Message entrance; regrouping is instant by design, with
          no layout springs — reflowing history must never wobble.
        </li>
        <li>
          The timeline is a <code>role=&quot;list&quot;</code> of message rows;
          the unread divider is a labeled <code>role=&quot;separator&quot;</code>{" "}
          announced once — the flanking rules are decorative.
        </li>
        <li>
          Collapsed avatars leave a spacer so alignment holds without adding
          noise for screen readers.
        </li>
      </Notes>
    </main>
  )
}
