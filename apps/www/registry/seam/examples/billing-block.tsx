"use client"

import * as React from "react"

import { Badge } from "@/registry/seam/ui/badge"
import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { cn } from "@/lib/utils"
import { Meter, MeterLabel } from "@/registry/seam/ui/meter"
import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"

type Cycle = "monthly" | "annual"

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    blurb: "For trying things out.",
    limits: "3 seats · 1 GB",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 24,
    blurb: "For working teams.",
    limits: "10 seats · 100 GB",
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 96,
    blurb: "For the whole org.",
    limits: "Unlimited seats · 1 TB",
  },
] as const

const USAGE = [
  { label: "Seats", used: 8, limit: 10, unit: "" },
  { label: "Storage", used: 61, limit: 100, unit: " GB" },
  { label: "API calls", used: 46_800, limit: 50_000, unit: "" },
] as const

function price(monthly: number, cycle: Cycle) {
  if (monthly === 0) return "Free"
  const perMonth = cycle === "annual" ? monthly * 0.8 : monthly
  return `$${Math.round(perMonth)}/mo`
}

// Billing: plan Cards with a monthly/annual ToggleGroup (the embossed key
// slides between cycles), the current plan wearing a Badge, and usage rows
// on Meter that go destructive as they approach the limit — the
// context-meter threshold pattern, generalized.
export default function BillingBlock() {
  const [cycle, setCycle] = React.useState<Cycle>("monthly")
  const [plan, setPlan] = React.useState<string>("pro")

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Plan</h3>
        <ToggleGroup
          value={[cycle]}
          onValueChange={(groupValue: string[]) => {
            const next = groupValue[0] as Cycle | undefined
            if (next) setCycle(next)
          }}
          aria-label="Billing cycle"
        >
          <Toggle value="monthly" className="px-3.5 text-xs">
            Monthly
          </Toggle>
          <Toggle value="annual" className="px-3.5 text-xs">
            Annual −20%
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {PLANS.map((p) => {
          const current = p.id === plan
          return (
            <Card
              key={p.id}
              className={cn("gap-3", current && "ring-ring/50 ring-2")}
            >
              <CardHeader className="gap-1">
                <CardTitle className="flex items-center justify-between text-sm">
                  {p.name}
                  {current && <Badge variant="muted">Current</Badge>}
                </CardTitle>
                <CardDescription className="text-xs">{p.blurb}</CardDescription>
              </CardHeader>
              <CardContent className="text-lg font-semibold">
                {price(p.monthly, cycle)}
                <p className="text-muted-foreground mt-1 text-xs font-normal">
                  {p.limits}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant={current ? "outline" : "default"}
                  size="sm"
                  className="w-full"
                  disabled={current}
                  onClick={() => setPlan(p.id)}
                >
                  {current ? "Yours" : "Switch"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Usage this period</CardTitle>
          <CardDescription className="text-xs">
            Meters turn destructive past 90% — time to switch plans.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {USAGE.map((u) => {
            const pct = (u.used / u.limit) * 100
            return (
              <Meter
                key={u.label}
                value={u.used}
                max={u.limit}
                className={cn(
                  pct >= 90 && "[&_[data-slot=meter-indicator]]:bg-destructive"
                )}
              >
                <div className="flex items-baseline justify-between">
                  <MeterLabel className="text-xs">{u.label}</MeterLabel>
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      pct >= 90 ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {u.used.toLocaleString()}
                    {u.unit} / {u.limit.toLocaleString()}
                    {u.unit}
                  </span>
                </div>
              </Meter>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
