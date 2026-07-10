"use client"

import * as React from "react"

import {
  Composer,
  ComposerSubmit,
  ComposerTextarea,
  ComposerToolbar,
} from "@/registry/seam/ui/composer"
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
import { Response } from "@/registry/seam/ui/response"

type ChatMessage = { id: number; from: "user" | "assistant"; text: string }

const REPLY = `Good question. A few notes:

- **springs** carry velocity, so interruptions redirect smoothly
- **depth** presses controls into the surface and floats overlays up
- **reduced motion** swaps movement for opacity — never a dead UI

That is the whole seam idea in three lines.`

let nextId = 0

// A complete v0 chat: composer + conversation + message + response, wired to a
// fake streaming backend so the whole loop is visible.
export default function ChatDemo() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: nextId++, from: "assistant", text: "Ask me about seamui's motion." },
  ])
  const [value, setValue] = React.useState("")
  const [status, setStatus] = React.useState<"ready" | "streaming">("ready")
  const timers = React.useRef<ReturnType<typeof setInterval>[]>([])

  const stop = () => {
    timers.current.forEach(clearInterval)
    timers.current = []
    setStatus("ready")
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = value.trim()
    if (!text || status === "streaming") return
    setValue("")

    const replyId = nextId++
    setMessages((prev) => [
      ...prev,
      { id: nextId++, from: "user", text },
      { id: replyId, from: "assistant", text: "" },
    ])
    setStatus("streaming")

    const tokens = REPLY.split(/(\s+)/)
    let i = 0
    const id = setInterval(() => {
      i++
      const partial = tokens.slice(0, i).join("")
      setMessages((prev) =>
        prev.map((m) => (m.id === replyId ? { ...m, text: partial } : m))
      )
      if (i >= tokens.length) {
        clearInterval(id)
        timers.current = timers.current.filter((t) => t !== id)
        setStatus("ready")
      }
    }, 55)
    timers.current.push(id)
  }

  return (
    <div className="bg-card flex h-[28rem] w-full max-w-md flex-col overflow-hidden rounded-xl squircle border shadow-resting">
      <Conversation>
        <ConversationContent>
          {messages.map((m) => (
            <Message key={m.id} from={m.from}>
              {m.from === "assistant" && <MessageAvatar name="Seam UI" />}
              <MessageContent>
                {m.from === "assistant" ? (
                  m.text ? (
                    <Response>{m.text}</Response>
                  ) : (
                    <span className="text-muted-foreground">…</span>
                  )
                ) : (
                  m.text
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t p-2">
        <Composer status={status} onStop={stop} onSubmit={submit}>
          <ComposerTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask anything…"
          />
          <ComposerToolbar>
            <ComposerSubmit disabled={status === "ready" && !value.trim()} />
          </ComposerToolbar>
        </Composer>
      </div>
    </div>
  )
}
