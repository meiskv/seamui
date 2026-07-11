import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/seam/ui/message"

export default function MessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Message from="user">
        <MessageContent>
          How do springs differ from durations in seamui?
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar name="Seam UI" />
        <MessageContent>
          Springs are physics-based — they react to velocity, so a press settles
          naturally instead of running a fixed clock. Durations are reserved for
          opacity fades and layout dimensions that can&apos;t spring cleanly.
        </MessageContent>
      </Message>
    </div>
  )
}
