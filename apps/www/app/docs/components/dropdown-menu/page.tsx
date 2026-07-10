import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DropdownMenuDemo from "@/registry/seam/examples/dropdown-menu-demo"
import DropdownMenuCheckboxes from "@/registry/seam/examples/dropdown-menu-checkboxes"
import DropdownMenuRadio from "@/registry/seam/examples/dropdown-menu-radio"
import DropdownMenuSubmenu from "@/registry/seam/examples/dropdown-menu-submenu"
import DropdownMenuShortcuts from "@/registry/seam/examples/dropdown-menu-shortcuts"

export const metadata: Metadata = {
  title: "Dropdown Menu — seamui",
  description: "Dropdown menu built on Base UI with seam overlay-depth entrance.",
}

export default function DropdownMenuDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dropdown Menu</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A menu of actions triggered by a button. Rises with overlay depth; items
        highlight on hover and keyboard navigation.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <DropdownMenuDemo />, code: exampleSource("dropdown-menu-demo") },
          { key: "checkboxes", title: "Checkboxes", component: <DropdownMenuCheckboxes />, code: exampleSource("dropdown-menu-checkboxes") },
          { key: "radio", title: "Radio group", component: <DropdownMenuRadio />, code: exampleSource("dropdown-menu-radio") },
          { key: "submenu", title: "Submenu", component: <DropdownMenuSubmenu />, code: exampleSource("dropdown-menu-submenu") },
          { key: "shortcuts", title: "Shortcuts", component: <DropdownMenuShortcuts />, code: exampleSource("dropdown-menu-shortcuts") },
        ]}
      />

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
