import type * as React from "react"
import { Check } from "lucide-react"

import { Badge } from "@/registry/seam/ui/badge"
import { attrs, imports } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

export const badgeSpec: PlaygroundSpec = {
  id: "badge",
  title: "Badge",
  group: "Display",
  blurb:
    "A miniature key. `muted` is the debossed one — carved in for quiet status.",
  controls: [
    {
      id: "variant",
      label: "Variant",
      group: "Badge",
      type: "enum",
      default: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "secondary", label: "Secondary" },
        { value: "outline", label: "Outline" },
        { value: "destructive", label: "Destructive" },
        { value: "muted", label: "Muted (debossed)" },
      ],
    },
    {
      id: "label",
      label: "Label",
      group: "Badge",
      type: "text",
      default: "Shipped",
    },
    {
      id: "icon",
      label: "Icon",
      group: "Badge",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => {
    const variant = str(state, "variant", "default") as React.ComponentProps<
      typeof Badge
    >["variant"]
    return (
      <Badge variant={variant}>
        {bool(state, "icon") ? <Check /> : null}
        {str(state, "label", "Shipped")}
      </Badge>
    )
  },

  code: (state) => {
    const variant = str(state, "variant", "default")
    const label = str(state, "label", "Shipped")
    const icon = bool(state, "icon")

    const head = imports({
      "lucide-react": icon ? ["Check"] : [],
      "@/components/ui/badge": ["Badge"],
    })
    const props = attrs([["variant", variant !== "default" && variant]])
    const children = icon ? `  <Check />\n  ${label}` : `  ${label}`

    return `${head}\n\n<Badge${props}>\n${children}\n</Badge>\n`
  },
}
