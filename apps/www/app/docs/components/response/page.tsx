import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ResponseDemo from "@/registry/seam/examples/response-demo"
import ResponseStreaming from "@/registry/seam/examples/response-streaming"
import ResponseCode from "@/registry/seam/examples/response-code"

export const metadata: Metadata = {
  title: "Response — seamui",
  description:
    "Streaming-safe markdown renderer that hardens incomplete blocks.",
}

export default function ResponseDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Response</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Renders an assistant&apos;s markdown as flat seam prose — hardened so a
        half-arrived response never flashes broken markup mid-stream.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ResponseDemo />,
            code: exampleSource("response-demo"),
          },
          {
            key: "streaming",
            title: "Streaming",
            component: <ResponseStreaming />,
            code: exampleSource("response-streaming"),
          },
          {
            key: "code",
            title: "Code & tables",
            component: <ResponseCode />,
            code: exampleSource("response-code"),
          },
        ]}
      />

      <Install name="response" />

      <ApiTable
        rows={[
          {
            prop: "children",
            type: "string",
            desc: "The (possibly incomplete) markdown as the only child — pass the streaming message text directly.",
          },
          {
            prop: "className",
            type: "string",
            desc: "Merged onto the prose container.",
          },
        ]}
        footer={
          <>
            Plus all native <code>&lt;div&gt;</code> props except{" "}
            <code>children</code>, which must be a string.
          </>
        }
      />

      <Notes>
        <li>
          Built on <code>react-markdown</code> + <code>remark-gfm</code>; an
          unterminated code fence is auto-closed each frame, so streaming tokens
          stay renderable and never flash broken markup.
        </li>
        <li>
          Static by design: streamed text appends with no per-character
          animation (explicitly forbidden in seamui) and no layout springs — the
          sense of life comes from the Conversation viewport following along,
          which makes the reduced-motion story trivial.
        </li>
        <li>
          Fenced code renders through the seam <code>code-block</code> component
          (well, copy key, highlighting); inline code stays a debossed chip.
          Links open in a new tab with <code>rel=&quot;noreferrer&quot;</code>;
          wide code and tables scroll in their own containers.
        </li>
        <li>
          Semantic HTML is preserved (headings, lists, tables). Announcement of
          streamed content is the Conversation&apos;s responsibility, so
          Response stays quiet to avoid double-announcing.
        </li>
      </Notes>
    </main>
  )
}
