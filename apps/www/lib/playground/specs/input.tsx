import { Input } from "@/registry/seam/ui/input"
import { Label } from "@/registry/seam/ui/label"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

export const inputSpec: PlaygroundSpec = {
  id: "input",
  title: "Input",
  group: "Forms",
  description:
    "A debossed entry well — the field is carved into the surface, not raised off it.",
  stageClassName: "w-full",
  knobs: [
    {
      id: "type",
      label: "Type",
      kind: "enum",
      default: "text",
      options: [
        { value: "text", label: "Text" },
        { value: "email", label: "Email" },
        { value: "password", label: "Password" },
        { value: "number", label: "Number" },
        { value: "file", label: "File" },
      ],
    },
    { id: "label", label: "Label", kind: "boolean", default: true },
    {
      id: "labelText",
      label: "Label text",
      kind: "text",
      default: "Email",
      when: (v) => v.label === true,
    },
    {
      id: "placeholder",
      label: "Placeholder",
      kind: "text",
      default: "you@example.com",
      when: (v) => v.type !== "file",
    },
    { id: "disabled", label: "Disabled", kind: "boolean", default: false },
  ],

  render(values) {
    const type = str(values, "type")
    const withLabel = bool(values, "label")
    return (
      <div className="w-full max-w-sm space-y-2">
        {withLabel ? (
          <Label htmlFor="playground-input">{str(values, "labelText")}</Label>
        ) : null}
        <Input
          id="playground-input"
          type={type}
          placeholder={type === "file" ? undefined : str(values, "placeholder")}
          disabled={bool(values, "disabled")}
        />
      </div>
    )
  },

  code(values) {
    const type = str(values, "type")
    const withLabel = bool(values, "label")
    const labelText = str(values, "labelText")

    const head = imports({
      "@/components/ui/input": ["Input"],
      "@/components/ui/label": withLabel ? ["Label"] : [],
    })

    const props = attrs([
      ["id", withLabel ? "email" : undefined],
      ["type", type === "text" ? undefined : type],
      ["placeholder", type === "file" ? undefined : str(values, "placeholder")],
      ["disabled", bool(values, "disabled")],
    ])

    const body = withLabel
      ? [
          `<div className="space-y-2">`,
          `  <Label htmlFor="email">${labelText}</Label>`,
          `  <Input${props} />`,
          `</div>`,
        ].join("\n")
      : `<Input${props} />`

    return snippet(head, body)
  },
}
