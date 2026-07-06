import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/registry/seam/ui/preview-card"

export default function PreviewCardDemo() {
  return (
    <p className="text-sm">
      Built on{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={<a href="https://base-ui.com" className="underline" />}
        >
          Base UI
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="space-y-1.5">
            <div className="font-medium">Base UI</div>
            <p className="text-muted-foreground text-sm">
              Unstyled React components from the creators of Radix, Floating UI,
              and Material UI.
            </p>
          </div>
        </PreviewCardContent>
      </PreviewCard>
      .
    </p>
  )
}
