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
  ChatTimelineDivider,
  ChatTimelineGroup,
} from "@/registry/seam/ui/chat-timeline"

export default function ChatTimelineUnread() {
  return (
    <div className="bg-card flex h-72 w-full max-w-md rounded-xl squircle border shadow-resting">
      <Conversation>
        <ConversationContent>
          <ChatTimeline>
            <ChatTimelineGroup>
              <Message from="user">
                <MessageContent>Did the deploy finish?</MessageContent>
              </Message>
              <Message from="assistant">
                <MessageAvatar name="Seam UI" />
                <MessageContent>Yes, an hour ago.</MessageContent>
              </Message>
              <ChatTimelineDivider>New messages</ChatTimelineDivider>
              <Message from="assistant">
                <MessageAvatar name="Seam UI" />
                <MessageContent>
                  And the follow-up job just went green too.
                </MessageContent>
              </Message>
            </ChatTimelineGroup>
          </ChatTimeline>
        </ConversationContent>
      </Conversation>
    </div>
  )
}
