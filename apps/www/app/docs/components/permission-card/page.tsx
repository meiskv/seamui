import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import PermissionCardDemo from "@/registry/seam/examples/permission-card-demo"
import PermissionCardReceipts from "@/registry/seam/examples/permission-card-receipts"
import PermissionCardStepper from "@/registry/seam/examples/permission-card-stepper"

export const metadata: Metadata = {
  title: "Permission Card — seamui",
  description:
    "Inline approval — allow once / allow for session / deny, settling into a receipt.",
}

export default function PermissionCardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Permission Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The permission prompt rendered in the thread: what the agent wants to
        do, the command it wants to run, and the three answers every agent
        product converged on — allow once, allow for the session, deny. Once
        decided, the card settles into a quiet receipt so the thread keeps an
        audit trail.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <PermissionCardDemo />,
            code: exampleSource("permission-card-demo"),
          },
          {
            key: "receipts",
            title: "Receipts",
            component: <PermissionCardReceipts />,
            code: exampleSource("permission-card-receipts"),
          },
          {
            key: "stepper",
            title: "Multi-question",
            component: <PermissionCardStepper />,
            code: exampleSource("permission-card-stepper"),
          },
        ]}
      />

      <Install name="permission-card" />

      <Notes>
        <li>
          Pending is a raised key demanding attention; the command sits in a
          debossed well (<code>PermissionCardCommand</code> for one-liners —
          compose <code>code-block</code> for bigger payloads); action keys come
          from <code>Button</code>. Deciding settles the card: actions are
          replaced by a debossed receipt.
        </li>
        <li>
          Controlled and transport-agnostic:{" "}
          <code>onAllow(&quot;once&quot; | &quot;session&quot;)</code> /{" "}
          <code>onDeny()</code> out, <code>decision</code> in (
          <code>allowed</code>, <code>allowed-session</code>,{" "}
          <code>denied</code>, <code>auto</code> for auto-approved receipts).
        </li>
        <li>
          The card is a labeled <code>role=&quot;group&quot;</code>; the
          decision region is <code>aria-live=&quot;polite&quot;</code>, so the
          resolution is announced without interrupting. <code>step</code>{" "}
          renders a &ldquo;2 of 3&rdquo; chip that announces as &ldquo;Question
          2 of 3&rdquo;.
        </li>
      </Notes>
    </main>
  )
}
