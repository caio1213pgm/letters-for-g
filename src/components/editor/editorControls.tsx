"use client";
import { cn } from "@/lib/utils";
import { Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  RemoveFormatting,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Button } from "../ui/button";

type EditorControlsProps = {
  editor: Editor | null;
};

export default function EditorControls({ editor }: EditorControlsProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      heading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      heading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
      bold: ctx.editor?.isActive("bold") ?? false,
      italic: ctx.editor?.isActive("italic") ?? false,
      strike: ctx.editor?.isActive("strike") ?? false,
      underline: ctx.editor?.isActive("underline") ?? false,
    }),
  });

  const controls = [
    {
      icon: Heading1,
      label: "Título 1",
      isActive: editorState?.heading1,
      action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: Heading2,
      label: "Título 2",
      isActive: editorState?.heading2,
      action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: Bold,
      label: "Negrito",
      isActive: editorState?.bold,
      action: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      label: "Itálico",
      isActive: editorState?.italic,
      action: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      icon: Strikethrough,
      label: "Tachado",
      isActive: editorState?.strike,
      action: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      icon: Underline,
      label: "Sublinhado",
      isActive: editorState?.underline,
      action: () => editor?.chain().focus().toggleUnderline().run(),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-muted/50 p-1.5">
      {controls.map((control) => (
        <Button
          key={control.label}
          type="button"
          variant="ghost"
          size="icon-sm"
          title={control.label}
          onClick={control.action}
          className={cn(
            "rounded-full text-muted-foreground",
            control.isActive &&
              "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
          )}
        >
          <control.icon className="h-4 w-4" />
        </Button>
      ))}
      <div className="mx-1 h-4 w-px bg-border" />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        title="Limpar formatação"
        onClick={() => {
          editor?.chain().focus().unsetAllMarks().run();
          editor?.chain().focus().clearNodes().run();
        }}
        className="rounded-full text-muted-foreground"
      >
        <RemoveFormatting className="h-4 w-4" />
      </Button>
    </div>
  );
}
