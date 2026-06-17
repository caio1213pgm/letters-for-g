"use client";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  RemoveFormatting,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Button } from "../ui/button";
interface EditorControlsProps {
  editor: Editor | null;
}

export default function EditorControls({ editor }: EditorControlsProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().toggleBold().run();
          }}
          className={editor?.isActive("bold") ? "is-active" : "is-active"}
        >
          <Bold />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().toggleItalic().run();
          }}
        >
          <Italic />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().toggleUnderline().run();
          }}
        >
          <Underline />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().unsetAllMarks().run();
          }}
        >
          <RemoveFormatting />
        </Button>
      </div>
    </div>
  );
}
