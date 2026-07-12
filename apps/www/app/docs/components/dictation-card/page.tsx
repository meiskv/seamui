import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DictationCardDemo from "@/registry/seam/examples/dictation-card-demo"
import DictationCardReview from "@/registry/seam/examples/dictation-card-review"

export const metadata: Metadata = {
  title: "Dictation Card — seamui",
  description:
    "Waveform + live editable transcript + confirm/cancel — dictation as a review step in the composer well.",
}

export default function DictationCardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dictation Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Speech lands as live, <em>editable</em> text in a card inside the
        composer well, with explicit ✓/✕ — a review step instead of auto-send on
        silence. The card is a raised key in the entry well: a draft token not
        yet committed.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Listening",
            component: <DictationCardDemo />,
            code: exampleSource("dictation-card-demo"),
          },
          {
            key: "review",
            title: "Reviewing",
            component: <DictationCardReview />,
            code: exampleSource("dictation-card-review"),
          },
        ]}
      />

      <Install name="dictation-card" />

      <Notes>
        <li>
          Transport-agnostic: no STT engine inside. Stream your transcript into{" "}
          <code>value</code>, the mic level into <code>level</code> (or hand the
          visualizer a <code>track</code>); get <code>onConfirm(value)</code> /{" "}
          <code>onCancel</code> out. Confirm stays disabled while the transcript
          is empty.
        </li>
        <li>
          The transcript is a real textarea — focusable, editable, announced as
          &ldquo;Dictated text (editable)&rdquo; — inside a labeled
          &ldquo;Dictation&rdquo; group. The visualizer keeps its{" "}
          <code>role=&quot;status&quot;</code> state label, and its motion (with
          the reduced-motion variant) comes from <code>voice-visualizer</code>.
        </li>
        <li>
          Pairs with the voice suite: <code>media-toggle</code> for the mic key,{" "}
          <code>voice-control-bar</code> for the call surface — this card is
          only the transcription moment.
        </li>
      </Notes>
    </main>
  )
}
