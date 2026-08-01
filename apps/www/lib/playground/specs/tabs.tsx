import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"
import { attrs, imports, lines } from "../codegen"
import { bool, num, str, type PlaygroundSpec } from "../types"

const TABS = [
  { value: "account", label: "Account", body: "Manage your account." },
  { value: "password", label: "Password", body: "Change your password here." },
  { value: "team", label: "Team", body: "Invite and manage your team." },
  { value: "billing", label: "Billing", body: "Plans, invoices, and seats." },
  { value: "advanced", label: "Advanced", body: "Flags and danger zone." },
]

export const tabsSpec: PlaygroundSpec = {
  id: "tabs",
  title: "Tabs",
  group: "Layout",
  blurb:
    "A debossed well; the active tab rises out of it as an embossed key that springs between positions.",
  controls: [
    {
      id: "size",
      label: "Size",
      group: "Tabs",
      type: "enum",
      as: "segmented",
      default: "default",
      options: [
        { value: "sm", label: "Small" },
        { value: "default", label: "Default" },
      ],
    },
    {
      id: "count",
      label: "Tabs",
      group: "Tabs",
      type: "number",
      min: 2,
      max: 5,
      step: 1,
      default: 3,
    },
    {
      id: "content",
      label: "Show panels",
      group: "Tabs",
      type: "boolean",
      default: true,
    },
  ],

  render: (state) => {
    const size = str(state, "size", "default") as "default" | "sm"
    const count = num(state, "count", 3)
    const content = bool(state, "content", true)
    const items = TABS.slice(0, count)

    return (
      <Tabs defaultValue={items[0]?.value} size={size} className="w-80">
        <TabsList>
          {items.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {content
          ? items.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="text-muted-foreground pt-2 text-sm"
              >
                {tab.body}
              </TabsContent>
            ))
          : null}
      </Tabs>
    )
  },

  code: (state) => {
    const size = str(state, "size", "default")
    const count = num(state, "count", 3)
    const content = bool(state, "content", true)
    const items = TABS.slice(0, count)

    const head = imports({
      "@/components/ui/tabs": [
        "Tabs",
        "TabsList",
        "TabsTrigger",
        ...(content ? ["TabsContent"] : []),
      ],
    })

    const root = attrs([
      ["defaultValue", items[0]?.value ?? "account"],
      ["size", size !== "default" && size],
      ["className", "w-80"],
    ])

    const triggers = items
      .map(
        (tab) =>
          `    <TabsTrigger value="${tab.value}">${tab.label}</TabsTrigger>`
      )
      .join("\n")

    const panels = content
      ? items
          .map((tab) =>
            lines(
              `  <TabsContent`,
              `    value="${tab.value}"`,
              `    className="text-muted-foreground pt-2 text-sm"`,
              `  >`,
              `    ${tab.body}`,
              `  </TabsContent>`
            )
          )
          .join("\n")
      : null

    return `${head}\n\n${lines(
      `<Tabs${root}>`,
      "  <TabsList>",
      triggers,
      "  </TabsList>",
      panels,
      "</Tabs>"
    )}\n`
  },
}
