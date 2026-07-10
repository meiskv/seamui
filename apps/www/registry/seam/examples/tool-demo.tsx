import { CodeBlock } from "@/registry/seam/ui/code-block"
import {
  Tool,
  ToolContent,
  ToolHeader,
} from "@/registry/seam/ui/tool"

export default function ToolDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Tool defaultOpen>
        <ToolHeader title="search_docs" status="done" />
        <ToolContent>
          <p className="text-muted-foreground">
            Found 3 matches for &ldquo;spring config&rdquo;.
          </p>
          <CodeBlock
            language="json"
            code={`{ "query": "spring config", "results": 3 }`}
          />
        </ToolContent>
      </Tool>

      <Tool>
        <ToolHeader title="fetch_weather" status="running" />
        <ToolContent>
          <p className="text-muted-foreground">Calling the weather API…</p>
        </ToolContent>
      </Tool>

      <Tool>
        <ToolHeader title="write_file" status="pending" />
        <ToolContent>
          <p className="text-muted-foreground">Queued.</p>
        </ToolContent>
      </Tool>
    </div>
  )
}
