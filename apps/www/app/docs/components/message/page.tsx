import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import MessageDemo from "@/registry/seam/examples/message-demo"
import MessageActions from "@/registry/seam/examples/message-actions"
import MessageAvatarFallback from "@/registry/seam/examples/message-avatar-fallback"

export const metadata: Metadata = {
  title: "Message — seamui",
  description: "Chat message row — user as an embossed key, assistant as flat prose.",
}

export default function MessageDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Message</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A single row in a conversation. The two sides are deliberately
        asymmetric: the user&apos;s words are an embossed key they placed on the
        surface; the assistant&apos;s reply is flat prose — the surface itself
        speaking.
      </p>

      <ComponentPreview code={exampleSource("message-demo")}>
        <MessageDemo />
      </ComponentPreview>

      <Install name="message" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
} from "@/components/ui/message"`}</CodeBlock>
        <CodeBlock>{`<Message from="assistant">
  <MessageAvatar name="Seam UI" />
  <MessageContent>Hello there.</MessageContent>
</Message>`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Actions on hover &amp; focus
        </h3>
        <ComponentPreview code={exampleSource("message-actions")}>
          <MessageActions />
        </ComponentPreview>

        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Avatar with fallback
        </h3>
        <ComponentPreview code={exampleSource("message-avatar-fallback")}>
          <MessageAvatarFallback />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Each row rises off the canvas on <code>springs.snappy</code> as it
          enters. Actions reveal with an opacity-only transition on hover and
          keyboard focus. Under reduced motion the row fades in place
          (<code>reduced.fadeIn</code>) and the actions appear instantly — the
          feedback is preserved, it simply doesn&apos;t travel.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          <code>MessageAvatar</code> dogfoods Avatar with an initials fallback
          derived from <code>name</code>. Action buttons require an{" "}
          <code>aria-label</code>; because they also appear on{" "}
          <code>:focus-within</code>, keyboard users can reach them. The live
          region that announces streamed messages lives on{" "}
          <code>Conversation</code>, not here, to avoid double-announcing.
        </p>
      </Section>
    </main>
  )
}
