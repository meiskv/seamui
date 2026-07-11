import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CodeBlockDemo from "@/registry/seam/examples/code-block-demo"
import CodeBlockCopy from "@/registry/seam/examples/code-block-copy"
import CodeBlockLongLines from "@/registry/seam/examples/code-block-long-lines"

export const metadata: Metadata = {
  title: "Code Block — seamui",
  description: "Highlighted code in a debossed well, with a copy key.",
}

export default function CodeBlockDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Code Block</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Code is content you look <em>into</em>, so the block is a debossed well
        with the copy key embossed in its header. Syntax highlighting resolves
        asynchronously — until it does, the raw text renders, so a streaming
        fence is never blank and never breaks.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <CodeBlockDemo />,
            code: exampleSource("code-block-demo"),
          },
          {
            key: "copy",
            title: "Copy",
            component: <CodeBlockCopy />,
            code: exampleSource("code-block-copy"),
          },
          {
            key: "long-lines",
            title: "Long lines",
            component: <CodeBlockLongLines />,
            code: exampleSource("code-block-long-lines"),
          },
        ]}
      />

      <Install name="code-block" />

      <Notes>
        <li>
          Highlighting uses Shiki in dual-theme mode, so the same markup adapts
          to light and dark without shipping a second payload. Pass{" "}
          <code>showHeader=&#123;false&#125;</code> for a bare block.
        </li>
        <li>
          No entrance of its own — it enters with its parent message. The only
          motion is the copy confirmation, an opacity crossfade to a check and
          back, so it&apos;s identical under reduced motion; press feedback on
          the copy key is inherited from Button.
        </li>
        <li>
          The copy key&apos;s <code>aria-label</code> flips to
          &ldquo;Copied&rdquo; on success; copy falls back to a silent no-op in
          insecure contexts where the clipboard API is unavailable.
        </li>
        <li>
          The scrollable code region is keyboard-focusable, so a wide block can
          be scrolled without a mouse.
        </li>
      </Notes>
    </main>
  )
}
