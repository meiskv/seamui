import type * as React from "react"
import { Sparkles } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { attrs, imports, lines } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

/** The icon well — debossed, per the seam language: a slot, not a key. */
const MEDIA_WELL =
  "bg-muted shadow-well flex size-10 shrink-0 items-center justify-center rounded-full"
const MEDIA_IMAGE = "bg-muted shadow-well size-10 shrink-0 rounded-md squircle"

export const cardSpec: PlaygroundSpec = {
  id: "card",
  title: "Card",
  group: "Display",
  blurb: "A raised key resting on the canvas. Compose the slots you need.",
  controls: [
    {
      id: "variant",
      label: "Style",
      group: "Card",
      type: "enum",
      default: "default",
      options: [
        { value: "default", label: "Key" },
        { value: "tabbed", label: "Tabbed" },
        { value: "folder", label: "Folder" },
        { value: "well", label: "Well" },
        { value: "flat", label: "Flat" },
      ],
    },
    {
      id: "media",
      label: "Media",
      group: "Card",
      type: "enum",
      default: "icon",
      options: [
        { value: "icon", label: "Icon" },
        { value: "image", label: "Image" },
        { value: "none", label: "None" },
      ],
    },
    {
      id: "title",
      label: "Title",
      group: "Card",
      type: "text",
      default: "Fluid motion",
    },
    {
      id: "description",
      label: "Description",
      group: "Card",
      type: "boolean",
      default: true,
    },
    {
      id: "primary",
      label: "Primary button",
      group: "Actions",
      type: "boolean",
      default: true,
    },
    {
      id: "secondary",
      label: "Secondary button",
      group: "Actions",
      type: "boolean",
      default: true,
    },
    {
      id: "ghost",
      label: "Ghost button",
      group: "Actions",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => {
    const media = str(state, "media", "icon")
    const title = str(state, "title", "Fluid motion")
    const description = bool(state, "description", true)
    const primary = bool(state, "primary", true)
    const secondary = bool(state, "secondary", true)
    const ghost = bool(state, "ghost")
    const hasFooter = primary || secondary || ghost

    return (
      <Card
        variant={
          str(state, "variant", "default") as React.ComponentProps<
            typeof Card
          >["variant"]
        }
        className="w-full max-w-sm"
      >
        <CardHeader className="flex flex-row items-start gap-3">
          {media === "icon" ? (
            <div className={MEDIA_WELL}>
              <Sparkles className="text-muted-foreground size-4" />
            </div>
          ) : null}
          {media === "image" ? <div className={MEDIA_IMAGE} /> : null}
          <div className="grid gap-1.5">
            <CardTitle>{title}</CardTitle>
            {description ? (
              <CardDescription>
                Spring-tuned transitions calibrated across three tiers.
              </CardDescription>
            ) : null}
          </div>
        </CardHeader>
        {hasFooter ? (
          <CardFooter>
            {ghost ? <Button variant="ghost">Learn more</Button> : null}
            {secondary ? <Button variant="secondary">Learn more</Button> : null}
            {primary ? <Button>Get started</Button> : null}
          </CardFooter>
        ) : null}
      </Card>
    )
  },

  code: (state) => {
    const media = str(state, "media", "icon")
    const title = str(state, "title", "Fluid motion")
    const description = bool(state, "description", true)
    const primary = bool(state, "primary", true)
    const secondary = bool(state, "secondary", true)
    const ghost = bool(state, "ghost")
    const hasFooter = primary || secondary || ghost

    const head = imports({
      "lucide-react": media === "icon" ? ["Sparkles"] : [],
      "@/components/ui/button": hasFooter ? ["Button"] : [],
      "@/components/ui/card": [
        "Card",
        "CardHeader",
        "CardTitle",
        ...(description ? ["CardDescription"] : []),
        ...(hasFooter ? ["CardFooter"] : []),
      ],
    })

    const mediaBlock =
      media === "icon"
        ? `    <div className="${MEDIA_WELL}">\n      <Sparkles className="text-muted-foreground size-4" />\n    </div>`
        : media === "image"
          ? `    <div className="${MEDIA_IMAGE}" />`
          : null

    const footer = hasFooter
      ? lines(
          "  <CardFooter>",
          ghost &&
            `    <Button${attrs([["variant", "ghost"]])}>Learn more</Button>`,
          secondary &&
            `    <Button${attrs([["variant", "secondary"]])}>Learn more</Button>`,
          primary && "    <Button>Get started</Button>",
          "  </CardFooter>"
        )
      : null

    const variant = str(state, "variant", "default")
    const body = lines(
      `<Card${attrs([
        ["variant", variant !== "default" && variant],
        ["className", "w-full max-w-sm"],
      ])}>`,
      '  <CardHeader className="flex flex-row items-start gap-3">',
      mediaBlock,
      '    <div className="grid gap-1.5">',
      `      <CardTitle>${title}</CardTitle>`,
      description &&
        "      <CardDescription>\n        Spring-tuned transitions calibrated across three tiers.\n      </CardDescription>",
      "    </div>",
      "  </CardHeader>",
      footer,
      "</Card>"
    )

    return `${head}\n\n${body}\n`
  },
}
