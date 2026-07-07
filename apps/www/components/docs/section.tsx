import * as React from "react"

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

export function Install({ name }: { name: string }) {
  return (
    <Section title="Installation">
      <InstallTabs name={name} />
    </Section>
  )
}
