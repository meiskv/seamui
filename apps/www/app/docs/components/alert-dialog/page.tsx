import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AlertDialogDemo from "@/registry/seam/examples/alert-dialog-demo"
import AlertDialogDiscard from "@/registry/seam/examples/alert-dialog-discard"
import AlertDialogSignout from "@/registry/seam/examples/alert-dialog-signout"

export const metadata: Metadata = {
  title: "Alert Dialog — seamui",
  description: "Confirmation dialog built on Base UI with seam modal depth.",
}

export default function AlertDialogDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Alert Dialog</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A modal that interrupts the user to confirm a consequential action. Same
        modal depth as Dialog, but it must be dismissed with an explicit choice.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Destructive",
            component: <AlertDialogDemo />,
            code: exampleSource("alert-dialog-demo"),
            description:
              "The high-stakes case — a destructive action you must confirm.",
          },
          {
            key: "discard",
            title: "Discard",
            component: <AlertDialogDiscard />,
            code: exampleSource("alert-dialog-discard"),
            description:
              "A softer confirm; the action is primary, not destructive.",
          },
          {
            key: "signout",
            title: "Sign out",
            component: <AlertDialogSignout />,
            code: exampleSource("alert-dialog-signout"),
          },
        ]}
      />

      <Install name="alert-dialog" />

      <Notes>
        <li>
          Unlike Dialog, backdrop click and Escape don&apos;t dismiss it — the
          user must pick <code>AlertDialogCancel</code> or{" "}
          <code>AlertDialogAction</code>.
        </li>
        <li>Focus is trapped while open and restored on close.</li>
      </Notes>
    </main>
  )
}
