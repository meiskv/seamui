import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SidebarDemo from "@/registry/seam/examples/sidebar-demo"
import SidebarSessions from "@/registry/seam/examples/sidebar-sessions"
import SidebarCollapse from "@/registry/seam/examples/sidebar-collapse"

export const metadata: Metadata = {
  title: "Sidebar — seamui",
  description:
    "Collapsible app sidebar — a recessed well the active session rises out of; ⌘B rail collapse.",
}

export default function SidebarDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Sidebar</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The left rail of an agent workbench. The panel is the seam well at app
        scale — a recessed muted surface — and the active row rises out of it as
        an embossed key. <kbd>⌘B</kbd> collapses it to an icon rail.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <SidebarDemo />,
            code: exampleSource("sidebar-demo"),
          },
          {
            key: "sessions",
            title: "Status-grouped sessions",
            component: <SidebarSessions />,
            code: exampleSource("sidebar-sessions"),
          },
          {
            key: "collapse",
            title: "Rail collapse",
            component: <SidebarCollapse />,
            code: exampleSource("sidebar-collapse"),
          },
        ]}
      />

      <Install name="sidebar" />

      <Notes>
        <li>
          Collapse animates <code>width</code> — a layout dimension that
          can&apos;t spring cleanly — with an eased CSS transition; labels fade
          on the same clock via <code>SidebarLabel</code>. Both are suppressed
          under reduced motion (<code>motion-reduce:transition-none</code>), so
          the rail jumps instead of lurching.
        </li>
        <li>
          <code>⌘/Ctrl+B</code> toggles from anywhere inside the provider (the
          Superset shortcut); <code>SidebarTrigger</code> is a real seamui{" "}
          <code>Button</code> with <code>aria-expanded</code>.
        </li>
        <li>
          Status-grouping is composition, not configuration: one{" "}
          <code>SidebarGroup</code> per agent-status bucket, loudest first, with{" "}
          <code>count</code> on the group label.
        </li>
        <li>
          The provider carries{" "}
          <code>data-state=&quot;expanded&quot; | &quot;collapsed&quot;</code>;
          anything inside can style off{" "}
          <code>group-data-[state=collapsed]/sidebar:*</code>.
        </li>
      </Notes>
    </main>
  )
}
