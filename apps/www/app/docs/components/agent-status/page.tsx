import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AgentStatusDemo from "@/registry/seam/examples/agent-status-demo"
import AgentStatusDots from "@/registry/seam/examples/agent-status-dots"
import AgentStatusLive from "@/registry/seam/examples/agent-status-live"

export const metadata: Metadata = {
  title: "Agent Status — seamui",
  description:
    "The canonical agent-state indicator — waiting/working/ready/done/error, as dot or chip.",
}

export default function AgentStatusDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Agent Status</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The agent-era state machine, encoded once:{" "}
        <em>waiting on you / working / ready to review / done / error</em>.
        Session sidebars, headers, hover cards, and terminal blocks all compose
        this instead of inventing their own status dots.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Chips",
            component: <AgentStatusDemo />,
            code: exampleSource("agent-status-demo"),
          },
          {
            key: "dots",
            title: "Dots in a list",
            component: <AgentStatusDots />,
            code: exampleSource("agent-status-dots"),
          },
          {
            key: "live",
            title: "Live changes",
            component: <AgentStatusLive />,
            code: exampleSource("agent-status-live"),
          },
        ]}
      />

      <Install name="agent-status" />

      <Notes>
        <li>
          The theme is monochrome, so state reads through shape and animation,
          not hue: <code>waiting</code> is filled with an attention halo,{" "}
          <code>working</code> pulses, <code>ready</code> is hollow,{" "}
          <code>done</code> is faint, <code>error</code> is the one sanctioned
          color. Distinct without color vision by construction.
        </li>
        <li>
          The working pulse is CSS <code>animate-pulse</code> — the Spinner
          precedent for ambient loops. It&apos;s opacity-only, so it reads
          identically under reduced motion; the feedback never goes dead.
        </li>
        <li>
          The chip is <code>aria-live=&quot;polite&quot;</code>, so a state
          change is announced without interrupting. A standalone dot with an{" "}
          <code>aria-label</code> becomes <code>role=&quot;status&quot;</code>;
          without one it stays decorative (<code>aria-hidden</code>) next to
          visible text.
        </li>
        <li>
          Both forms carry <code>data-status</code> for styling hooks — e.g.
          group sidebar sections with{" "}
          <code>data-[status=waiting]:order-first</code>.
        </li>
      </Notes>
    </main>
  )
}
