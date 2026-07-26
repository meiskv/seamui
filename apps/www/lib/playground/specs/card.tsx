import { Moon, Palette, ShieldCheck, Waves } from "lucide-react"

import { Badge } from "@/registry/seam/ui/badge"
import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { attrs, imports, indent, snippet } from "../code"
import { bool, num, str, type KnobValues, type PlaygroundSpec } from "../types"

const MEDIA_ICONS = {
  waves: Waves,
  shield: ShieldCheck,
  palette: Palette,
  moon: Moon,
} as const

const MEDIA_ICON_NAMES: Record<string, string> = {
  waves: "Waves",
  shield: "ShieldCheck",
  palette: "Palette",
  moon: "Moon",
}

/** The stacked-cards demo content — the four seam pillars, as in the docs. */
const ROWS = [
  {
    icon: "waves",
    title: "Fluid motion",
    description: "Spring-tuned transitions calibrated across three tiers",
  },
  {
    icon: "shield",
    title: "Accessible by default",
    description: "Focus-visible rings and ARIA roles in every part",
  },
  {
    icon: "palette",
    title: "Yours to theme",
    description: "Swap radius, icons, and primitive at runtime",
  },
  {
    icon: "moon",
    title: "Dark mode ready",
    description: "Tokens adapt to light and dark automatically",
  },
] as const

/** A debossed media well holding the row's icon — slot, not token (§1). */
function MediaWell({
  media,
  icon: Icon,
}: {
  media: string
  icon: (typeof MEDIA_ICONS)[keyof typeof MEDIA_ICONS]
}) {
  if (media === "none") return null
  if (media === "image") {
    return (
      <div className="bg-muted shadow-well size-10 shrink-0 rounded-md squircle" />
    )
  }
  return (
    <div
      className={
        media === "logo"
          ? "bg-secondary text-foreground shadow-resting flex size-10 shrink-0 items-center justify-center rounded-md squircle"
          : "bg-muted text-muted-foreground shadow-well flex size-10 shrink-0 items-center justify-center rounded-full"
      }
    >
      <Icon className="size-4" />
    </div>
  )
}

function rowCount(values: KnobValues): number {
  return Math.min(ROWS.length, Math.max(1, num(values, "rows")))
}

