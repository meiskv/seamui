import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TerminalBlockDemo from "@/registry/seam/examples/terminal-block-demo"
import TerminalBlockStates from "@/registry/seam/examples/terminal-block-states"

export const metadata: Metadata = {
  title: "Terminal Block — seamui",
  description:
    "Command output in a debossed well with a live agent-status chip and copy key.",
}

export default function TerminalBlockDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Terminal Block</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The code-block sibling for command output: the command and its live
        status in the header, the output carved into a well below. A thread and
        review element — output arrives as props, not from a live PTY.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <TerminalBlockDemo />,
            code: exampleSource("terminal-block-demo"),
          },
          {
            key: "states",
            title: "States",
            component: <TerminalBlockStates />,
            code: exampleSource("terminal-block-states"),
          },
        ]}
      />

      <Install name="terminal-block" />

      <Notes>
        <li>
          Status is the shared <code>agent-status</code> vocabulary —{" "}
          <code>working</code> shows a pulsing cursor at the output tail (CSS{" "}
          <code>animate-pulse</code>, opacity-only, identical under reduced
          motion); <code>waiting</code> means the process needs input.
        </li>
        <li>
          The copy key copies <code>copyText</code> (defaulting to string
          children) with the standard icon crossfade; the output region is
          keyboard-scrollable like code-block.
        </li>
        <li>
          ANSI handling is deliberately out of scope — pre-process escape codes
          upstream and pass plain text or your own nodes.
        </li>
      </Notes>
    </main>
  )
}
