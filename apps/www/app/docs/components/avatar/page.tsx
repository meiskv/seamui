import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AvatarDemo from "@/registry/seam/examples/avatar-demo"

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

      <ComponentPreview code={exampleSource("avatar-demo")}>
        <AvatarDemo />
      </ComponentPreview>

      <Install name="avatar" />

      <Section title="Usage">
        <CodeBlock>{`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`}</CodeBlock>
        <CodeBlock>{`<Avatar>
  <AvatarImage src="/me.png" alt="@me" />
  <AvatarFallback>ME</AvatarFallback>
</Avatar>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The image fades in with <code>fades.normal</code> once it loads, so
          swapping in a resolved photo never pops. The fallback shows instantly
          while loading. Honors <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Always provide an <code>alt</code> on <code>AvatarImage</code> and a
          meaningful <code>AvatarFallback</code> (initials) for when the image
          fails or is still loading.
        </p>
      </Section>
    </main>
  )
}
