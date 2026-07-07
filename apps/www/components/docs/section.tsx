import * as React from "react"

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

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted squircle shadow-well overflow-x-auto rounded-lg px-3 py-2.5 text-[0.8125rem] leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

export function Install({ name }: { name: string }) {
  return (
    <Section title="Installation">
      <CodeBlock>{`# seamui CLI
bunx --bun seamui@latest add ${name}

# or the shadcn CLI
bunx --bun shadcn@latest add @seamui/${name}`}</CodeBlock>
    </Section>
  )
}
