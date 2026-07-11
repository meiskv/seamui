import { Avatar, AvatarFallback } from "@/registry/seam/ui/avatar"
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/registry/seam/ui/preview-card"

export default function PreviewCardUser() {
  return (
    <p className="text-sm">
      Design notes from{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={<a href="https://base-ui.com" className="underline" />}
        >
          @seamui
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-11">
                <AvatarFallback>SU</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <div className="font-medium leading-none">seamui</div>
                <div className="text-muted-foreground text-sm leading-none">
                  @seamui
                </div>
              </div>
            </div>
            <p className="text-sm">
              Tactile, spring-driven UI components you own — built on Base UI
              and motion.dev.
            </p>
            <div className="text-muted-foreground text-sm">
              128 Following · 2.4k Followers
            </div>
          </div>
        </PreviewCardContent>
      </PreviewCard>
      .
    </p>
  )
}
