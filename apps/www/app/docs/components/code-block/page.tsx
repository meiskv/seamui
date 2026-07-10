import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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

      <ComponentPreview code={exampleSource("code-block-demo")}>
        <CodeBlockDemo />
      </ComponentPreview>

      <Install name="code-block" />

      <Section title="Usage">
        <CodeBlock>{`import { CodeBlock } from "@/components/ui/code-block"`}</CodeBlock>
        <CodeBlock>{`<CodeBlock code={source} language="tsx" />`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Highlighting uses Shiki in dual-theme mode, so the same markup adapts
          to light and dark without shipping a second payload. Pass{" "}
          <code>showHeader=&#123;false&#125;</code> for a bare block.
        </p>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Copy
        </h3>
        <ComponentPreview code={exampleSource("code-block-copy")}>
          <CodeBlockCopy />
        </ComponentPreview>

        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Long lines
        </h3>
        <ComponentPreview code={exampleSource("code-block-long-lines")}>
          <CodeBlockLongLines />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The block has no entrance of its own — it enters with its parent
          message. The only motion is the copy confirmation: the icon crossfades
          to a check and back on opacity, so it&apos;s identical under reduced
          motion. Press feedback on the copy key is inherited from Button.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The scrollable code region is keyboard-focusable, so a wide block can
          be scrolled without a mouse. The copy key carries an{" "}
          <code>aria-label</code> that flips to &ldquo;Copied&rdquo; on success.
          Copy falls back to a silent no-op in insecure contexts where the
          clipboard API is unavailable.
        </p>
      </Section>
    </main>
  )
}
