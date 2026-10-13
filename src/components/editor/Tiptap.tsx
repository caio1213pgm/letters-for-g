"use client";

import Heading from "@tiptap/extension-heading";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorControls from "./editorControls";

type TiptapProps = {
  content?: string;
};

const Tiptap = ({ content }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2] }),
      TextStyleKit,
    ],
    content: content || "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    autofocus: true,
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
