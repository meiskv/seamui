import * as React from "react"

export function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  )
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-card overflow-x-auto rounded-lg border p-3 text-sm">
      <code>{children}</code>
    </pre>
  )
}

export function Install({ name }: { name: string }) {
  return (
    <Section title="Installation">
      <p className="text-muted-foreground text-sm">With the seamui CLI:</p>
      <CodeBlock>{`bunx --bun seamui@latest add ${name}`}</CodeBlock>
      <p className="text-muted-foreground text-sm">Or the shadcn CLI:</p>
      <CodeBlock>{`bunx --bun shadcn@latest add @seamui/${name}`}</CodeBlock>
    </Section>
  )
}
