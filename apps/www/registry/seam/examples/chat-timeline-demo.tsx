import {
  Conversation,
  ConversationContent,
} from "@/registry/seam/ui/conversation"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/seam/ui/message"
import {
  ChatTimeline,
  ChatTimelineGroup,
  ChatTimelineHeader,
} from "@/registry/seam/ui/chat-timeline"

const DAYS = [
  {
    label: "Monday",
    messages: [
      { from: "user", text: "Can you set up the project?" },
      { from: "assistant", text: "Done — registry, docs, and CI are wired." },
      { from: "assistant", text: "Want me to open a PR?" },
    ],
  },
  {
    label: "Today",
    messages: [
      { from: "user", text: "Yes, open it." },
      { from: "assistant", text: "Opened. Sticky headers pin as you scroll." },
    ],
  },
] as const

export default function ChatTimelineDemo() {
  return (
    <div className="bg-card flex h-80 w-full max-w-md rounded-xl squircle border shadow-resting">
      <Conversation>
        <ConversationContent>
          <ChatTimeline>
            {DAYS.map((day) => (
              <ChatTimelineGroup key={day.label}>
                <ChatTimelineHeader>{day.label}</ChatTimelineHeader>
                {day.messages.map((m, i) => {
                  // Collapse the avatar on consecutive assistant messages.
                  const prev = day.messages[i - 1]
                  const firstOfRun = !prev || prev.from !== m.from
                  return (
                    <Message key={i} from={m.from} role="listitem">
                      {m.from === "assistant" &&
                        (firstOfRun ? (
                          <MessageAvatar name="Seam UI" />
                        ) : (
                          <span className="w-8 shrink-0" aria-hidden />
                        ))}
                      <MessageContent>{m.text}</MessageContent>
                    </Message>
                  )
                })}
              </ChatTimelineGroup>
            ))}
          </ChatTimeline>
        </ConversationContent>
      </Conversation>
    </div>
  )
}
