import type * as React from "react"
import { ArrowRight, Download, Plus, Sparkles } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

const ICONS = {
  none: null,
  sparkles: Sparkles,
  arrow: ArrowRight,
  plus: Plus,
  download: Download,
} as const

const ICON_NAMES: Record<string, string> = {
  sparkles: "Sparkles",
  arrow: "ArrowRight",
  plus: "Plus",
  download: "Download",
}

export const buttonSpec: PlaygroundSpec = {
  id: "button",
  title: "Button",
  group: "Forms",
  description:
    "The foundation key. Every button-shaped control in seamui wears these variants.",
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
        { value: "ghost", label: "Ghost" },
        { value: "destructive", label: "Destructive" },
        { value: "link", label: "Link" },
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
        { value: "icon", label: "Icon" },
      ],
    },
    {
      id: "icon",
      label: "Icon",
      kind: "enum",
      default: "none",
      options: [
        { value: "none", label: "None" },
        { value: "sparkles", label: "Sparkles" },
        { value: "arrow", label: "Arrow" },
        { value: "plus", label: "Plus" },
        { value: "download", label: "Download" },
      ],
    },
    {
      id: "label",
      label: "Label",
      kind: "text",
      default: "Get started",
      // An icon-only key has no room for a label — it becomes the aria-label.
      when: (v) => v.size !== "icon",
    },
    { id: "disabled", label: "Disabled", kind: "boolean", default: false },
    {
      id: "haptic",
      label: "Haptic on press",
      kind: "boolean",
      default: true,
      group: "Feedback",
    },
  ],

  render(values) {
    const size = str(values, "size")
    const label = str(values, "label")
    const Icon = ICONS[str(values, "icon") as keyof typeof ICONS]
    const iconOnly = size === "icon"

    return (
      <Button
        variant={
          str(values, "variant") as React.ComponentProps<
            typeof Button
          >["variant"]
        }
        size={size as React.ComponentProps<typeof Button>["size"]}
        disabled={bool(values, "disabled")}
        haptic={bool(values, "haptic")}
        aria-label={iconOnly ? label || "Action" : undefined}
      >
        {Icon ? <Icon /> : null}
        {iconOnly ? null : label}
      </Button>
    )
  },

  code(values) {
    const variant = str(values, "variant")
    const size = str(values, "size")
    const icon = str(values, "icon")
    const label = str(values, "label")
    const iconOnly = size === "icon"
    const iconName = ICON_NAMES[icon]

    const head = imports({
      "lucide-react": iconName ? [iconName] : [],
      "@/components/ui/button": ["Button"],
    })

    const props = attrs([
      ["variant", variant === "default" ? undefined : variant],
      ["size", size === "default" ? undefined : size],
      ["disabled", bool(values, "disabled")],
      ["haptic", bool(values, "haptic") ? undefined : false],
      ["aria-label", iconOnly ? label || "Action" : undefined],
    ])

    const children = [
      iconName ? `  <${iconName} />` : null,
      iconOnly ? null : `  ${label}`,
    ].filter(Boolean)

    const body = children.length
      ? `<Button${props}>\n${children.join("\n")}\n</Button>`
      : `<Button${props} />`

    return snippet(head, body)
  },
}
