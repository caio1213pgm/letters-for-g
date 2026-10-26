import z from "zod";

export const unlockLetterSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Digite a senha da carta" })
    .max(72, { message: "A senha pode ter no máximo 72 caracteres" }),
});
