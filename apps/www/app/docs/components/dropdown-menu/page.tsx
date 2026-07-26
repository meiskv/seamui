import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DropdownMenuDemo from "@/registry/seam/examples/dropdown-menu-demo"
import DropdownMenuCheckboxes from "@/registry/seam/examples/dropdown-menu-checkboxes"
import DropdownMenuRadio from "@/registry/seam/examples/dropdown-menu-radio"
import DropdownMenuSubmenu from "@/registry/seam/examples/dropdown-menu-submenu"
import DropdownMenuNested from "@/registry/seam/examples/dropdown-menu-nested"
import DropdownMenuShortcuts from "@/registry/seam/examples/dropdown-menu-shortcuts"

export const metadata: Metadata = {
  title: "Dropdown Menu — seamui",
  description:
    "Dropdown menu built on Base UI with seam overlay-depth entrance.",
}

export default function DropdownMenuDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dropdown Menu</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A menu of actions triggered by a button. Rises with overlay depth; items
        highlight on hover and keyboard navigation. Submenus nest{" "}
        <em>inside</em> the popup rather than flying out beside it, so depth is
        unlimited and costs no horizontal room.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <DropdownMenuDemo />,
            code: exampleSource("dropdown-menu-demo"),
          },
          {
            key: "checkboxes",
            title: "Checkboxes",
            component: <DropdownMenuCheckboxes />,
            code: exampleSource("dropdown-menu-checkboxes"),
          },
          {
            key: "radio",
            title: "Radio group",
            component: <DropdownMenuRadio />,
            code: exampleSource("dropdown-menu-radio"),
          },
          {
            key: "submenu",
            title: "Submenu",
            component: <DropdownMenuSubmenu />,
            code: exampleSource("dropdown-menu-submenu"),
          },
          {
            key: "nested",
            title: "Nested",
            component: <DropdownMenuNested />,
            code: exampleSource("dropdown-menu-nested"),
          },
          {
            key: "shortcuts",
            title: "Shortcuts",
            component: <DropdownMenuShortcuts />,
            code: exampleSource("dropdown-menu-shortcuts"),
          },
        ]}
      />

      <Install name="dropdown-menu" />

      <Notes>
        <li>
          Full keyboard support — arrows, Home/End, typeahead, Escape — with{" "}
          <code>role=&quot;menu&quot;</code> semantics; Base UI handles
          positioning and collision.
        </li>
        <li>
          Submenus drill in place: the level replaces the one below it and the
          popup springs to the new size. Levels you drill past keep their state,
          so an uncontrolled checkbox or radio group is still set the way you
          left it when you come back. Nesting is unlimited — a{" "}
          <code>DropdownMenuSub</code> inside a{" "}
          <code>DropdownMenuSubContent</code> is just the next level.
        </li>
        <li>
          Every nested level opens with a back row labelled from its trigger.
          ArrowRight or Enter drills in; ArrowLeft, Escape, or the back row
          steps out, returning focus to the trigger you left through. Escape
          only closes the menu once you are back at the root.
        </li>
        <li>
          Checkbox and radio items ship in the same file when a menu needs
          selectable state.
        </li>
      </Notes>
    </main>
  )
}
