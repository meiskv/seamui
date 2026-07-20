"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback } from "@/registry/seam/ui/avatar"
import { Badge } from "@/registry/seam/ui/badge"
import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/seam/ui/combobox"
import { DataTable } from "@/registry/seam/ui/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/seam/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/seam/ui/dropdown-menu"
import { Field, FieldError, FieldLabel } from "@/registry/seam/ui/field"
import { Form } from "@/registry/seam/ui/form"
import { Input } from "@/registry/seam/ui/input"

type Role = "Owner" | "Admin" | "Member"

type Member = {
  id: string
  name: string
  email: string
  role: Role
  status: "Active" | "Invited"
}

const ROLES = [
  { value: "Admin", label: "Admin" },
  { value: "Member", label: "Member" },
] as const
type RoleItem = (typeof ROLES)[number]

const SEED: Member[] = [
  {
    id: "m1",
    name: "Mia Vasquez",
    email: "mia@acme.dev",
    role: "Owner",
    status: "Active",
  },
  {
    id: "m2",
    name: "Noah Chen",
    email: "noah@acme.dev",
    role: "Admin",
    status: "Active",
  },
  {
    id: "m3",
    name: "Zoe Patel",
    email: "zoe@acme.dev",
    role: "Member",
    status: "Active",
  },
]

function initials(nameOrEmail: string) {
  const parts = nameOrEmail.replace(/@.*/, "").split(/[\s.\-_]+/)
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
}

// The team page: Data Table rows with per-row DropdownMenu actions, and an
// invite Dialog whose Form pairs a validated email Field with a Combobox
// role picker. All state is local — swap the handlers for your API calls.
export default function TeamBlock() {
  const [members, setMembers] = React.useState<Member[]>(SEED)
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [role, setRole] = React.useState<RoleItem | null>(ROLES[1])

  const setMemberRole = (id: string, nextRole: Role) =>
    setMembers((ms) =>
      ms.map((m) => (m.id === id ? { ...m, role: nextRole } : m))
    )
  const removeMember = (id: string) =>
    setMembers((ms) => ms.filter((m) => m.id !== id))

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Member",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">
              {initials(row.original.name)}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="font-medium">{row.original.name}</p>
            <p className="text-muted-foreground text-xs">
              {row.original.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={row.original.role === "Owner" ? "default" : "muted"}>
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "Active" ? "secondary" : "outline"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const m = row.original
        if (m.role === "Owner") return null
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={`Actions for ${m.name}`}
                  >
                    <MoreHorizontal />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    setMemberRole(m.id, m.role === "Admin" ? "Member" : "Admin")
                  }
                >
                  Make {m.role === "Admin" ? "member" : "admin"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => removeMember(m.id)}
                >
                  Remove from team
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>
          {members.length} member{members.length === 1 ? "" : "s"} in Acme Co.
        </CardDescription>
        <CardAction>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger
              render={
                <Button size="sm">
                  <UserPlus /> Invite
                </Button>
              }
            />
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Invite a teammate</DialogTitle>
                <DialogDescription>
                  They&apos;ll get an email with a join link.
                </DialogDescription>
              </DialogHeader>
              <Form<{ email: string }>
                onFormSubmit={(values) => {
                  setMembers((ms) => [
                    ...ms,
                    {
                      id: `m${Date.now()}`,
                      name: values.email.replace(/@.*/, ""),
                      email: values.email,
                      role: role?.value ?? "Member",
                      status: "Invited",
                    },
                  ])
                  setInviteOpen(false)
                }}
              >
                <Field name="email">
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    required
                    placeholder="teammate@acme.dev"
                  />
                  <FieldError match="valueMissing">
                    Enter their email.
                  </FieldError>
                  <FieldError match="typeMismatch">
                    That doesn&apos;t look like an email.
                  </FieldError>
                </Field>
                <Field name="role">
                  <FieldLabel>Role</FieldLabel>
                  <Combobox
                    items={[...ROLES]}
                    value={role}
                    onValueChange={(item: RoleItem | null) => setRole(item)}
                    itemToStringLabel={(item: RoleItem) => item.label}
                  >
                    <ComboboxInput placeholder="Pick a role…" />
                    <ComboboxContent>
                      <ComboboxEmpty>No matching role.</ComboboxEmpty>
                      <ComboboxList>
                        {(item: RoleItem) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
                <DialogFooter>
                  <Button type="submit">Send invite</Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={members}
          getRowId={(m) => m.id}
          pagination={false}
        />
      </CardContent>
    </Card>
  )
}
