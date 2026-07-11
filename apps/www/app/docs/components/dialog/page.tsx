import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DialogDemo from "@/registry/seam/examples/dialog-demo"
import DialogForm from "@/registry/seam/examples/dialog-form"
import DialogScroll from "@/registry/seam/examples/dialog-scroll"

export const metadata: Metadata = {
  title: "Dialog — seamui",
  description: "Modal dialog built on Base UI with seam modal depth.",
}

export default function DialogDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dialog</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A modal window overlaid on the page. The surface rises to the top of the
        stack while a backdrop dims everything below.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <DialogDemo />,
            code: exampleSource("dialog-demo"),
          },
          {
            key: "form",
            title: "Form",
            component: <DialogForm />,
            code: exampleSource("dialog-form"),
            description:
              "A real form inside — the surface still rises to the top of the stack.",
          },
          {
            key: "scroll",
            title: "Scrollable",
            component: <DialogScroll />,
            code: exampleSource("dialog-scroll"),
            description:
              "Long content scrolls inside the modal; the header and footer stay put.",
          },
        ]}
      />

      <Install name="dialog" />

      <ApiTable
        rows={[
          {
            prop: "showClose",
            type: "boolean",
            default: "true",
            desc: "Renders the corner close button inside DialogContent; false removes it.",
          },
          {
            prop: "open",
            type: "boolean",
            desc: "Controlled open state, forwarded to Base UI's Root.",
          },
          {
            prop: "defaultOpen",
            type: "boolean",
            default: "false",
            desc: "Uncontrolled initial open state.",
          },
          {
            prop: "onOpenChange",
            type: "(open, eventDetails) => void",
            desc: "Called when the open state changes.",
          },
        ]}
        footer={
          <>
            <code>Dialog</code> forwards all other Base UI Root props;{" "}
            <code>DialogContent</code> forwards Popup props.
          </>
        }
      />

      <Notes>
        <li>
          Traps focus while open, restores it on close, and locks page scroll.
        </li>
        <li>Dismisses on Escape and backdrop click.</li>
        <li>
          <code>aria-labelledby</code> / <code>aria-describedby</code> are wired
          from <code>DialogTitle</code> / <code>DialogDescription</code>.
        </li>
      </Notes>
    </main>
  )
}
