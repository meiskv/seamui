import type * as React from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"
import { attrs, imports, lines } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

const ITEMS = [
  { value: "left", label: "Align left", Icon: AlignLeft, name: "AlignLeft" },
  {
    value: "center",
    label: "Align center",
    Icon: AlignCenter,
    name: "AlignCenter",
  },
  {
    value: "right",
    label: "Align right",
    Icon: AlignRight,
    name: "AlignRight",
  },
]

export const toggleGroupSpec: PlaygroundSpec = {
  id: "toggle-group",
  title: "Toggle Group",
  group: "Forms",
  blurb:
    "The signature shape: a debossed well holding embossed keys. Slot vs. token.",
  controls: [
    {
      id: "variant",
      label: "Variant",
      group: "Toggles",
      type: "enum",
      as: "segmented",
      default: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "outline", label: "Outline" },
      ],
    },
    {
      id: "size",
      label: "Size",
      group: "Toggles",
      type: "enum",
      default: "default",
      options: [
        { value: "sm", label: "Small" },
        { value: "default", label: "Default" },
        { value: "lg", label: "Large" },
      ],
    },
    {
      id: "multiple",
      label: "Multiple",
      group: "Group",
      type: "boolean",
      default: false,
    },
    {
      id: "disabled",
      label: "Disabled",
      group: "Group",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => {
    const variant = str(state, "variant", "default") as React.ComponentProps<
      typeof Toggle
    >["variant"]
    const size = str(state, "size", "default") as React.ComponentProps<
      typeof Toggle
    >["size"]
    const multiple = bool(state, "multiple")

    return (
      <ToggleGroup
        key={String(multiple)}
        defaultValue={["left"]}
        multiple={multiple}
        disabled={bool(state, "disabled")}
      >
        {ITEMS.map((item) => (
          <Toggle
            key={item.value}
            value={item.value}
            variant={variant}
            size={size}
            aria-label={item.label}
          >
            <item.Icon />
          </Toggle>
        ))}
      </ToggleGroup>
    )
  },

  code: (state) => {
    const variant = str(state, "variant", "default")
    const size = str(state, "size", "default")

    const head = imports({
      "lucide-react": ITEMS.map((item) => item.name),
      "@/components/ui/toggle": ["Toggle"],
      "@/components/ui/toggle-group": ["ToggleGroup"],
    })

    // defaultValue is an array expression, so it's written out rather than
    // passed through `attrs` (which quotes strings).
    const root = ` defaultValue={["left"]}${attrs([
      ["multiple", bool(state, "multiple")],
      ["disabled", bool(state, "disabled")],
    ])}`

    const toggles = ITEMS.map((item) =>
      lines(
        `  <Toggle${attrs([
          ["value", item.value],
          ["variant", variant !== "default" && variant],
          ["size", size !== "default" && size],
          ["aria-label", item.label],
        ])}>`,
        `    <${item.name} />`,
        "  </Toggle>"
      )
    ).join("\n")

    return `${head}\n\n${lines(
      `<ToggleGroup${root}>`,
      toggles,
      "</ToggleGroup>"
    )}\n`
  },
}
