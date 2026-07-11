import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/registry/seam/ui/preview-card"

export default function PreviewCardImage() {
  return (
    <p className="text-sm">
      Read the{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={<a href="https://base-ui.com" className="underline" />}
        >
          Base UI announcement
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="space-y-3">
            <div className="bg-muted squircle h-28 w-full rounded-md shadow-well" />
            <div className="space-y-1.5">
              <div className="font-medium leading-none">
                Introducing Base UI
              </div>
              <p className="text-muted-foreground text-sm">
                Unstyled, accessible React components from the creators of Radix,
                Floating UI, and Material UI.
              </p>
            </div>
          </div>
        </PreviewCardContent>
      </PreviewCard>
      .
    </p>
  )
}
