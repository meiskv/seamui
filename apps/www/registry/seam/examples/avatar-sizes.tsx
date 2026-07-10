import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/seam/ui/avatar"

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-[0.625rem]">CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
