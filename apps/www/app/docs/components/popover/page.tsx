import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import PopoverDemo from "@/registry/seam/examples/popover-demo"
import PopoverForm from "@/registry/seam/examples/popover-form"
import PopoverAlign from "@/registry/seam/examples/popover-align"

export const metadata: Metadata = {
  title: "Popover — seamui",
  description: "Popover built on Base UI with seam overlay-depth entrance.",
}

export default function PopoverDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Popover</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Rich floating content anchored to a trigger. The panel rises toward you
        on open with overlay depth.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <PopoverDemo />, code: exampleSource("popover-demo") },
          { key: "form", title: "Form", component: <PopoverForm />, code: exampleSource("popover-form"), description: "A compact settings panel — inputs live right in the floating surface." },
          { key: "align", title: "Alignment", component: <PopoverAlign />, code: exampleSource("popover-align"), description: "Align the panel to the start or end edge of the trigger." },
        ]}
      />

      <Install name="popover" />

      <Notes>
        <li>
          Manages focus trapping and restoration; dismisses on outside click
          and Escape.
        </li>
        <li>
          Compose <code>PopoverTitle</code> / <code>PopoverDescription</code>{" "}
          for labelled content and <code>PopoverClose</code> for a close button.
        </li>
      </Notes>
    </main>
  )
}
