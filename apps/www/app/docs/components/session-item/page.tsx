import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SessionItemDemo from "@/registry/seam/examples/session-item-demo"
import SessionItemHoverCard from "@/registry/seam/examples/session-item-hover-card"
import SessionItemUnread from "@/registry/seam/examples/session-item-unread"

export const metadata: Metadata = {
  title: "Session Item — seamui",
  description:
    "Rich session row for the sidebar, plus the hover-card layout with status, branch, and quick actions.",
}

export default function SessionItemDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Session Item</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The row an agent session lives in: status dot, title, time, unread count
        — and on hover, a card with live status, branch, and next actions, so
        you can check on an agent without leaving the thread you&apos;re in.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <SessionItemDemo />,
            code: exampleSource("session-item-demo"),
          },
          {
            key: "hover-card",
            title: "Hover status card",
            component: <SessionItemHoverCard />,
            code: exampleSource("session-item-hover-card"),
          },
          {
            key: "unread",
            title: "Unread",
            component: <SessionItemUnread />,
            code: exampleSource("session-item-unread"),
          },
        ]}
      />

      <Install name="session-item" />

      <Notes>
        <li>
          The row wears <code>Button</code> (ghost, row-shaped): press depth,
          haptic tap, focus ring, and disabled handling come from the
          foundation. <code>data-active</code> renders it as the embossed key
          risen from the sidebar well.
        </li>
        <li>
          <code>SessionCard</code> is layout only — the hover wiring is{" "}
          <code>preview-card</code> (see the example), so on touch you can put
          the identical card in a popover instead (hover → long-press, per the
          native contract).
        </li>
        <li>
          No nested interactive elements in the row; the branch chip&apos;s copy
          action lives on the card. Unread announces as &ldquo;3 unread&rdquo;;
          the status dot stays decorative next to the visible title.
        </li>
        <li>
          Pure props in (<code>title</code>, <code>status</code>,{" "}
          <code>time</code>, <code>unread</code>, <code>active</code>),{" "}
          <code>onClick</code> out — no transport or router coupling.
        </li>
      </Notes>
    </main>
  )
}
