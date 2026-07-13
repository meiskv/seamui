import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import PlanCardDemo from "@/registry/seam/examples/plan-card-demo"
import PlanCardProgress from "@/registry/seam/examples/plan-card-progress"

export const metadata: Metadata = {
  title: "Plan Card — seamui",
  description:
    "Plan approval with a step checklist, plus the checkpoint-restore strip for the timeline.",
}

export default function PlanCardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Plan Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Plan mode&apos;s moment of trust: the agent proposes, you inspect and
        approve. The same card renders live execution afterwards — steps flip to
        done — and <code>PlanCardCheckpoint</code> is the settled timeline strip
        with a Restore key.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Proposal",
            component: <PlanCardDemo />,
            code: exampleSource("plan-card-demo"),
          },
          {
            key: "progress",
            title: "Executing + checkpoint",
            component: <PlanCardProgress />,
            code: exampleSource("plan-card-progress"),
          },
        ]}
      />

      <Install name="plan-card" />

      <Notes>
        <li>
          The proposal is a raised key; steps are a semantic{" "}
          <code>&lt;ol&gt;</code> flat inside it; the checkpoint strip is
          debossed muted — settled history, not a demand. Deciding settles the
          card into a receipt, announced politely.
        </li>
        <li>
          Controlled: <code>onApprove()</code> / <code>onReject()</code> out,{" "}
          <code>decision</code> in; step progress is your state via the{" "}
          <code>done</code> prop. Done steps swap their number for a check,
          mute, and announce as &ldquo;(completed)&rdquo;.
        </li>
        <li>
          Pairs with <code>tool</code> for the steps&apos; execution details and{" "}
          <code>permission-card</code> for approvals that arise mid-plan.
        </li>
      </Notes>
    </main>
  )
}
