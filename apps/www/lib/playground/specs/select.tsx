import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"
import { attrs, imports, lines } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

const ITEMS = [
  { value: "spring", label: "Spring" },
  { value: "snappy", label: "Snappy" },
  { value: "surface", label: "Surface" },
  { value: "bouncy", label: "Bouncy" },
]

export const selectSpec: PlaygroundSpec = {
  id: "select",
  title: "Select",
  group: "Forms",
  blurb:
    "The default trigger is a debossed well you pick into; `ghost` is the naked inline form.",
  controls: [
    {
      id: "variant",
      label: "Trigger",
      group: "Select",
      type: "enum",
      as: "segmented",
      default: "default",
      options: [
        { value: "default", label: "Well" },
        { value: "ghost", label: "Ghost" },
      ],
    },
    {
      id: "placeholder",
      label: "Placeholder",
      group: "Select",
      type: "text",
      default: "Choose a transition",
    },
    {
      id: "preselected",
      label: "Preselected",
      group: "State",
      type: "boolean",
      default: false,
    },
    {
      id: "disabled",
      label: "Disabled",
      group: "State",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => {
    const variant = str(state, "variant", "default") as "default" | "ghost"
    const preselected = bool(state, "preselected")
    return (
      <Select
        key={String(preselected)}
        defaultValue={preselected ? "spring" : undefined}
        disabled={bool(state, "disabled")}
      >
        <SelectTrigger
          variant={variant}
          className={variant === "default" ? "w-52" : undefined}
        >
          <SelectValue
            placeholder={str(state, "placeholder", "Choose a transition")}
          />
        </SelectTrigger>
        <SelectContent>
          {ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },

  code: (state) => {
    const variant = str(state, "variant", "default")
    const preselected = bool(state, "preselected")
    const head = imports({
      "@/components/ui/select": [
        "Select",
        "SelectContent",
        "SelectItem",
        "SelectTrigger",
        "SelectValue",
      ],
    })

    const root = attrs([
      ["defaultValue", preselected && "spring"],
      ["disabled", bool(state, "disabled")],
    ])
    const trigger = attrs([
      ["variant", variant !== "default" && variant],
      ["className", variant === "default" && "w-52"],
    ])
    const items = ITEMS.map(
      (item) =>
        `    <SelectItem value="${item.value}">${item.label}</SelectItem>`
    ).join("\n")

    return `${head}\n\n${lines(
      `<Select${root}>`,
      `  <SelectTrigger${trigger}>`,
      `    <SelectValue placeholder="${str(state, "placeholder", "Choose a transition")}" />`,
      "  </SelectTrigger>",
      "  <SelectContent>",
      items,
      "  </SelectContent>",
      "</Select>"
    )}\n`
  },
}
