import Link from "next/link"

import { Button } from "@/registry/seam/ui/button"
import ButtonVariants from "@/registry/seam/examples/button-variants"

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center gap-8 px-6 py-24">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">seamui</h1>
        <p className="text-muted-foreground text-lg">
          Beautifully animated components you own. shadcn&apos;s distribution
          model, rebuilt on Base UI primitives with a motion.dev animation layer
          designed around mobile principles — springs, touch feedback, and
          depth.
        </p>
      </div>

      <div className="bg-card w-full rounded-xl border p-8 shadow-resting">
        <ButtonVariants />
      </div>

      <div className="flex items-center gap-3">
        <Button render={<Link href="/docs/components/button" />}>
          Get started
        </Button>
        <Button
          variant="outline"
          render={<a href="https://base-ui.com" target="_blank" rel="noreferrer" />}
        >
          Base UI
        </Button>
      </div>
    </main>
  )
}
