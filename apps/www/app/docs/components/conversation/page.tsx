import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
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

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ConversationDemo />,
            code: exampleSource("conversation-demo"),
          },
          {
            key: "scroll-button",
            title: "Scroll to latest",
            component: <ConversationScrollButton />,
            code: exampleSource("conversation-scroll-button"),
          },
        ]}
      />

      <Install name="conversation" />

      <ApiTable
        rows={[
          {
            prop: "children",
            type: "ReactNode",
            desc: "Viewport content — typically ConversationContent (messages) plus ConversationScrollButton.",
          },
          {
            prop: "useConversation().isAtBottom",
            type: "boolean",
            desc: "True while the viewport is pinned to the bottom; the scroll key shows when it flips false.",
          },
          {
            prop: "useConversation().scrollToBottom",
            type: "(behavior?: ScrollBehavior) => void",
            desc: "Jump to the latest message — smooth by default, instant under reduced motion.",
          },
        ]}
        footer={
          <>
            <code>Conversation</code> and <code>ConversationContent</code>{" "}
            accept all native <code>&lt;div&gt;</code> props;{" "}
            <code>ConversationScrollButton</code> accepts all Button props.
          </>
        }
      />

      <Notes>
        <li>
          The viewport is a <code>role=&quot;log&quot;</code> with{" "}
          <code>aria-live=&quot;polite&quot;</code>, so appended messages are
          announced without interrupting; it is focusable and keyboard
          scrollable.
        </li>
        <li>
          While pinned, the viewport follows streamed content instantly — an
          animated follow would lag behind the tokens. Under reduced motion{" "}
          <em>all</em> scrolling is instant (
          <code>behavior: &quot;auto&quot;</code>).
        </li>
        <li>
          The scroll-to-latest key rises at overlay depth (
          <code>springs.surface</code>) and falls away at the bottom; under
          reduced motion it fades rather than rising. It carries an{" "}
          <code>aria-label</code>.
        </li>
        <li>
          The stick-to-bottom logic ships in the component file — no dependency.
        </li>
      </Notes>
    </main>
  )
}
