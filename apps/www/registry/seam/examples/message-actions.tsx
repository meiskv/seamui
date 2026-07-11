import { Copy, RefreshCw, ThumbsUp } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Message,
  MessageActions,
  MessageAvatar,
  MessageContent,
} from "@/registry/seam/ui/message"

export default function MessageActionsExample() {
  return (
    <div className="w-full max-w-md">
      <Message from="assistant">
        <MessageAvatar name="Seam UI" />
        <div className="flex min-w-0 flex-col gap-1">
          <MessageContent>
            Hover this message — the actions fade in on the row. They also
            appear on keyboard focus, and stay visible under reduced motion.
          </MessageContent>
          <MessageActions>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Copy"
            >
              <Copy />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Regenerate"
            >
              <RefreshCw />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Good response"
            >
              <ThumbsUp />
            </Button>
          </MessageActions>
        </div>
      </Message>
    </div>
  )
}
