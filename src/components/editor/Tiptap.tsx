"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import EditorControls from "./editorControls";
import { letterExtensions } from "./letterExtensions";

type TiptapProps = {
  content?: string;
  onChange?: (html: string) => void;
};

const Tiptap = ({ content, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: letterExtensions,
    content: content || "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    autofocus: true,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <EditorControls editor={editor} />
      <div className="w-full max-w-full overflow-hidden rounded-2xl border border-border bg-background transition-colors focus-within:border-primary/40">
        <EditorContent
          editor={editor}
          className="w-full px-6 py-5 [&_.tiptap]:min-h-56 [&_.tiptap]:max-h-96 [&_.tiptap]:w-full [&_.tiptap]:overflow-y-auto [&_.tiptap]:outline-none"
        />
      </div>
    </div>
  );
};

export default Tiptap;
