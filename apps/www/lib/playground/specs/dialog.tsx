import type * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/seam/ui/dialog"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

export const dialogSpec: PlaygroundSpec = {
  id: "dialog",
  title: "Dialog",
  group: "Overlays",
  description:
    "Top of the depth stack — the panel pops from center while the backdrop dims what's below, both on the seam condense clock.",
  knobs: [
    {
      id: "trigger",
      label: "Trigger label",
      kind: "text",
      group: "Trigger",
      default: "Open dialog",
    },
    {
      id: "triggerVariant",
      label: "Trigger variant",
      kind: "enum",
      group: "Trigger",
      default: "secondary",
      options: [
        { value: "default", label: "Default" },
        { value: "secondary", label: "Secondary" },
        { value: "outline", label: "Outline" },
        { value: "ghost", label: "Ghost" },
      ],
    },
    {
      id: "title",
      label: "Title",
      kind: "text",
      group: "Panel",
      default: "Publish this workspace?",
    },
    {
      id: "description",
      label: "Description",
      kind: "text",
      group: "Panel",
      default: "Everyone with the link will be able to view it.",
    },
    {
      id: "showClose",
      label: "Close ✕",
      kind: "boolean",
      group: "Panel",
      default: true,
    },
    {
      id: "confirm",
      label: "Confirm label",
      kind: "text",
      group: "Actions",
      default: "Publish",
    },
    {
      id: "destructive",
      label: "Destructive confirm",
      kind: "boolean",
      group: "Actions",
      default: false,
    },
    {
      id: "cancel",
      label: "Cancel label",
      kind: "text",
      group: "Actions",
      default: "Cancel",
    },
  ],

  render(values) {
    const cancel = str(values, "cancel")
    const confirm = str(values, "confirm")
    const destructive = bool(values, "destructive")

    return (
      <Dialog>
        <DialogTrigger
          render={
            <Button
              variant={
                str(values, "triggerVariant") as React.ComponentProps<
                  typeof Button
                >["variant"]
              }
            />
          }
        >
          {str(values, "trigger")}
        </DialogTrigger>
        <DialogContent showClose={bool(values, "showClose")}>
          <DialogHeader>
            <DialogTitle>{str(values, "title")}</DialogTitle>
            <DialogDescription>{str(values, "description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {cancel ? (
              <DialogClose render={<Button variant="ghost" />}>
                {cancel}
              </DialogClose>
            ) : null}
            {confirm ? (
              <DialogClose
                render={
                  <Button variant={destructive ? "destructive" : "default"} />
                }
              >
                {confirm}
              </DialogClose>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },

  code(values) {
    const triggerVariant = str(values, "triggerVariant")
    const cancel = str(values, "cancel")
    const confirm = str(values, "confirm")
    const destructive = bool(values, "destructive")
    const showClose = bool(values, "showClose")

    const parts = [
      "Dialog",
      "DialogContent",
      "DialogDescription",
      "DialogHeader",
      "DialogTitle",
      "DialogTrigger",
    ]
    if (cancel || confirm) parts.push("DialogFooter", "DialogClose")

    const head = imports({
      "@/components/ui/button": ["Button"],
      "@/components/ui/dialog": parts,
    })

    const contentProps = attrs([["showClose", showClose ? undefined : false]])

    const footer =
      cancel || confirm
        ? [
            `    <DialogFooter>`,
            cancel
              ? `      <DialogClose render={<Button variant="ghost" />}>${cancel}</DialogClose>`
              : null,
            confirm
              ? `      <DialogClose render={<Button${destructive ? ' variant="destructive"' : ""} />}>${confirm}</DialogClose>`
              : null,
            `    </DialogFooter>`,
          ]
            .filter(Boolean)
            .join("\n")
        : null

    const body = [
      `<Dialog>`,
      `  <DialogTrigger render={<Button variant="${triggerVariant}" />}>`,
      `    ${str(values, "trigger")}`,
      `  </DialogTrigger>`,
      `  <DialogContent${contentProps}>`,
      `    <DialogHeader>`,
      `      <DialogTitle>${str(values, "title")}</DialogTitle>`,
      `      <DialogDescription>${str(values, "description")}</DialogDescription>`,
      `    </DialogHeader>`,
      footer,
      `  </DialogContent>`,
      `</Dialog>`,
    ]
      .filter(Boolean)
      .join("\n")

    return snippet(head, body)
  },
}
