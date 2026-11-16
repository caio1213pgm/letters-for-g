import z from "zod";
import { stripHtml } from "@/utils/stripHtml";

export const letterSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Dê um título para a carta" })
    .max(120, { message: "O título pode ter no máximo 120 caracteres" }),
  readerName: z
    .string()
    .trim()
    .min(1, { message: "Diga para quem é a carta" })
    .max(80, { message: "O nome pode ter no máximo 80 caracteres" }),
  text: z
    .string()
    .max(50_000, { message: "A carta ficou longa demais" })
    .refine((html) => stripHtml(html) !== "", {
      message: "Escreva alguma coisa na carta",
    }),
});
