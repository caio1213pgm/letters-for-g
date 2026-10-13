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
      <EditorContent
        editor={editor}
        className="w-full rounded-2xl border border-border bg-background px-6 py-5 transition-colors focus-within:border-primary/40 [&_.tiptap]:min-h-56 [&_.tiptap]:outline-none"
      />
    </div>
  );
};

export default Tiptap;
