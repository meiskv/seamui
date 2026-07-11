import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DrawerDemo from "@/registry/seam/examples/drawer-demo"
import DrawerMenu from "@/registry/seam/examples/drawer-menu"
import DrawerForm from "@/registry/seam/examples/drawer-form"

export const metadata: Metadata = {
  title: "Drawer — seamui",
  description: "Mobile bottom-sheet built on Base UI's native swipe engine.",
}

export default function DrawerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Drawer</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A bottom sheet that slides up and dismisses with a downward swipe — the
        most mobile-native surface in seamui.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <DrawerDemo />, code: exampleSource("drawer-demo") },
          { key: "menu", title: "Action sheet", component: <DrawerMenu />, code: exampleSource("drawer-menu"), description: "A list of actions — the mobile share-sheet pattern." },
          { key: "form", title: "Form", component: <DrawerForm />, code: exampleSource("drawer-form"), description: "Collect input without leaving the sheet." },
        ]}
      />

      <Install name="drawer" />

      <Notes>
        <li>
          Swipe-to-dismiss stays Base UI&apos;s native drag — a 1:1 gesture from
          the grab handle, with the backdrop dimming in proportion to the drag.
        </li>
        <li>
          The non-gesture slide rides the standalone <code>translate</code>{" "}
          property (Base UI owns <code>transform</code> for the drag) and
          self-suppresses mid-swipe so the gesture stays 1:1.
        </li>
        <li>
          Swipe is an enhancement, not the only way out — Escape and backdrop
          click dismiss too. Focus trap and scroll lock work like Dialog.
        </li>
      </Notes>
    </main>
  )
}
