import { letterSchema } from "@/schemas/letter.schema";
import z from "zod";

export type LetterSchemaType = z.infer<typeof letterSchema>;

// Carta aberta pelo autor no editor (sem o hash da senha)
export type EditableLetterType = LetterSchemaType & {
  id: string;
  slug: string;
  status: "SKETCH" | "SEND" | "READ";
  authorName: string;
  passwordHint: string;
  // Cartas criadas antes do lacre não têm senha e dispensam a confirmação
  hasPassword: boolean;
};

// Resposta padrão das actions de escrita: ou deu certo, ou vem a mensagem de erro
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };
