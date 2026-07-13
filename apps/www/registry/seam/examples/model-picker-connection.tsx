import {
  ModelPicker,
  ModelPickerContent,
  ModelPickerItem,
  ModelPickerProvider,
  ModelPickerTrigger,
} from "@/registry/seam/ui/model-picker"

// Provider connection states: connected (filled), error (destructive),
// off (faint). Disabled items for providers you can't reach.
const MODELS = {
  "fable-5": "Fable 5",
  gpt: "GPT-5.2",
  gemini: "Gemini 3 Pro",
}

export default function ModelPickerConnection() {
  return (
    <ModelPicker items={MODELS} defaultValue="fable-5">
      <ModelPickerTrigger />
      <ModelPickerContent>
        <ModelPickerProvider name="Anthropic" connection="connected">
          <ModelPickerItem value="fable-5">Fable 5</ModelPickerItem>
        </ModelPickerProvider>
        <ModelPickerProvider name="OpenAI" connection="error">
          <ModelPickerItem
            value="gpt"
            disabled
            description="Key expired — reconnect"
          >
            GPT-5.2
          </ModelPickerItem>
        </ModelPickerProvider>
        <ModelPickerProvider name="Google" connection="off">
          <ModelPickerItem value="gemini" disabled description="Not configured">
            Gemini 3 Pro
          </ModelPickerItem>
        </ModelPickerProvider>
      </ModelPickerContent>
    </ModelPicker>
  )
}
