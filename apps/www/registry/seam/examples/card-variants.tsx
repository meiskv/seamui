import {
  Folder,
  Layers,
  PanelTop,
  RectangleHorizontal,
  Square,
} from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"

const VARIANTS = [
  {
    variant: "default" as const,
    Icon: Square,
    title: "Key",
    body: "The default — a raised surface resting on the canvas.",
  },
  {
    variant: "tabbed" as const,
    Icon: PanelTop,
    title: "Tabbed",
    body: "A hairline tab hints at a folder without redrawing the shape.",
  },
  {
    variant: "folder" as const,
    Icon: Folder,
    title: "Folder",
    body: "The full silhouette — a filled tab joined by a concave curve.",
  },
  {
    variant: "well" as const,
    Icon: Layers,
    title: "Well",
    body: "Debossed instead of raised — a container things sit inside.",
  },
  {
    variant: "flat" as const,
    Icon: RectangleHorizontal,
    title: "Flat",
    body: "Hairline only, no shadow — for grids where raised keys read noisy.",
  },
]

export default function CardVariants() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      {VARIANTS.map(({ variant, Icon, title, body }) => (
        <Card key={variant} variant={variant}>
          <CardHeader className="flex flex-row items-start gap-3">
            <div className="bg-muted shadow-well flex size-9 shrink-0 items-center justify-center rounded-full">
              <Icon className="text-muted-foreground size-4" />
            </div>
            <div className="grid gap-1.5">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{body}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
