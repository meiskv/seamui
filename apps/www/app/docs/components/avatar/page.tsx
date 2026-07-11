import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AvatarDemo from "@/registry/seam/examples/avatar-demo"
import AvatarSizes from "@/registry/seam/examples/avatar-sizes"
import AvatarGroup from "@/registry/seam/examples/avatar-group"

export const metadata: Metadata = {
  title: "Avatar — seamui",
  description: "Avatar built on Base UI with a seam fade-in on image load.",
}

export default function AvatarDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Avatar</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        An image element with a text fallback. The image resolves in with a
        gentle fade — no layout shift, no flash of the fallback.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <AvatarDemo />, code: exampleSource("avatar-demo") },
          { key: "sizes", title: "Sizes", component: <AvatarSizes />, code: exampleSource("avatar-sizes") },
          { key: "group", title: "Group", component: <AvatarGroup />, code: exampleSource("avatar-group") },
        ]}
      />

      <Install name="avatar" />

      <Notes>
        <li>
          The image fades in with <code>fades.normal</code> once it loads —
          the fallback shows instantly in the meantime, so a resolving photo
          never pops.
        </li>
        <li>
          Always provide an <code>alt</code> on <code>AvatarImage</code> and a
          meaningful <code>AvatarFallback</code> (initials) for when the image
          fails or is still loading.
        </li>
      </Notes>
    </main>
  )
}