export const cardSpec: PlaygroundSpec = {
  id: "card",
  title: "Card",
  group: "Display",
  description:
    "A raised key resting on the canvas. Tune the media slot, the actions, and how a group of cards stacks.",
  stageClassName: "min-h-[26rem] w-full",
  knobs: [
    {
      id: "media",
      label: "Media",
      kind: "enum",
      group: "Card",
      default: "icon",
      options: [
        { value: "icon", label: "Icon" },
        { value: "logo", label: "Logo" },
        { value: "image", label: "Image" },
        { value: "none", label: "None" },
      ],
    },
    {
      id: "description",
      label: "Description",
      kind: "boolean",
      group: "Card",
      default: true,
    },
    {
      id: "badge",
      label: "Badge",
      kind: "boolean",
      group: "Card",
      default: false,
    },
    {
      id: "primary",
      label: "Primary button",
      kind: "text",
      group: "Card",
      default: "Get started",
    },
    {
      id: "secondary",
      label: "Secondary button",
      kind: "text",
      group: "Card",
      default: "Learn more",
    },
    {
      id: "rows",
      label: "Cards",
      kind: "number",
      group: "Card group",
      default: 4,
      min: 1,
      max: 4,
    },
    {
      id: "orientation",
      label: "Orientation",
      kind: "enum",
      group: "Card group",
      default: "inline",
      options: [
        { value: "inline", label: "Inline" },
        { value: "stacked", label: "Stacked" },
      ],
    },
    {
      id: "border",
      label: "Border",
      kind: "enum",
      group: "Card group",
      default: "outlined",
      options: [
        { value: "outlined", label: "Outlined" },
        { value: "plain", label: "Plain" },
      ],
    },
    {
      id: "separated",
      label: "Separated",
      kind: "boolean",
      group: "Card group",
      default: false,
    },
  ],

  render(values) {
    const media = str(values, "media")
    const inline = str(values, "orientation") === "inline"
    const outlined = str(values, "border") === "outlined"
    const separated = bool(values, "separated")
    const showDescription = bool(values, "description")
    const showBadge = bool(values, "badge")
    const primary = str(values, "primary")
    const secondary = str(values, "secondary")
    const rows = ROWS.slice(0, rowCount(values))

    return (
      <div
        className={
          separated
            ? "flex w-full max-w-2xl flex-col gap-3"
            : "flex w-full max-w-2xl flex-col"
        }
      >
        {rows.map((row, i) => {
          const Icon = MEDIA_ICONS[row.icon]
          // A joined group reads as one carved list: the seam between rows is a
          // hairline, and only the outer corners round.
          const joined = !separated && rows.length > 1
          const first = i === 0
          const last = i === rows.length - 1
          return (
            <Card
              key={row.title}
              className={[
                joined ? "rounded-none shadow-none" : "",
                joined && first ? "rounded-t-xl" : "",
                joined && last ? "rounded-b-xl" : "",
                joined && !last ? "border-b-0" : "",
                outlined ? "" : "border-transparent",
                inline ? "flex-row items-center gap-4 px-5 py-4" : "gap-3 py-4",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {inline ? (
                <>
                  <MediaWell media={media} icon={Icon} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{row.title}</CardTitle>
                      {showBadge ? <Badge variant="muted">New</Badge> : null}
                    </div>
                    {showDescription ? (
                      <CardDescription className="mt-0.5">
                        {row.description}
                      </CardDescription>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {secondary ? (
                      <Button variant="secondary" size="sm">
                        {secondary}
                      </Button>
                    ) : null}
                    {primary ? <Button size="sm">{primary}</Button> : null}
                  </div>
                </>
              ) : (
                <>
                  <CardHeader className="flex-row items-start gap-3">
                    <MediaWell media={media} icon={Icon} />
                    <div className="min-w-0 flex-1">
                      <CardTitle>{row.title}</CardTitle>
                      {showDescription ? (
                        <CardDescription className="mt-0.5">
                          {row.description}
                        </CardDescription>
                      ) : null}
                    </div>
                    {showBadge ? (
                      <CardAction>
                        <Badge variant="muted">New</Badge>
                      </CardAction>
                    ) : null}
                  </CardHeader>
                  {primary || secondary ? (
                    <CardFooter className="gap-2">
                      {secondary ? (
                        <Button variant="secondary" size="sm">
                          {secondary}
                        </Button>
                      ) : null}
                      {primary ? <Button size="sm">{primary}</Button> : null}
                    </CardFooter>
                  ) : null}
                </>
              )}
            </Card>
          )
        })}
      </div>
    )
  },

  code(values) {
    const media = str(values, "media")
    const inline = str(values, "orientation") === "inline"
    const showDescription = bool(values, "description")
    const showBadge = bool(values, "badge")
    const primary = str(values, "primary")
    const secondary = str(values, "secondary")
    const rows = rowCount(values)
    const row = ROWS[0]
    const iconName = MEDIA_ICON_NAMES[row.icon]

    const cardParts = ["Card", "CardTitle"]
    if (showDescription) cardParts.push("CardDescription")
    if (!inline) {
      cardParts.push("CardHeader")
      if (primary || secondary) cardParts.push("CardFooter")
      if (showBadge) cardParts.push("CardAction")
    }

    const head = imports({
      "lucide-react": media === "icon" || media === "logo" ? [iconName] : [],
      "@/components/ui/badge": showBadge ? ["Badge"] : [],
      "@/components/ui/button": primary || secondary ? ["Button"] : [],
      "@/components/ui/card": cardParts,
    })

    const MEDIA_CLASS =
      media === "logo"
        ? "bg-secondary shadow-resting flex size-10 shrink-0 items-center justify-center rounded-md squircle"
        : "bg-muted text-muted-foreground shadow-well flex size-10 shrink-0 items-center justify-center rounded-full"

    const mediaMarkup =
      media === "none"
        ? null
        : media === "image"
          ? `<div className="bg-muted shadow-well size-10 shrink-0 rounded-md squircle" />`
          : [
              `<div className="${MEDIA_CLASS}">`,
              `  <${iconName} className="size-4" />`,
              `</div>`,
            ].join("\n")

    const textBlock = [
      `<div className="min-w-0 flex-1">`,
      `  <CardTitle>${row.title}</CardTitle>`,
      showDescription
        ? `  <CardDescription className="mt-0.5">${row.description}</CardDescription>`
        : null,
      `</div>`,
    ]
      .filter(Boolean)
      .join("\n")

    const actions = [
      secondary
        ? `<Button variant="secondary" size="sm">${secondary}</Button>`
        : null,
      primary ? `<Button size="sm">${primary}</Button>` : null,
    ].filter((line): line is string => line !== null)

    const cardProps = attrs([
      [
        "className",
        inline ? "flex-row items-center gap-4 px-5 py-4" : undefined,
      ],
    ])

    const inlineChildren = [
      mediaMarkup,
      textBlock,
      actions.length > 0
        ? [
            `<div className="flex shrink-0 items-center gap-2">`,
            ...actions.map((a) => `  ${a}`),
            `</div>`,
          ].join("\n")
        : null,
    ].filter((part): part is string => part !== null)

    const headerChildren = [
      mediaMarkup,
      textBlock,
      showBadge
        ? [
            `<CardAction>`,
            `  <Badge variant="muted">New</Badge>`,
            `</CardAction>`,
          ].join("\n")
        : null,
    ].filter((part): part is string => part !== null)

    const body = inline
      ? [
          `<Card${cardProps}>`,
          ...inlineChildren.map((part) => indent(part, 2)),
          `</Card>`,
        ]
      : [
          `<Card>`,
          `  <CardHeader className="flex-row items-start gap-3">`,
          ...headerChildren.map((part) => indent(part, 4)),
          `  </CardHeader>`,
          actions.length > 0
            ? [
                `  <CardFooter className="gap-2">`,
                ...actions.map((a) => `    ${a}`),
                `  </CardFooter>`,
              ].join("\n")
            : null,
          `</Card>`,
        ]

    const note =
      rows > 1
        ? `{/* The group repeats this card ${rows}× — see the preview. */}`
        : null

    return snippet(
      head,
      [note, ...body.filter(Boolean)].filter(Boolean).join("\n")
    )
  },
}
