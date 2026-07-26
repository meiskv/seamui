import type * as React from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

const ITEMS = [
  { value: "left", label: "Align left", icon: AlignLeft, name: "AlignLeft" },
  {
    value: "center",
    label: "Align center",
    icon: AlignCenter,
    name: "AlignCenter",
  },
  {
    value: "right",
    label: "Align right",
    icon: AlignRight,
    name: "AlignRight",
  },
] as const

export const toggleGroupSpec: PlaygroundSpec = {
  id: "toggle-group",
  title: "Toggle Group",
  group: "Forms",
  description:
    "The well/key language at its purest — a debossed track holding toggles that rise as embossed keys when pressed.",
  knobs: [
    {
      id: "variant",
      label: "Item variant",
      kind: "enum",
      default: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "outline", label: "Outline" },
      ],
    },
    {
      id: "size",
      label: "Size",
      kind: "enum",
      default: "default",
      options: [
        { value: "sm", label: "Small" },
        { value: "default", label: "Default" },
        { value: "lg", label: "Large" },
      ],
    },
    {
      id: "multiple",
      label: "Allow multiple",
      kind: "boolean",
      default: false,
    },
    { id: "labels", label: "Show labels", kind: "boolean", default: false },
  ],

  render(values) {
    const variant = str(values, "variant") as React.ComponentProps<
      typeof Toggle
    >["variant"]
    const size = str(values, "size") as React.ComponentProps<
      typeof Toggle
    >["size"]
    const showLabels = bool(values, "labels")

    return (
      <ToggleGroup defaultValue={["left"]} multiple={bool(values, "multiple")}>
        {ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <Toggle
              key={item.value}
              value={item.value}
              variant={variant}
              size={size}
              aria-label={item.label}
            >
              <Icon />
              {showLabels ? item.label.replace("Align ", "") : null}
            </Toggle>
          )
        })}
      </ToggleGroup>
    )
  },

  code(values) {
    const variant = str(values, "variant")
    const size = str(values, "size")
    const multiple = bool(values, "multiple")
    const showLabels = bool(values, "labels")

    const head = imports({
      "lucide-react": ITEMS.map((i) => i.name),
      "@/components/ui/toggle": ["Toggle"],
      "@/components/ui/toggle-group": ["ToggleGroup"],
    })

    const groupProps = attrs([["multiple", multiple]])

    const items = ITEMS.map((item) => {
      const itemProps = attrs([
        ["value", item.value],
        ["variant", variant === "default" ? undefined : variant],
        ["size", size === "default" ? undefined : size],
        ["aria-label", showLabels ? undefined : item.label],
      ])
      const children = showLabels
        ? `\n    <${item.name} />\n    ${item.label.replace("Align ", "")}\n  `
        : `\n    <${item.name} />\n  `
      return `  <Toggle${itemProps}>${children}</Toggle>`
    }).join("\n")

    const body = [
      `<ToggleGroup defaultValue={["left"]}${groupProps}>`,
      items,
      `</ToggleGroup>`,
    ].join("\n")

    return snippet(head, body)
  },
}
