import { GitPullRequestArrow, MessageSquare } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/registry/seam/ui/preview-card"
import {
  SessionCard,
  SessionCardRow,
  SessionItem,
} from "@/registry/seam/ui/session-item"

// The workbench signature: hover a session row to see live status, branch,
// and next actions without leaving the current thread. The hover wiring is
// preview-card; on touch, put the same SessionCard in a popover instead.
export default function SessionItemHoverCard() {
  return (
    <div className="bg-muted/40 w-72 rounded-lg border p-2">
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <SessionItem
              title="fix-auth-redirect"
              status="waiting"
              unread={3}
              time="2m"
            />
          }
        />
        <PreviewCardContent className="w-72">
          <SessionCard
            title="fix-auth-redirect"
            status="waiting"
            branch="claude/fix-auth-redirect"
            actions={
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 gap-1.5 text-xs"
                >
                  <MessageSquare className="size-3" /> Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 gap-1.5 text-xs"
                >
                  <GitPullRequestArrow className="size-3" /> Review diff
                </Button>
              </>
            }
          >
            <SessionCardRow label="Asking">
              Delete the legacy /login route?
            </SessionCardRow>
            <SessionCardRow label="Changes">+142 −38 in 6 files</SessionCardRow>
            <SessionCardRow label="Started">32 minutes ago</SessionCardRow>
          </SessionCard>
        </PreviewCardContent>
      </PreviewCard>
    </div>
  )
}
