import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import BranchChipDemo from "@/registry/seam/examples/branch-chip-demo"
import BranchChipSync from "@/registry/seam/examples/branch-chip-sync"
import BranchChipPr from "@/registry/seam/examples/branch-chip-pr"

export const metadata: Metadata = {
  title: "Branch Chip — seamui",
  description:
    "Branch/worktree pill — press to copy, with ahead/behind counts and PR state.",
}

export default function BranchChipDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Branch Chip</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The git-shaped identity chip every agent workbench renders next to a
        session: branch name in mono, optional ahead/behind counts and PR state.
        Pressing it copies the name — the one thing you always do with a branch.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <BranchChipDemo />,
            code: exampleSource("branch-chip-demo"),
          },
          {
            key: "sync",
            title: "Ahead / behind",
            component: <BranchChipSync />,
            code: exampleSource("branch-chip-sync"),
          },
          {
            key: "pr",
            title: "PR states",
            component: <BranchChipPr />,
            code: exampleSource("branch-chip-pr"),
          },
        ]}
      />

      <Install name="branch-chip" />

      <Notes>
        <li>
          A raised key, not an entry well — it wears <code>Button</code>{" "}
          (secondary, chip-sized), so press depth, the haptic tap, and focus
          handling come from the foundation. On copy the icon crossfades{" "}
          <code>GitBranch → Check</code> on an opacity fade, identical under
          reduced motion.
        </li>
        <li>
          Set <code>copyable={"{false}"}</code> for a static chip inside an
          already-clickable row (a session item, a table cell) — it renders as a{" "}
          <code>span</code> on <code>badgeVariants</code> instead of a nested
          button.
        </li>
        <li>
          Purely presentational: <code>branch</code>, <code>ahead</code>/
          <code>behind</code>, and <code>pr</code> come in as props;{" "}
          <code>onCopy</code> reports out. No git integration is assumed.
        </li>
        <li>
          Ahead/behind is announced as &ldquo;2 ahead, 1 behind&rdquo; rather
          than as arrow glyphs; the PR segment announces number and state.
        </li>
      </Notes>
    </main>
  )
}
