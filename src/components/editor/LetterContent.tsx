"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { letterExtensions } from "./letterExtensions";

type LetterContentProps = {
  content: string;
};

// Renderiza o HTML da carta pelo schema do Tiptap: o que o editor não conhece é descartado
export default function LetterContent({ content }: LetterContentProps) {
  const editor = useEditor({
    extensions: letterExtensions,
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <EditorContent
      editor={editor}
      className="text-[17px] leading-[1.75] text-foreground/90 [&_.tiptap]:outline-none [&_.tiptap>*+*]:mt-4 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6"
    />
  );
}
