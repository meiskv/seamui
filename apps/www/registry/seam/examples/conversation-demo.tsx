"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/seam/ui/conversation"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/seam/ui/message"

const SEED = [
  { from: "user", text: "Give me a few sentences about springs." },
  {
    from: "assistant",
    text: "A spring animates toward a target by simulating stiffness, damping, and mass rather than a fixed clock. Because it carries velocity, an interrupted spring redirects smoothly instead of snapping.",
  },
  { from: "user", text: "And why depth?" },
  {
    from: "assistant",
    text: "Depth turns the interface into a stack of surfaces on a virtual z-axis. Pressing recedes a control into the surface; overlays rise toward you. It reads as physical, not flat.",
  },
] as const

export default function ConversationDemo() {
  const [messages, setMessages] = React.useState<
    { from: "user" | "assistant"; text: string }[]
  >(SEED.map((m) => ({ ...m })))

  const send = () => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: "Tell me one more thing." },
      {
        from: "assistant",
        text: "Every interactive control reacts to press within a frame and settles springy on release — the viewport follows along, staying pinned to the newest message while you're at the bottom.",
      },
    ])
  }

  return (
    <div className="bg-card flex h-80 w-full max-w-md flex-col rounded-xl squircle border shadow-resting">
      <Conversation>
        <ConversationContent>
          {messages.map((m, i) => (
            <Message key={i} from={m.from}>
              {m.from === "assistant" && <MessageAvatar name="Seam UI" />}
              <MessageContent>{m.text}</MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t p-2">
        <Button size="sm" className="w-full" onClick={send}>
          Send more
        </Button>
      </div>
    </div>
  )
}
