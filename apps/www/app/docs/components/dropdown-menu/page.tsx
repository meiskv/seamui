import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DropdownMenuDemo from "@/registry/seam/examples/dropdown-menu-demo"

export const metadata: Metadata = {
  title: "Dropdown Menu — seamui",
  description: "Dropdown menu built on Base UI with seam overlay-depth entrance.",
}

export default function DropdownMenuDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Dropdown Menu</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A menu of actions triggered by a button. Rises with overlay depth; items
        highlight on hover and keyboard navigation.
      </p>

      <ComponentPreview code={exampleSource("dropdown-menu-demo")}>
        <DropdownMenuDemo />
      </ComponentPreview>

      <Install name="dropdown-menu" />

      <Section title="Usage">
        <CodeBlock>{`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"`}</CodeBlock>
        <CodeBlock>{`<DropdownMenu>
  <DropdownMenuTrigger render={<Button>Menu</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The popup rises from <code>depth.overlay.initial</code> with{" "}
          <code>springs.surface</code> — the same overlay pattern as Tooltip and
          Popover. Base UI handles positioning, collision, and typeahead. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Full keyboard support (arrows, Home/End, typeahead, Escape) and{" "}
          <code>role="menu"</code> semantics. Also ships checkbox and radio items
          from Base UI if you need them.
        </p>
      </Section>
    </main>
  )
}
