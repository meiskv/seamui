import type * as React from "react"
import { Check, CircleAlert, Sparkles } from "lucide-react"

import { Badge } from "@/registry/seam/ui/badge"
import { attrs, imports, snippet } from "../code"
import { str, type PlaygroundSpec } from "../types"

const ICONS = {
  none: null,
  check: Check,
  sparkles: Sparkles,
  alert: CircleAlert,
} as const

const ICON_NAMES: Record<string, string> = {
  check: "Check",
  sparkles: "Sparkles",
  alert: "CircleAlert",
}

export const badgeSpec: PlaygroundSpec = {
  id: "badge",
  title: "Badge",
  group: "Display",
  description:
    "A miniature key. Embossed chips carry a resting shadow; `muted` is the debossed, passive-status counterpart.",
  knobs: [
    {
      id: "variant",
      label: "Variant",
      kind: "enum",
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
      id: "icon",
      label: "Icon",
      kind: "enum",
      default: "none",
      options: [
        { value: "none", label: "None" },
        { value: "check", label: "Check" },
        { value: "sparkles", label: "Sparkles" },
        { value: "alert", label: "Alert" },
      ],
    },
    { id: "label", label: "Label", kind: "text", default: "New" },
  ],

  render(values) {
    const Icon = ICONS[str(values, "icon") as keyof typeof ICONS]
    return (
      <Badge
        variant={
          str(values, "variant") as React.ComponentProps<
            typeof Badge
          >["variant"]
        }
      >
        {Icon ? <Icon /> : null}
        {str(values, "label")}
      </Badge>
    )
  },

  code(values) {
    const variant = str(values, "variant")
    const iconName = ICON_NAMES[str(values, "icon")]
    const label = str(values, "label")

    const head = imports({
      "lucide-react": iconName ? [iconName] : [],
      "@/components/ui/badge": ["Badge"],
    })

    const props = attrs([
      ["variant", variant === "default" ? undefined : variant],
    ])

    const children = [iconName ? `  <${iconName} />` : null, `  ${label}`]
      .filter(Boolean)
      .join("\n")

    return snippet(head, `<Badge${props}>\n${children}\n</Badge>`)
  },
}
