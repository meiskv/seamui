"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { NAV } from "./nav-items"

export function NavList() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6">
      {NAV.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <div className="text-muted-foreground px-2 pb-1 text-xs font-medium uppercase tracking-wide">
            {group.title}
          </div>
          {group.items.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring/50",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
