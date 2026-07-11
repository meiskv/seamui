import type * as React from "react"
import Link from "next/link"

import { InstallTabs } from "./install-tabs"

export { CodeBlock } from "./code-block"

export function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-8">
      <h2 className="text-muted-foreground text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
        {title}
      </h2>
      <div className="mt-2.5 space-y-2.5">{children}</div>
    </section>
  )
}

/** Compact install row — no section heading; the command IS the content. */
export function Install({ name }: { name: string }) {
  return (
    <div className="mt-6">
      <InstallTabs name={name} />
    </div>
  )
}

/**
 * The v2 detail-page footer: everything worth knowing that isn't code, as
 * terse bullets — only facts unique to this component. Global motion and
 * accessibility policy lives once on /docs/motion and /docs/haptics, so it
 * links there instead of being restated on every page.
 */
export function Notes({ children }: { children: React.ReactNode }) {
  return (
    <Section title="Notes">
      <ul className="text-muted-foreground list-disc space-y-1.5 pl-5 text-sm">
        {children}
      </ul>
      <p className="text-muted-foreground/80 text-xs">
        Press feedback, reduced motion, and haptics follow the global policy —
        see{" "}
        <Link className="hover:text-foreground underline" href="/docs/motion">
          Motion
        </Link>{" "}
        and{" "}
        <Link className="hover:text-foreground underline" href="/docs/haptics">
          Haptics
        </Link>
        .
      </p>
    </Section>
  )
}

/** Compact prop table for the API section. */
export type ApiRow = {
  prop: string
  type: string
  default?: string
  desc: string
}

export function ApiTable({
  rows,
  footer,
}: {
  rows: ApiRow[]
  footer?: React.ReactNode
}) {
  return (
    <Section title="API">
      <div className="squircle overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground text-left text-xs">
              <th className="px-3 py-2 font-medium">Prop</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Default</th>
              <th className="px-3 py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.prop} className="border-t align-top">
                <td className="px-3 py-2 font-mono text-xs">{r.prop}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.type}</td>
                <td className="px-3 py-2 font-mono text-xs">
                  {r.default ?? "—"}
                </td>
                <td className="text-muted-foreground px-3 py-2">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer ? (
        <p className="text-muted-foreground text-sm">{footer}</p>
      ) : null}
    </Section>
  )
}
