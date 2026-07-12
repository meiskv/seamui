import { SessionItem } from "@/registry/seam/ui/session-item"

// Unread rows bold the title and show a count; the count announces as
// "3 unread", not just a number.
export default function SessionItemUnread() {
  return (
    <div className="bg-muted/40 w-72 rounded-lg border p-2">
      <SessionItem
        title="fix-auth-redirect"
        status="waiting"
        unread={3}
        time="2m"
      />
      <SessionItem
        title="rate-limit backoff strategy"
        status="waiting"
        unread={1}
        time="9m"
      />
      <SessionItem title="bump-dependencies" status="done" time="1h" />
    </div>
  )
}
