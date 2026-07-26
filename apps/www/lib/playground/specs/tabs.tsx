import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"
import { attrs, imports, snippet } from "../code"
import { bool, num, str, type PlaygroundSpec } from "../types"

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
  { value: "billing", label: "Billing" },
] as const

export const tabsSpec: PlaygroundSpec = {
  id: "tabs",
  title: "Tabs",
  group: "Layout",
  description:
    "A debossed well holding embossed keys; the active indicator springs between them.",
  stageClassName: "w-full",
  knobs: [
    {
      id: "size",
      label: "Size",
      kind: "enum",
      default: "default",
      options: [
        { value: "sm", label: "Small" },
        { value: "default", label: "Default" },
      ],
    },
    { id: "count", label: "Tabs", kind: "number", default: 3, min: 2, max: 4 },
    { id: "panel", label: "Show panel", kind: "boolean", default: true },
  ],

  render(values) {
    const count = Math.min(TABS.length, Math.max(2, num(values, "count")))
    const items = TABS.slice(0, count)
    const showPanel = bool(values, "panel")

    return (
      <Tabs
        defaultValue={items[0].value}
        size={str(values, "size") as "default" | "sm"}
      >
        <TabsList>
          {items.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {showPanel
          ? items.map((t) => (
              <TabsContent
                key={t.value}
                value={t.value}
                className="text-muted-foreground py-2 text-sm"
              >
                {t.label} panel content.
              </TabsContent>
            ))
          : null}
      </Tabs>
    )
  },

  code(values) {
    const size = str(values, "size")
    const count = Math.min(TABS.length, Math.max(2, num(values, "count")))
    const items = TABS.slice(0, count)
    const showPanel = bool(values, "panel")

    const head = imports({
      "@/components/ui/tabs": [
        "Tabs",
        "TabsList",
        "TabsTrigger",
        ...(showPanel ? ["TabsContent"] : []),
      ],
    })

    const rootProps = attrs([
      ["defaultValue", items[0].value],
      ["size", size === "default" ? undefined : size],
    ])

    const triggers = items
      .map(
        (t) => `    <TabsTrigger value="${t.value}">${t.label}</TabsTrigger>`
      )
      .join("\n")

    const panels = showPanel
      ? items
          .map(
            (t) =>
              `  <TabsContent value="${t.value}">${t.label} panel content.</TabsContent>`
          )
          .join("\n")
      : null

    const body = [
      `<Tabs${rootProps}>`,
      `  <TabsList>`,
      triggers,
      `  </TabsList>`,
      panels,
      `</Tabs>`,
    ]
      .filter(Boolean)
      .join("\n")

    return snippet(head, body)
  },
}
