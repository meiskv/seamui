import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AlertDemo from "@/registry/seam/examples/alert-demo"
import AlertDestructive from "@/registry/seam/examples/alert-destructive"

export const metadata: Metadata = {
  title: "Alert — seamui",
  description: "Callout for short, important messages.",
}

export default function AlertDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Alert</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A callout for a short, important message — resting on the canvas as a
        raised card key. An optional leading icon pins to the title line.
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
        ]}
      />

      <Install name="alert" />

      <Notes>
        <li>
          Carries <code>role="alert"</code>; place time-sensitive messages here
          so assistive tech announces them.
        </li>
        <li>
          Static by design — no motion. For transient, auto-dismissing messages
          use <code>Toast</code> instead.
        </li>
      </Notes>
    </main>
  )
}
