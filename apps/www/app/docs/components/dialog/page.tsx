import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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
          { key: "default", title: "Default", component: <DialogDemo />, code: exampleSource("dialog-demo") },
          { key: "form", title: "Form", component: <DialogForm />, code: exampleSource("dialog-form"), description: "A real form inside — the surface still rises to the top of the stack." },
          { key: "scroll", title: "Scrollable", component: <DialogScroll />, code: exampleSource("dialog-scroll"), description: "Long content scrolls inside the modal; the header and footer stay put." },
        ]}
      />

      <Install name="dialog" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"`}</CodeBlock>
        <CodeBlock>{`<Dialog>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button>Save</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The panel animates via the shared <code>condense</code> token from{" "}
          <code>@/lib/motion</code> — CSS keyed to Base UI&apos;s{" "}
          <code>data-starting-style</code> / <code>data-ending-style</code>, so
          Base UI can await the exit before unmounting. On open it pops from
          center and fades in on a spring-shaped bezier; on dismiss it falls
          back, scaling down and fading slightly quicker than it rose. The
          backdrop dims and undims on the same clock. Under{" "}
          <code>prefers-reduced-motion</code> the scale is dropped — it still
          fades in and out.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Traps focus, restores it on close, locks page scroll, and wires{" "}
          <code>aria-labelledby</code> / <code>aria-describedby</code> from{" "}
          <code>DialogTitle</code> / <code>DialogDescription</code>. Dismisses on
          Escape and backdrop click.
        </p>
      </Section>
    </main>
  )
}
