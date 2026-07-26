import type * as React from "react"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/seam/ui/alert"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

const ICONS = {
  none: null,
  info: Info,
  warning: TriangleAlert,
  success: CircleCheck,
  error: CircleAlert,
} as const

const ICON_NAMES: Record<string, string> = {
  info: "Info",
  warning: "TriangleAlert",
  success: "CircleCheck",
  error: "CircleAlert",
}

export const alertSpec: PlaygroundSpec = {
  id: "alert",
  title: "Alert",
  group: "Feedback",
  description:
    "The persistent counterpart to toast — state carved into the page, so it reads as a debossed well rather than a raised key.",
  stageClassName: "w-full",
  knobs: [
    {
      id: "variant",
      label: "Variant",
      kind: "enum",
      default: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "destructive", label: "Destructive" },
      ],
    },
    {
      id: "icon",
      label: "Icon",
      kind: "enum",
      default: "info",
      options: [
        { value: "none", label: "None" },
        { value: "info", label: "Info" },
        { value: "warning", label: "Warning" },
        { value: "success", label: "Success" },
        { value: "error", label: "Error" },
      ],
    },
    {
      id: "title",
      label: "Title",
      kind: "text",
      default: "Heads up",
    },
    {
      id: "description",
      label: "Description",
      kind: "boolean",
      default: true,
    },
    {
      id: "body",
      label: "Body",
      kind: "text",
      default: "Your changes are saved locally until you publish.",
      when: (v) => v.description === true,
    },
  ],

  render(values) {
    const Icon = ICONS[str(values, "icon") as keyof typeof ICONS]
    return (
      <div className="w-full max-w-md">
        <Alert
          variant={
            str(values, "variant") as React.ComponentProps<
              typeof Alert
            >["variant"]
          }
        >
          {Icon ? <Icon /> : null}
          <AlertTitle>{str(values, "title")}</AlertTitle>
          {bool(values, "description") ? (
            <AlertDescription>{str(values, "body")}</AlertDescription>
          ) : null}
        </Alert>
      </div>
    )
  },

  code(values) {
    const variant = str(values, "variant")
    const iconName = ICON_NAMES[str(values, "icon")]
    const withDescription = bool(values, "description")

    const head = imports({
      "lucide-react": iconName ? [iconName] : [],
      "@/components/ui/alert": [
        "Alert",
        "AlertTitle",
        ...(withDescription ? ["AlertDescription"] : []),
      ],
    })

    const props = attrs([
      ["variant", variant === "default" ? undefined : variant],
    ])

    const lines = [
      `<Alert${props}>`,
      iconName ? `  <${iconName} />` : null,
      `  <AlertTitle>${str(values, "title")}</AlertTitle>`,
      withDescription
        ? `  <AlertDescription>${str(values, "body")}</AlertDescription>`
        : null,
      `</Alert>`,
    ].filter(Boolean)

    return snippet(head, lines.join("\n"))
  },
}
