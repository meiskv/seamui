"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/seam/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/registry/seam/ui/alert"
import { Avatar, AvatarFallback } from "@/registry/seam/ui/avatar"
import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/seam/ui/field"
import { Form } from "@/registry/seam/ui/form"
import { Input } from "@/registry/seam/ui/input"
import { Label } from "@/registry/seam/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"
import { Switch } from "@/registry/seam/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

// The settings page: Tabs hold the sections, Field/Form carry validation on
// General, Switch rows commit notification state, and the danger zone gates
// deletion behind an AlertDialog. All foundation, no new parts.
const NOTIFICATION_PREFS = [
  { label: "Product updates", desc: "Release notes, once a month.", on: true },
  { label: "Usage alerts", desc: "When you approach a plan limit.", on: true },
  { label: "Weekly digest", desc: "Activity summary every Monday.", on: false },
]

export default function SettingsBlock() {
  const [saved, setSaved] = React.useState(false)
  const [deleted, setDeleted] = React.useState(false)
  const savedTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  // Re-arm (never stack) the confirmation timer; clear it on unmount.
  React.useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current)
    },
    []
  )

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Workspace settings</CardTitle>
        <CardDescription>
          General details, notifications, and the danger zone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" size="sm">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="danger">Danger</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="pt-2">
            <Form<{ name: string; region: string }>
              onFormSubmit={() => {
                setSaved(true)
                if (savedTimer.current) clearTimeout(savedTimer.current)
                savedTimer.current = setTimeout(() => setSaved(false), 2000)
              }}
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Acme Co</p>
                  <p className="text-muted-foreground text-xs">
                    Workspace avatar comes from your logo.
                  </p>
                </div>
              </div>
              <Field name="name">
                <FieldLabel>Workspace name</FieldLabel>
                <Input required minLength={3} defaultValue="Acme Co" />
                <FieldError match="valueMissing">Name it something.</FieldError>
                <FieldError match="tooShort">At least 3 characters.</FieldError>
              </Field>
              <Field name="region">
                <FieldLabel>Data region</FieldLabel>
                <Select defaultValue="eu">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                    <SelectItem value="us">US (Oregon)</SelectItem>
                    <SelectItem value="ap">Asia Pacific (Osaka)</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Where your workspace data lives at rest.
                </FieldDescription>
              </Field>
              <div className="flex items-center gap-3">
                <Button type="submit">Save changes</Button>
                {/* Always mounted so screen readers announce the change. */}
                <span
                  className="text-muted-foreground text-sm"
                  aria-live="polite"
                >
                  {saved ? "Saved." : ""}
                </span>
              </div>
            </Form>
          </TabsContent>

          <TabsContent value="notifications" className="pt-2">
            <div className="flex flex-col gap-4">
              {NOTIFICATION_PREFS.map((pref) => (
                <Label key={pref.label} className="justify-between">
                  <span className="flex flex-col gap-0.5">
                    {pref.label}
                    <span className="text-muted-foreground text-xs font-normal">
                      {pref.desc}
                    </span>
                  </span>
                  <Switch defaultChecked={pref.on} />
                </Label>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="danger" className="pt-2">
            {deleted ? (
              <Alert>
                <AlertTitle>Deletion scheduled</AlertTitle>
                <AlertDescription>
                  &quot;Acme Co&quot; will be removed in 30 days. Sign in again
                  to cancel.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="flex flex-col gap-4">
                <Alert variant="destructive">
                  <AlertTitle>Deleting a workspace is permanent</AlertTitle>
                  <AlertDescription>
                    Members lose access immediately; data is purged after 30
                    days.
                  </AlertDescription>
                </Alert>
                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button variant="destructive" className="w-fit">
                        Delete workspace
                      </Button>
                    }
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete &quot;Acme Co&quot;?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This schedules the workspace for permanent deletion.
                        Members are signed out immediately.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        render={<Button variant="ghost">Keep it</Button>}
                      />
                      <AlertDialogAction
                        onClick={() => setDeleted(true)}
                        render={
                          <Button variant="destructive">
                            Delete workspace
                          </Button>
                        }
                      />
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
