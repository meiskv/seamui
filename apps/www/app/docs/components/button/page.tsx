import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ButtonDemo from "@/registry/seam/examples/button-demo"
import ButtonVariants from "@/registry/seam/examples/button-variants"
import ButtonSizes from "@/registry/seam/examples/button-sizes"
import ButtonLoading from "@/registry/seam/examples/button-loading"
import ButtonLink from "@/registry/seam/examples/button-link"

export const metadata: Metadata = {
  title: "Button — seamui",
  description: "Button built on Base UI, animated with seam depth motion.",
}

export default function ButtonDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Button</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Displays a button. Built on Base UI, animated with seam depth motion.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ButtonDemo />,
            code: exampleSource("button-demo"),
          },
          {
            key: "variants",
            title: "Variants",
            component: <ButtonVariants />,
            code: exampleSource("button-variants"),
          },
          {
            key: "sizes",
            title: "Sizes",
            component: <ButtonSizes />,
            code: exampleSource("button-sizes"),
          },
          {
            key: "loading",
            title: "Loading",
            component: <ButtonLoading />,
            code: exampleSource("button-loading"),
          },
          {
            key: "link",
            title: "As a link",
            component: <ButtonLink />,
            code: exampleSource("button-link"),
          },
        ]}
      />

      <Install name="button" />

      <ApiTable
        rows={[
          {
            prop: "variant",
            type: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`,
            default: `"default"`,
            desc: "Visual style.",
          },
          {
            prop: "size",
            type: `"default" | "sm" | "lg" | "icon"`,
            default: `"default"`,
            desc: "Dimensions.",
          },
          {
            prop: "render",
            type: "ReactElement | (props, state) => ReactElement",
            desc: "Render a different element (e.g. an <a>) — Base UI's replacement for asChild.",
          },
          {
            prop: "haptic",
            type: `boolean | "tap" | "tick" | "success" | "error"`,
            default: "true",
            desc: "Haptic on press when a HapticsProvider is mounted; false opts out.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            desc: "Also accepts Base UI's focusableWhenDisabled.",
          },
        ]}
        footer={
          <>
            Plus all native <code>&lt;button&gt;</code> props.
          </>
        }
      />

      <Notes>
        <li>
          <code>ghost</code> and <code>link</code> stay flat — no press depth by
          design.
        </li>
        <li>
          <code>focusableWhenDisabled</code> keeps tab order stable when a
          button disables mid-interaction.
        </li>
      </Notes>
    </main>
  )
}
