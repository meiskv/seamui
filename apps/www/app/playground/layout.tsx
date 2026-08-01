import type * as React from "react"
import Link from "next/link"

import { SeamMark } from "@/components/site/logo"
import { ReducedMotionNotice } from "@/components/site/reduced-motion-notice"
import { ThemeToggle } from "@/components/site/theme-toggle"

/**
 * The playground runs full-bleed rather than inside `DocsShell` — it needs
 * three panes, and the docs shell clamps its content to `max-w-6xl`.
 */
export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <SeamMark className="size-5" />
            seamui
          </Link>
          <span className="text-muted-foreground text-sm">Playground</span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/docs/components"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Docs
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="px-4">
        <ReducedMotionNotice />
      </div>

      {children}
    </div>
  )
}
