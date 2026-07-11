import {
  VoiceVisualizer,
  VoiceVisualizerCaption,
} from "@/registry/seam/ui/voice-visualizer"

export default function VoiceVisualizerCaptionExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <VoiceVisualizer state="listening" level={0.4} size="lg" />
      <VoiceVisualizerCaption>
        Agent is listening, ask it a question
      </VoiceVisualizerCaption>
    </div>
  )
}
