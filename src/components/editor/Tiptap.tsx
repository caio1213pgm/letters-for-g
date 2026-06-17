"use client";

import Heading from "@tiptap/extension-heading";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorControls from "./editorControls";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Heading, TextStyleKit],
    content: `
    <h2>Bem vindo ao LFG!</h2>
    <p>Comece escrevendo o que vem em mente.</p>
    <p>Adicione estilizações para expressar sentimentos através de suas palavras</p>
    `,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    autofocus: true,
  });

  return (
    <div className="flex flex-col min-h-56 gap-4 w-xs sm:w-xl">
      <EditorControls editor={editor} />
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
};

export default Tiptap;
