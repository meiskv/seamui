import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import FolderShellDemo from "@/registry/seam/examples/folder-shell-demo"
import FolderShellAccent from "@/registry/seam/examples/folder-shell-accent"

export const metadata: Metadata = {
  title: "Folder Shell — seamui",
  description:
    "A flat tabbed folder silhouette that wraps a card, accented by one custom property.",
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
            key: "accent",
            title: "Accent",
            component: <FolderShellAccent />,
            code: exampleSource("folder-shell-accent"),
            description:
              "One custom property colours the whole shell — the tab and body share --folder-fill.",
          },
        ]}
        stageClassName="min-h-72"
      />

      <Install name="folder-shell" />

      <Notes>
        <li>
          A surface in its own right — write straight into it with{" "}
          <code>FolderShellTitle</code> / <code>FolderShellDescription</code>{" "}
          (or any markup). <code>action</code> sits at the top right of the
          pocket, <code>footer</code> along its foot. No card nested inside.
        </li>
        <li>
          The shape is two solid blocks — an angled tab over a full-width body —
          overlapping so they read as one silhouette; there is no stroke, so
          nothing seams. The slant is a <code>clip-path</code> on the tab alone,
          which is safe only because the folder is flat: clipping cuts off{" "}
          <code>box-shadow</code> too.
        </li>
        <li>
          Colour comes from a single custom property. Pass{" "}
          <code>
            className=&quot;[--folder-fill:var(--color-violet-500)]&quot;
          </code>{" "}
          to accent one — the tab and body share it, so there is never more than
          one value to set.
        </li>
        <li>
          Flat by design — the shell is a backdrop and carries no shadow, so the
          card in front of it stays the raised key. It has no motion of its own
          either.
        </li>
      </Notes>
    </main>
  )
}
