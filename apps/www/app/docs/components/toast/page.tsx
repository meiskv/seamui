import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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

      <ComponentPreview code={exampleSource("toast-demo")}>
        <ToastDemo />
      </ComponentPreview>

      <Install name="toast" />

      <Section title="Usage">
        <CodeBlock>{`// 1. Wrap your app once:
import { ToastProvider } from "@/components/ui/toast"

<ToastProvider>{children}</ToastProvider>`}</CodeBlock>
        <CodeBlock>{`// 2. Show a toast from anywhere inside it:
import { useToast } from "@/components/ui/toast"

const toast = useToast()
toast.add({ title: "Saved", description: "All set." })`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Toasts enter with an overshooting cubic-bezier (a{" "}
          <code>springs.bouncy</code>-shaped curve) on opacity and offset, while
          Base UI owns the stacking transforms and native swipe-to-dismiss —
          the same &ldquo;let the platform physics lead&rdquo; approach as the
          Drawer.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Announced via an ARIA live region, focusable for keyboard dismissal,
          and pause-on-hover so toasts don&apos;t vanish while being read.
        </p>
      </Section>
    </main>
  )
}
