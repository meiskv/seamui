import { Avatar, AvatarFallback, AvatarImage } from "@/registry/seam/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>SU</AvatarFallback>
      </Avatar>
    </div>
  )
}
