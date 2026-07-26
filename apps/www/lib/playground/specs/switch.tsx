import { Label } from "@/registry/seam/ui/label"
import { Switch } from "@/registry/seam/ui/switch"
import { attrs, imports, snippet } from "../code"
import { bool, str, type PlaygroundSpec } from "../types"

export const switchSpec: PlaygroundSpec = {
  id: "switch",
  title: "Switch",
  group: "Forms",
  description:
    "A debossed track holding an embossed thumb that springs across on commit.",
  knobs: [
    { id: "checked", label: "On by default", kind: "boolean", default: false },
    { id: "disabled", label: "Disabled", kind: "boolean", default: false },
    { id: "label", label: "Label", kind: "boolean", default: true },
    {
      id: "labelText",
      label: "Label text",
      kind: "text",
      default: "Proximity hover",
      when: (v) => v.label === true,
    },
  ],

  render(values) {
    const withLabel = bool(values, "label")
    return (
      <div className="flex items-center gap-3">
        <Switch
          id="playground-switch"
          defaultChecked={bool(values, "checked")}
          disabled={bool(values, "disabled")}
        />
        {withLabel ? (
          <Label htmlFor="playground-switch">{str(values, "labelText")}</Label>
        ) : null}
      </div>
    )
  },

  code(values) {
    const withLabel = bool(values, "label")

    const head = imports({
      "@/components/ui/label": withLabel ? ["Label"] : [],
      "@/components/ui/switch": ["Switch"],
    })

    const props = attrs([
      ["id", withLabel ? "proximity" : undefined],
      ["defaultChecked", bool(values, "checked")],
      ["disabled", bool(values, "disabled")],
    ])

    const body = withLabel
      ? [
          `<div className="flex items-center gap-3">`,
          `  <Switch${props} />`,
          `  <Label htmlFor="proximity">${str(values, "labelText")}</Label>`,
          `</div>`,
        ].join("\n")
      : `<Switch${props} />`

    return snippet(head, body)
  },
}
