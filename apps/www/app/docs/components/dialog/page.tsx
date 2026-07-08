import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DialogDemo from "@/registry/seam/examples/dialog-demo"

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

      <ComponentPreview code={exampleSource("dialog-demo")}>
        <DialogDemo />
      </ComponentPreview>

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
          The popup animates from <code>depth.modal.initial</code> to rest with{" "}
          <code>springs.surface</code> — top-of-stack depth. The backdrop fades
          in with <code>fades.normal</code>, reading as the page receding
          beneath. Honors <code>prefers-reduced-motion</code>.
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
