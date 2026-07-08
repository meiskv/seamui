import Link from "next/link"

import { Button } from "@/registry/seam/ui/button"
import ButtonVariants from "@/registry/seam/examples/button-variants"
import { HapticButtons } from "@/components/site/haptic-buttons"
import { ThemeToggle } from "@/components/site/theme-toggle"

export default function HomePage() {
  return (
    <>
      <header className="mx-auto flex h-14 max-w-2xl items-center justify-end px-6">
        <ThemeToggle />
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col items-start justify-center gap-8 px-6 pb-24">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">seamui</h1>
        <p className="text-muted-foreground text-lg">
          Beautifully animated components you own. shadcn&apos;s distribution
          model, rebuilt on Base UI primitives with a motion.dev animation layer
          designed around mobile principles — springs, touch feedback, and
          depth.
        </p>
      </div>

      <div className="squircle bg-muted/60 shadow-well w-full space-y-2 rounded-lg p-4">
        <span className="bg-secondary text-secondary-foreground shadow-resting squircle inline-flex rounded-md px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide uppercase">
          WIP
        </span>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Next: bringing seamui to <strong className="text-foreground font-medium">Expo / React Native</strong> —
          porting the spring, touch-feedback, and depth system to native, with
          real on-device haptics. In active development.
        </p>
      </div>

      <div className="bg-card w-full rounded-xl border p-8 shadow-resting">
        <ButtonVariants />
      </div>

      <div className="squircle bg-card w-full space-y-4 rounded-xl border p-8 shadow-resting">
        <div className="flex items-center gap-2">
          <span className="bg-secondary text-secondary-foreground shadow-resting squircle inline-flex rounded-md px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide uppercase">
            WIP
          </span>
          <h2 className="text-sm font-medium">Spring touch + haptics</h2>
        </div>
        <HapticButtons />
      </div>

      <div className="flex items-center gap-3">
        <Button render={<Link href="/docs/components/button" />}>
          Get started
        </Button>
      </div>
      </main>
    </>
  )
}
