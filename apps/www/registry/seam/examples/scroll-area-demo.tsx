import { ScrollArea } from "@/registry/seam/ui/scroll-area"

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-40 w-64 rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            springs preset #{i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
