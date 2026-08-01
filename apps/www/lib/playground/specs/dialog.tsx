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
import { attrs, imports, lines } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

export const dialogSpec: PlaygroundSpec = {
  id: "dialog",
  title: "Dialog",
  group: "Overlays",
  blurb:
    "Rises to the top of the stack and dims the page behind it — the condense pattern, in CSS so Base UI can await the exit.",
  controls: [
    {
      id: "size",
      label: "Size",
      group: "Dialog",
      type: "enum",
      as: "segmented",
      default: "default",
      options: [
        { value: "sm", label: "Small" },
        { value: "default", label: "Default" },
        { value: "lg", label: "Large" },
      ],
    },
    {
      id: "title",
      label: "Title",
      group: "Dialog",
      type: "text",
      default: "Edit profile",
    },
    {
      id: "description",
      label: "Description",
      group: "Dialog",
      type: "boolean",
      default: true,
    },
    {
      id: "showClose",
      label: "Close key",
      group: "Dialog",
      type: "boolean",
      default: true,
    },
    {
      id: "footer",
      label: "Footer",
      group: "Actions",
      type: "boolean",
      default: true,
    },
    {
      id: "destructive",
      label: "Destructive action",
      group: "Actions",
      type: "boolean",
      default: false,
      enabledWhen: (state) => bool(state, "footer", true),
    },
  ],

  render: (state) => {
    const title = str(state, "title", "Edit profile")
    const description = bool(state, "description", true)
    const footer = bool(state, "footer", true)
    const destructive = bool(state, "destructive")

    return (
      <Dialog>
        <DialogTrigger render={<Button variant="outline">{title}</Button>} />
        <DialogContent
          size={str(state, "size", "default") as "sm" | "default" | "lg"}
          showClose={bool(state, "showClose", true)}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? (
              <DialogDescription>
                Make changes to your profile. The surface rises to the top of
                the stack; the page dims behind it.
              </DialogDescription>
            ) : null}
          </DialogHeader>
          {footer ? (
            <DialogFooter>
              <DialogClose render={<Button variant="ghost">Cancel</Button>} />
              <DialogClose
                render={
                  <Button variant={destructive ? "destructive" : "default"}>
                    {destructive ? "Delete" : "Save"}
                  </Button>
                }
              />
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    )
  },

  code: (state) => {
    const title = str(state, "title", "Edit profile")
    const description = bool(state, "description", true)
    const showClose = bool(state, "showClose", true)
    const footer = bool(state, "footer", true)
    const destructive = bool(state, "destructive")

    const head = imports({
      "@/components/ui/button": ["Button"],
      "@/components/ui/dialog": [
        "Dialog",
        "DialogContent",
        "DialogHeader",
        "DialogTitle",
        "DialogTrigger",
        ...(description ? ["DialogDescription"] : []),
        ...(footer ? ["DialogFooter", "DialogClose"] : []),
      ],
    })

    const confirm = destructive
      ? `<Button${attrs([["variant", "destructive"]])}>Delete</Button>`
      : "<Button>Save</Button>"

    return `${head}\n\n${lines(
      "<Dialog>",
      `  <DialogTrigger render={<Button variant="outline">${title}</Button>} />`,
      `  <DialogContent${attrs([
        [
          "size",
          str(state, "size", "default") !== "default" && str(state, "size"),
        ],
      ])}${showClose ? "" : " showClose={false}"}>`,
      "    <DialogHeader>",
      `      <DialogTitle>${title}</DialogTitle>`,
      description &&
        "      <DialogDescription>\n        Make changes to your profile.\n      </DialogDescription>",
      "    </DialogHeader>",
      footer &&
        lines(
          "    <DialogFooter>",
          '      <DialogClose render={<Button variant="ghost">Cancel</Button>} />',
          `      <DialogClose render={${confirm}} />`,
          "    </DialogFooter>"
        ),
      "  </DialogContent>",
      "</Dialog>"
    )}\n`
  },
}
