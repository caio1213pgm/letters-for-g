"use client";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
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
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <Heading1 />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <Heading3 />
        </Button>
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
            console.log(editor?.getHTML());
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
            editor?.chain().focus().clearNodes().run();
          }}
        >
          <RemoveFormatting />
        </Button>
      </div>
    </div>
  );
}
