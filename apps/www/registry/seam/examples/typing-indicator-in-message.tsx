import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/seam/ui/message"
import { TypingIndicator } from "@/registry/seam/ui/typing-indicator"

// Drop it where the assistant's reply will land, before the first token.
export default function TypingIndicatorInMessage() {
  return (
    <div className="w-full max-w-md">
      <Message from="assistant">
        <MessageAvatar name="Seam UI" />
        <MessageContent>
          <TypingIndicator />
        </MessageContent>
      </Message>
    </div>
  )
}
