import z from "zod";

export const letterPasswordSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "A senha precisa de no mínimo 4 caracteres" })
      .max(72, { message: "A senha pode ter no máximo 72 caracteres" }),
    passwordHint: z
      .string()
      .trim()
      .max(120, { message: "A dica pode ter no máximo 120 caracteres" }),
  })
  .superRefine((data, ctx) => {
    const hint = data.passwordHint.toLowerCase();
    if (hint !== "" && hint.includes(data.password.toLowerCase())) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordHint"],
        message: "A dica não pode conter a senha",
      });
    }
  });
