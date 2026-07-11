import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import MessageDemo from "@/registry/seam/examples/message-demo"
import MessageActions from "@/registry/seam/examples/message-actions"
import MessageAvatarFallback from "@/registry/seam/examples/message-avatar-fallback"

export const metadata: Metadata = {
  title: "Message — seamui",
  description:
    "Chat message row — user as an embossed key, assistant as flat prose.",
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

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <MessageDemo />,
            code: exampleSource("message-demo"),
          },
          {
            key: "actions",
            title: "Actions",
            component: <MessageActions />,
            code: exampleSource("message-actions"),
          },
          {
            key: "avatar-fallback",
            title: "Avatar fallback",
            component: <MessageAvatarFallback />,
            code: exampleSource("message-avatar-fallback"),
          },
        ]}
      />

      <Install name="message" />

      <Notes>
        <li>
          Each row rises off the canvas on <code>springs.snappy</code> as it
          enters; under reduced motion it fades in place and the actions appear
          instantly.
        </li>
        <li>
          Actions reveal with an opacity-only transition on hover <em>and</em>{" "}
          <code>:focus-within</code>, so keyboard users can reach them. Each
          action button requires an <code>aria-label</code>.
        </li>
        <li>
          <code>MessageAvatar</code> dogfoods Avatar with an initials fallback
          derived from <code>name</code>.
        </li>
        <li>
          The live region that announces streamed messages lives on{" "}
          <code>Conversation</code>, not here, to avoid double-announcing.
        </li>
      </Notes>
    </main>
  )
}
