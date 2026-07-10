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

// Scroll up inside the panel: the "jump to latest" key rises at overlay depth.
// Return to the bottom and it falls away.
export default function ConversationScrollButtonExample() {
  return (
    <div className="bg-card flex h-72 w-full max-w-md rounded-xl squircle border shadow-resting">
      <Conversation>
        <ConversationContent>
          {Array.from({ length: 12 }).map((_, i) => (
            <Message key={i} from={i % 2 === 0 ? "user" : "assistant"}>
              {i % 2 === 1 && <MessageAvatar name="Seam UI" />}
              <MessageContent>
                {i % 2 === 0
                  ? `Question number ${i / 2 + 1}.`
                  : "A reply long enough to fill the viewport so there is something to scroll through and back down from."}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  )
}
