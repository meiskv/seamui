import { AspectRatio } from "@/registry/seam/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div className="w-72">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted shadow-well flex items-center justify-center overflow-hidden rounded-lg squircle"
      >
        <span className="text-muted-foreground text-sm">16 / 9</span>
      </AspectRatio>
    </div>
  )
}
