import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ToastDemo from "@/registry/seam/examples/toast-demo"

export const metadata: Metadata = {
  title: "Toast — seamui",
  description: "Toast notifications built on Base UI with a bouncy seam entrance.",
}

export default function ToastDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Toast</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Brief, dismissible notifications that stack in a corner. They bounce in
        with a spring-shaped entrance and swipe away.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <ToastDemo />, code: exampleSource("toast-demo") },
        ]}
      />

      <Install name="toast" />

      <Notes>
        <li>
          Mount <code>ToastProvider</code> once at the app root; call{" "}
          <code>useToast().add(&#123;…&#125;)</code> from anywhere inside it.
        </li>
        <li>
          Toasts enter with an overshooting cubic-bezier (a{" "}
          <code>springs.bouncy</code>-shaped curve) on opacity and offset;
          Base UI owns the stacking transforms and native swipe-to-dismiss.
        </li>
        <li>
          Announced via an ARIA live region, focusable for keyboard dismissal,
          and pause-on-hover so toasts don&apos;t vanish while being read.
        </li>
      </Notes>
    </main>
  )
}
