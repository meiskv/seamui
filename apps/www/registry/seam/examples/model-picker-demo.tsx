import {
  ModelPicker,
  ModelPickerContent,
  ModelPickerItem,
  ModelPickerProvider,
  ModelPickerTrigger,
} from "@/registry/seam/ui/model-picker"

const MODELS = {
  "fable-5": "Fable 5",
  "opus-4-8": "Opus 4.8",
  "haiku-4-5": "Haiku 4.5",
  "llama-groq": "Llama 4 70B",
}

export default function ModelPickerDemo() {
  return (
    <ModelPicker items={MODELS} defaultValue="fable-5">
      <ModelPickerTrigger />
      <ModelPickerContent>
        <ModelPickerProvider name="Anthropic" connection="connected">
          <ModelPickerItem
            value="fable-5"
            description="Most capable; deep reasoning"
            meta="1M ctx"
          >
            Fable 5
          </ModelPickerItem>
          <ModelPickerItem
            value="opus-4-8"
            description="Strong all-rounder"
            meta="200k"
          >
            Opus 4.8
          </ModelPickerItem>
          <ModelPickerItem
            value="haiku-4-5"
            description="Fast and inexpensive"
            meta="200k"
          >
            Haiku 4.5
          </ModelPickerItem>
        </ModelPickerProvider>
        <ModelPickerProvider name="Local" connection="connected">
          <ModelPickerItem value="llama-groq" description="On the LAN box">
            Llama 4 70B
          </ModelPickerItem>
        </ModelPickerProvider>
      </ModelPickerContent>
    </ModelPicker>
  )
}
