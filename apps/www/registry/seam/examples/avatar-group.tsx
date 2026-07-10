import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/seam/ui/avatar"

const PEOPLE = [
  { src: "https://i.pravatar.cc/64?img=1", fallback: "AL" },
  { src: "https://i.pravatar.cc/64?img=2", fallback: "BR" },
  { src: "https://i.pravatar.cc/64?img=3", fallback: "CT" },
]

export default function AvatarGroup() {
  return (
    <div className="flex items-center -space-x-2">
      {PEOPLE.map((p, i) => (
        <Avatar key={i} className="ring-background size-9 ring-2">
          <AvatarImage src={p.src} alt="" />
          <AvatarFallback>{p.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <div className="bg-muted text-muted-foreground ring-background flex size-9 items-center justify-center rounded-full text-xs font-medium ring-2">
        +5
      </div>
    </div>
  )
}
