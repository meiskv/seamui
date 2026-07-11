import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ComposerDemo from "@/registry/seam/examples/composer-demo"
import ComposerStreaming from "@/registry/seam/examples/composer-streaming"
import ComposerAttachments from "@/registry/seam/examples/composer-attachments"

export const metadata: Metadata = {
  title: "Composer — seamui",
  description:
    "The prompt input — a debossed well with send/stop, attachments, and Enter-to-send.",
}

export default function ComposerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Composer</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The prompt input, and the clearest expression of the seam language: the
        whole surface is a debossed well you act into; the send key inside it is
        the embossed token that fires the action.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ComposerDemo />,
            code: exampleSource("composer-demo"),
          },
          {
            key: "streaming",
            title: "Streaming",
            component: <ComposerStreaming />,
            code: exampleSource("composer-streaming"),
          },
          {
            key: "attachments",
            title: "Attachments",
            component: <ComposerAttachments />,
            code: exampleSource("composer-attachments"),
          },
        ]}
      />

      <Install name="composer" />

      <ApiTable
        rows={[
          {
            prop: "status",
            type: `"ready" | "streaming"`,
            default: `"ready"`,
            desc: "While streaming, the submit key becomes a stop control (its type switches to button).",
          },
          {
            prop: "onStop",
            type: "() => void",
            desc: "Fired by the stop key while status is streaming.",
          },
          {
            prop: "onSubmit",
            type: "FormEventHandler",
            desc: "Composer renders a real <form>; Enter in the textarea submits it.",
          },
          {
            prop: "value / onChange",
            type: "Textarea props",
            desc: "On ComposerTextarea — the controlled text; you own the string.",
          },
          {
            prop: "onRemove",
            type: "() => void",
            desc: "On ComposerAttachment — renders a ghost remove key inside the chip.",
          },
        ]}
        footer={
          <>
            <code>ComposerTextarea</code> accepts all Textarea props;{" "}
            <code>ComposerSubmit</code> accepts all Button props.
          </>
        }
      />

      <Notes>
        <li>
          Fully controlled and transport-agnostic: you own <code>value</code>,{" "}
          <code>onSubmit</code>, and <code>status</code> — the shape maps 1:1
          onto the AI SDK&apos;s <code>useChat</code>, with no runtime
          dependency on it.
        </li>
        <li>
          <kbd>Enter</kbd> submits, <kbd>Shift</kbd>+<kbd>Enter</kbd> inserts a
          newline, and submitting via keyboard never steals focus from the
          textarea. The submit/stop control swaps its <code>aria-label</code>{" "}
          and button <code>type</code> with the status.
        </li>
        <li>
          The send/stop icon crossfades on opacity — identical under reduced
          motion. Attachment chips rise in and fall out on{" "}
          <code>springs.snappy</code>, collapsing to opacity fades under reduced
          motion.
        </li>
        <li>
          The well itself stays still — text entry is calm, with only a focus
          ring for feedback.
        </li>
      </Notes>
    </main>
  )
}
