"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/registry/seam/ui/drawer"
import { SeamMark } from "./logo"
import { NavList } from "./nav-list"
import { ReducedMotionNotice } from "./reduced-motion-notice"
import { ThemeToggle } from "./theme-toggle"

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()

  // Close the mobile drawer whenever navigation happens.
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen">
      <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
          {/* Mobile nav — dogfoods the seamui Drawer (bottom sheet). */}
          <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
            <DrawerTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation"
                >
                  <Menu />
                </Button>
              }
            />
            <DrawerContent className="max-h-[80vh]">
              <div className="overflow-y-auto pb-4">
                <NavList />
              </div>
            </DrawerContent>
          </Drawer>

          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <SeamMark className="size-5" />
            seamui
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r p-4 md:block">
          <NavList />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="px-4">
            <ReducedMotionNotice />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
