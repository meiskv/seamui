import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import FolderShellDemo from "@/registry/seam/examples/folder-shell-demo"
import FolderShellStacked from "@/registry/seam/examples/folder-shell-stacked"

export const metadata: Metadata = {
  title: "Folder Shell — seamui",
  description:
    "A tabbed folder silhouette that wraps a card — stackable, accented by one custom property.",
}

export default function FolderShellDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Folder Shell</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A folder silhouette drawn behind whatever you put inside it — a tabbed
        back panel that a card sits in front of, like a sheet in a physical
        folder.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <FolderShellDemo />,
            code: exampleSource("folder-shell-demo"),
          },
          {
            key: "stacked",
            title: "Stacked",
            component: <FolderShellStacked />,
            code: exampleSource("folder-shell-stacked"),
            description:
              "layers={2 | 3} offsets extra tabs behind the front one; each tints itself off the same fill.",
          },
        ]}
        stageClassName="min-h-72"
      />

      <Install name="folder-shell" />

      <Notes>
        <li>
          A wrapper, not a card — put a <code>Card</code> (or anything else)
          inside it. The shell only draws the shape and the padding that keeps
          its tab visible above the content.
        </li>
        <li>
          The notch is two solid rectangles, not a <code>clip-path</code>.
          Clipping cuts the silhouette from one box but also clips{" "}
          <code>box-shadow</code>, which would drop the folder out of the depth
          stack; two opaque shapes composite seamlessly and the wrapper&apos;s{" "}
          <code>drop-shadow</code> follows their combined alpha, so the folder
          casts one correct shadow.
        </li>
        <li>
          Colour comes from a single custom property. Pass{" "}
          <code>
            className=&quot;[--folder-fill:var(--color-violet-500)]&quot;
          </code>{" "}
          to accent one; stacked layers reuse that same fill at lower opacity,
          so you never set more than one value. They lighten rather than{" "}
          <code>color-mix</code> toward the canvas, which drifts hue in oklch —
          a violet accent came out pink.
        </li>
        <li>
          Static — no motion of its own. Depth belongs to the interactive keys
          placed inside it.
        </li>
      </Notes>
    </main>
  )
}
