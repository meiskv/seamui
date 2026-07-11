import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SkeletonDemo from "@/registry/seam/examples/skeleton-demo"

export const metadata: Metadata = {
  title: "Skeleton — seamui",
  description: "Loading placeholder well with an opacity-only pulse.",
}

export default function SkeletonDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Skeleton</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A placeholder for loading content — a shallow well carved into the
        surface where the real element will land, pulsing gently while it
        waits.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <SkeletonDemo />, code: exampleSource("skeleton-demo") },
        ]}
      />

      <Install name="skeleton" />

      <Notes>
        <li>
          The pulse is opacity-only, so it stays on under reduced motion —
          loading feedback never goes dead, it just doesn&apos;t travel.
        </li>
        <li>
          Renders a plain <code>&lt;div&gt;</code> with no announced content;
          set <code>aria-busy</code> on the loading region and announce
          completion there, rather than labeling individual skeletons.
        </li>
      </Notes>
    </main>
  )
}
