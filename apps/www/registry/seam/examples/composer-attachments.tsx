"use client"

import * as React from "react"
import { AnimatePresence } from "motion/react"
import { FileText, Paperclip } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Composer,
  ComposerAttachment,
  ComposerAttachments,
  ComposerSubmit,
  ComposerTextarea,
  ComposerToolbar,
  ComposerTools,
} from "@/registry/seam/ui/composer"

let nextId = 0

export default function ComposerAttachmentsExample() {
  const [value, setValue] = React.useState("")
  const [files, setFiles] = React.useState<{ id: number; name: string }[]>([
    { id: nextId++, name: "spec.pdf" },
  ])

  const add = () =>
    setFiles((f) => [...f, { id: nextId++, name: `notes-${nextId}.md` }])
  const remove = (id: number) =>
    setFiles((f) => f.filter((file) => file.id !== id))

  return (
    <div className="w-full max-w-md">
      <Composer
        onSubmit={(e) => {
          e.preventDefault()
          setValue("")
          setFiles([])
        }}
      >
        {files.length > 0 && (
          <ComposerAttachments>
            <AnimatePresence initial={false}>
              {files.map((file) => (
                <ComposerAttachment
                  key={file.id}
                  onRemove={() => remove(file.id)}
                >
                  <FileText className="size-3" />
                  {file.name}
                </ComposerAttachment>
              ))}
            </AnimatePresence>
          </ComposerAttachments>
        )}
        <ComposerTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a message…"
        />
        <ComposerToolbar>
          <ComposerTools>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Attach file"
              onClick={add}
            >
              <Paperclip />
            </Button>
          </ComposerTools>
          <ComposerSubmit />
        </ComposerToolbar>
      </Composer>
    </div>
  )
}
