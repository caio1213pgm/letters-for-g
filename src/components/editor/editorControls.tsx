"use client";
import {
  DropdownMenuContent,
  DropdownMenuDefault,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { cn } from "@/lib/utils";
import { Editor, useEditorState } from "@tiptap/react";
import {
  Baseline,
  Bold,
  Heading1,
  Heading2,
  Italic,
  RemoveFormatting,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Button } from "../ui/buttons/button";
import {
  COLOR_OPTIONS,
  findFontOption,
  FONT_OPTIONS,
  FONT_SIZES,
  toFontSizeValue,
} from "./letterTextOptions";

type EditorControlsProps = {
  editor: Editor | null;
};

// text-base no celular evita o zoom automático do iOS ao focar o campo
const selectClassName =
  "h-9 min-w-0 cursor-pointer rounded-full border border-border bg-background px-2.5 text-base text-foreground outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-7 sm:text-xs";

const iconButtonClassName =
  "size-9 rounded-full text-muted-foreground sm:size-7";

export default function EditorControls({ editor }: EditorControlsProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const textStyle = ctx.editor?.getAttributes("textStyle") ?? {};
      return {
        heading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        heading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        bold: ctx.editor?.isActive("bold") ?? false,
        italic: ctx.editor?.isActive("italic") ?? false,
        strike: ctx.editor?.isActive("strike") ?? false,
        underline: ctx.editor?.isActive("underline") ?? false,
        fontFamily: (textStyle.fontFamily as string | null | undefined) ?? "",
        fontSize: (textStyle.fontSize as string | null | undefined) ?? "",
        color: (textStyle.color as string | null | undefined) ?? "",
      };
    },
  });

  const currentFont = findFontOption(editorState?.fontFamily)?.value ?? "";
  const currentSize = FONT_SIZES.map(toFontSizeValue).includes(
    editorState?.fontSize ?? "",
  )
    ? (editorState?.fontSize ?? "")
    : "";
  const currentColor = editorState?.color ?? "";

  const handleFontChange = (value: string) => {
    if (!editor) return;
    if (value === "") editor.chain().focus().unsetFontFamily().run();
    else editor.chain().focus().setFontFamily(value).run();
  };

  const handleSizeChange = (value: string) => {
    if (!editor) return;
    if (value === "") editor.chain().focus().unsetFontSize().run();
    else editor.chain().focus().setFontSize(value).run();
  };

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
    <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 rounded-2xl border border-border bg-muted/50 p-1.5">
      {/* No celular, fonte, tamanho e cor ocupam a primeira linha inteira */}
      <div className="flex w-full items-center gap-1 sm:w-auto">
        <select
          aria-label="Fonte"
          title="Fonte"
          value={currentFont}
          disabled={!editor}
          onChange={(e) => handleFontChange(e.target.value)}
          className={cn(selectClassName, "flex-1 sm:w-36 sm:flex-none")}
        >
          <option value="">Fonte padrão</option>
          {FONT_OPTIONS.map((font) => (
            <option
              key={font.label}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </option>
          ))}
        </select>

        <select
          aria-label="Tamanho da fonte"
          title="Tamanho da fonte"
          value={currentSize}
          disabled={!editor}
          onChange={(e) => handleSizeChange(e.target.value)}
          className={cn(selectClassName, "w-20 shrink-0 sm:w-16")}
        >
          <option value="">Auto</option>
          {FONT_SIZES.map((size) => (
            <option key={size} value={toFontSizeValue(size)}>
              {size}
            </option>
          ))}
        </select>

        <DropdownMenuDefault>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              title="Cor do texto"
              disabled={!editor}
              className={cn(iconButtonClassName, "relative")}
            >
              <Baseline className="h-4 w-4" />
              <span
                aria-hidden="true"
                className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-foreground sm:inset-x-1.5 sm:bottom-0.5"
                style={
                  currentColor ? { backgroundColor: currentColor } : undefined
                }
              />
              <span className="sr-only">Cor do texto</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto min-w-0 p-2">
            <div className="grid grid-cols-5 gap-1.5">
              {COLOR_OPTIONS.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  title={color.label}
                  aria-label={color.label}
                  onClick={() =>
                    editor?.chain().focus().setColor(color.value).run()
                  }
                  className="size-9 cursor-pointer justify-center rounded-full p-0 sm:size-7"
                >
                  <span
                    className="size-6 rounded-full ring-1 ring-foreground/15 sm:size-5"
                    style={{ backgroundColor: color.value }}
                  />
                </DropdownMenuItem>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-dashed border-border pt-2">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="color"
                  aria-label="Outra cor"
                  value={
                    /^#[0-9a-f]{6}$/i.test(currentColor)
                      ? currentColor
                      : "#18181b"
                  }
                  // Sem focus(): devolver o foco ao editor fecharia o seletor do navegador
                  onChange={(e) =>
                    editor?.chain().setColor(e.target.value).run()
                  }
                  className="size-7 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
                />
                Outra cor
              </label>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().unsetColor().run()}
                className="cursor-pointer rounded-md px-2 py-1 text-xs"
              >
                Padrão
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenuDefault>
      </div>

      <div className="mx-1 hidden h-4 w-px bg-border sm:block" />

      {controls.map((control) => (
        <Button
          key={control.label}
          type="button"
          variant="ghost"
          size="icon-sm"
          title={control.label}
          onClick={control.action}
          className={cn(
            iconButtonClassName,
            control.isActive &&
              "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
          )}
        >
          <control.icon className="h-4 w-4" />
        </Button>
      ))}
      <div className="mx-1 hidden h-4 w-px bg-border sm:block" />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        title="Limpar formatação"
        onClick={() =>
          editor?.chain().focus().unsetAllMarks().clearNodes().run()
        }
        className={iconButtonClassName}
      >
        <RemoveFormatting className="h-4 w-4" />
      </Button>
    </div>
  );
}
