"use client"

import * as React from "react"
import {
  Bell,
  GitPullRequest,
  MessageSquare,
  TriangleAlert,
} from "lucide-react"

import { Badge } from "@/registry/seam/ui/badge"
import { Button } from "@/registry/seam/ui/button"
import { cn } from "@/lib/utils"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/registry/seam/ui/empty-state"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/seam/ui/popover"
import { Separator } from "@/registry/seam/ui/separator"

type Notification = {
  id: string
  icon: "pr" | "mention" | "limit"
  text: string
  time: string
  day: "Today" | "Yesterday"
  unread: boolean
}

const SEED: Notification[] = [
  {
    id: "n1",
    icon: "mention",
    text: "Zoe mentioned you in #launch-checklist.",
    time: "09:41",
    day: "Today",
    unread: true,
  },
  {
    id: "n2",
    icon: "limit",
    text: "API calls at 93% of the Pro limit.",
    time: "08:12",
    day: "Today",
    unread: true,
  },
  {
    id: "n3",
    icon: "pr",
    text: "Noah merged “billing: proration fixes”.",
    time: "18:20",
    day: "Yesterday",
    unread: false,
  },
]

const ICONS = {
  pr: GitPullRequest,
  mention: MessageSquare,
  limit: TriangleAlert,
}

// Notifications: a bell with a Badge count opening a Popover feed, grouped
// by day (the chat-timeline idiom, hand-rolled small), with EmptyState for
// the caught-up case. Opening rises with overlay depth via the Popover.
export default function NotificationsBlock() {
  const [items, setItems] = React.useState<Notification[]>(SEED)
  const unread = items.filter((n) => n.unread).length
  const days = ["Today", "Yesterday"].filter((d) =>
    items.some((n) => n.day === d)
  ) as Notification["day"][]

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
            className="relative"
          >
            <Bell />
            {unread > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1.5 -right-1.5 size-5 rounded-full p-0 text-[0.625rem]"
              >
                {unread}
              </Badge>
            )}
          </Button>
        }
      />
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              disabled={unread === 0}
              onClick={() =>
                setItems((ns) => ns.map((n) => ({ ...n, unread: false })))
              }
            >
              Mark all read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              disabled={items.length === 0}
              onClick={() => setItems([])}
            >
              Clear
            </Button>
          </div>
        </div>
        <Separator />
        {items.length === 0 ? (
          <EmptyState className="rounded-t-none border-0 py-8">
            <EmptyStateTitle>All caught up</EmptyStateTitle>
            <EmptyStateDescription>
              New activity lands here.
            </EmptyStateDescription>
          </EmptyState>
        ) : (
          <div className="max-h-72 overflow-y-auto py-1">
            {days.map((day) => (
              <div key={day}>
                <p className="text-muted-foreground px-4 pt-2 pb-1 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase">
                  {day}
                </p>
                {items
                  .filter((n) => n.day === day)
                  .map((n) => {
                    const Icon = ICONS[n.icon]
                    return (
                      <button
                        type="button"
                        key={n.id}
                        className="hover:bg-accent focus-visible:ring-ring/50 flex w-full items-start gap-3 px-4 py-2 text-left outline-none focus-visible:ring-2"
                        onClick={() =>
                          setItems((ns) =>
                            ns.map((x) =>
                              x.id === n.id ? { ...x, unread: false } : x
                            )
                          )
                        }
                      >
                        <span className="bg-secondary text-muted-foreground shadow-resting mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md squircle [&>svg]:size-3.5">
                          <Icon />
                        </span>
                        <span className="flex-1 text-sm leading-snug">
                          <span
                            className={cn(!n.unread && "text-muted-foreground")}
                          >
                            {n.text}
                          </span>
                          <span className="text-muted-foreground mt-0.5 block text-xs">
                            {n.time}
                          </span>
                        </span>
                        {n.unread && (
                          <span
                            aria-hidden
                            className="bg-primary mt-1.5 size-2 shrink-0 rounded-full"
                          />
                        )}
                      </button>
                    )
                  })}
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
