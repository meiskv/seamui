import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"

export default function CardStats() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardDescription>Monthly active users</CardDescription>
        <CardTitle className="text-3xl tabular-nums">24,318</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground flex items-center gap-1 text-sm">
        <TrendingUp className="text-primary size-4" />
        <span className="text-primary font-medium">+12.5%</span>
        from last month
      </CardContent>
    </Card>
  )
}
