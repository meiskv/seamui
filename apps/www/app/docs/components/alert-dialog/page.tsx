import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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
        A modal that interrupts the user to confirm a consequential action.
        Same modal depth as Dialog, but it must be dismissed with an explicit
        choice.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Destructive", component: <AlertDialogDemo />, code: exampleSource("alert-dialog-demo"), description: "The high-stakes case — a destructive action you must confirm." },
          { key: "discard", title: "Discard", component: <AlertDialogDiscard />, code: exampleSource("alert-dialog-discard"), description: "A softer confirm; the action is primary, not destructive." },
          { key: "signout", title: "Sign out", component: <AlertDialogSignout />, code: exampleSource("alert-dialog-signout") },
        ]}
      />

      <Install name="alert-dialog" />

      <Section title="Usage">
        <CodeBlock>{`import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"`}</CodeBlock>
        <CodeBlock>{`<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive">Delete</Button>} />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel render={<Button variant="ghost">Cancel</Button>} />
      <AlertDialogAction render={<Button variant="destructive">Delete</Button>} />
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Identical to Dialog — <code>depth.modal</code> entrance with{" "}
          <code>springs.surface</code> and a fading backdrop. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Unlike Dialog, it does not dismiss on backdrop click or Escape by
          accident-prone paths — the user must pick Cancel or the action. Focus
          is trapped and restored.
        </p>
      </Section>
    </main>
  )
}
