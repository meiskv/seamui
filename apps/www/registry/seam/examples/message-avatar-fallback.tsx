import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/seam/ui/message"

export default function MessageAvatarFallback() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Message from="assistant">
        <MessageAvatar
          name="Ada Lovelace"
          src="https://i.pravatar.cc/64?img=5"
        />
        <MessageContent>An avatar image, when one is available.</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar name="Ada Lovelace" />
        <MessageContent>
          With no image, the fallback shows the initials — derived from the
          name.
        </MessageContent>
      </Message>
    </div>
  )
}
