import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AlertDemo from "@/registry/seam/examples/alert-demo"
import AlertDestructive from "@/registry/seam/examples/alert-destructive"
import AlertTitleOnly from "@/registry/seam/examples/alert-title-only"

export const metadata: Metadata = {
  title: "Alert — seamui",
  description:
    "Static inline callout for persistent state — the counterpart to toast.",
}

export default function AlertDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Alert</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A static inline callout for state that persists — verify your email,
        payment failed, maintenance ahead. Toast announces events; Alert stays
        until the state changes.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <AlertDemo />,
            code: exampleSource("alert-demo"),
          },
          {
            key: "destructive",
            title: "Destructive",
            component: <AlertDestructive />,
            code: exampleSource("alert-destructive"),
          },
          {
            key: "title-only",
            title: "Title only",
            component: <AlertTitleOnly />,
            code: exampleSource("alert-title-only"),
          },
        ]}
      />

      <Install name="alert" />

      <ApiTable
        rows={[
          {
            prop: "variant",
            type: '"default" | "destructive"',
            default: '"default"',
            desc: "Neutral muted well, or a destructive-tinted one for errors.",
          },
        ]}
        footer={
          <>
            Compose <code>Alert</code> with <code>AlertTitle</code>, an optional{" "}
            <code>AlertDescription</code>, and an optional leading icon (any{" "}
            <code>&lt;svg&gt;</code> as the first child).
          </>
        }
      />

      <Notes>
        <li>
          Deliberately still — an alert is persistent page state, so it gets no
          entrance or press motion. Transient feedback belongs to toast.
        </li>
        <li>
          Debossed by design: persistent state reads as carved <em>into</em> the
          surface (<code>shadow-well</code>), where toast&apos;s transient key
          is raised on top of it.
        </li>
        <li>
          Carries <code>role=&quot;alert&quot;</code> so content that appears
          dynamically is announced by screen readers.
        </li>
        <li>
          Variants stay on theme tokens — a warning variant is planned once the
          theme grows a warning color.
        </li>
      </Notes>
    </main>
  )
}
