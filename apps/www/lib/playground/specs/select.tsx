import type * as React from "react"

import { Label } from "@/registry/seam/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

const OPTIONS = [
  { value: "icon", label: "Icon" },
  { value: "logo", label: "Logo" },
  { value: "image", label: "Image" },
  { value: "none", label: "None" },
] as const

export const selectSpec: PlaygroundSpec = {
  id: "select",
  title: "Select",
  group: "Forms",
  description:
    "A debossed trigger you pick into; the tray floats up and the chosen option rises out of it as an embossed key.",
  stageClassName: "w-full",
  knobs: [
    {
      id: "variant",
      label: "Trigger",
      kind: "enum",
      default: "default",
      options: [
        { value: "default", label: "Default (well)" },
        { value: "ghost", label: "Ghost" },
      ],
    },
    {
      id: "placeholder",
      label: "Placeholder",
      kind: "text",
      default: "Select media",
    },
    { id: "label", label: "Label", kind: "boolean", default: false },
    {
      id: "labelText",
      label: "Label text",
      kind: "text",
      default: "Media",
      when: (v) => v.label === true,
    },
    { id: "disabled", label: "Disabled", kind: "boolean", default: false },
  ],

  render(values) {
    const variant = str(values, "variant") as React.ComponentProps<
      typeof SelectTrigger
    >["variant"]
    const withLabel = bool(values, "label")

    return (
      <div className="w-full max-w-56 space-y-2">
        {withLabel ? <Label>{str(values, "labelText")}</Label> : null}
        <Select disabled={bool(values, "disabled")}>
          <SelectTrigger variant={variant}>
            <SelectValue placeholder={str(values, "placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  },

  code(values) {
    const variant = str(values, "variant")
    const withLabel = bool(values, "label")

    const head = imports({
      "@/components/ui/label": withLabel ? ["Label"] : [],
      "@/components/ui/select": [
        "Select",
        "SelectContent",
        "SelectItem",
        "SelectTrigger",
        "SelectValue",
      ],
    })

    const rootProps = attrs([["disabled", bool(values, "disabled")]])
    const triggerProps = attrs([
      ["variant", variant === "default" ? undefined : variant],
    ])

    const items = OPTIONS.map(
      (o) => `    <SelectItem value="${o.value}">${o.label}</SelectItem>`
    ).join("\n")

    const select = [
      `<Select${rootProps}>`,
      `  <SelectTrigger${triggerProps}>`,
      `    <SelectValue placeholder="${str(values, "placeholder")}" />`,
      `  </SelectTrigger>`,
      `  <SelectContent>`,
      items,
      `  </SelectContent>`,
      `</Select>`,
    ].join("\n")

    const body = withLabel
      ? [
          `<div className="space-y-2">`,
          `  <Label>${str(values, "labelText")}</Label>`,
          select
            .split("\n")
            .map((l) => `  ${l}`)
            .join("\n"),
          `</div>`,
        ].join("\n")
      : select

    return snippet(head, body)
  },
}
