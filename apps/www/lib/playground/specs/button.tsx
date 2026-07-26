import type * as React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { attrs, imports } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

export const buttonSpec: PlaygroundSpec = {
  id: "button",
  title: "Button",
  group: "Forms",
  blurb:
    "The foundation key — every button-shaped control wears these classes.",
  controls: [
    {
      id: "variant",
      label: "Variant",
      group: "Button",
      type: "enum",
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
      group: "Button",
      type: "enum",
      default: "default",
      options: [
        { value: "sm", label: "Small" },
        { value: "default", label: "Default" },
        { value: "lg", label: "Large" },
        { value: "icon", label: "Icon" },
      ],
    },
    {
      id: "label",
      label: "Label",
      group: "Button",
      type: "text",
      default: "Get started",
      // an icon-only button has no visible label — it becomes the aria-label.
      enabledWhen: (state) => str(state, "size") !== "icon",
    },
    {
      id: "icon",
      label: "Icon",
      group: "Button",
      type: "enum",
      default: "none",
      options: [
        { value: "none", label: "None" },
        { value: "leading", label: "Leading" },
        { value: "trailing", label: "Trailing" },
      ],
      enabledWhen: (state) => str(state, "size") !== "icon",
    },
    {
      id: "disabled",
      label: "Disabled",
      group: "State",
      type: "boolean",
      default: false,
    },
    {
      id: "fullWidth",
      label: "Full width",
      group: "State",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => {
    const variant = str(state, "variant", "default")
    const size = str(state, "size", "default")
    const label = str(state, "label", "Get started")
    const icon = str(state, "icon", "none")
    const disabled = bool(state, "disabled")
    const fullWidth = bool(state, "fullWidth")

    // Base UI/cva only accept their own unions; the knob state is strings.
    const variantProp = variant as React.ComponentProps<
      typeof Button
    >["variant"]
    const sizeProp = size as React.ComponentProps<typeof Button>["size"]

    if (size === "icon") {
      return (
        <Button
          variant={variantProp}
          size="icon"
          disabled={disabled}
          aria-label={label || "Continue"}
        >
          <ArrowRight />
        </Button>
      )
    }

    return (
      <Button
        variant={variantProp}
        size={sizeProp}
        disabled={disabled}
        className={fullWidth ? "w-full max-w-xs" : undefined}
      >
        {icon === "leading" ? <ArrowRight /> : null}
        {label}
        {icon === "trailing" ? <ArrowRight /> : null}
      </Button>
    )
  },

  code: (state) => {
    const variant = str(state, "variant", "default")
    const size = str(state, "size", "default")
    const label = str(state, "label", "Get started")
    const icon = str(state, "icon", "none")
    const disabled = bool(state, "disabled")
    const fullWidth = bool(state, "fullWidth")
    const withIcon = size === "icon" || icon !== "none"

    const head = imports({
      "lucide-react": withIcon ? ["ArrowRight"] : [],
      "@/components/ui/button": ["Button"],
    })

    if (size === "icon") {
      const props = attrs([
        ["variant", variant !== "default" && variant],
        ["size", "icon"],
        ["disabled", disabled],
        ["aria-label", label || "Continue"],
      ])
      return `${head}\n\n<Button${props}>\n  <ArrowRight />\n</Button>\n`
    }

    const props = attrs([
      ["variant", variant !== "default" && variant],
      ["size", size !== "default" && size],
      ["disabled", disabled],
      ["className", fullWidth && "w-full"],
    ])

    const children =
      icon === "leading"
        ? `  <ArrowRight />\n  ${label}`
        : icon === "trailing"
          ? `  ${label}\n  <ArrowRight />`
          : `  ${label}`

    return `${head}\n\n<Button${props}>\n${children}\n</Button>\n`
  },
}
