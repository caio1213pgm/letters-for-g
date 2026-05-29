import z from "zod";

export const registerSchema = z
  .object({
    email: z.email({ message: "Email inválido" }),
    name: z
      .string()
      .min(3, { message: "Nome precisa ter no mínimo 3 letras" })
      .max(255),
    password: z
      .string()
      .min(8, { message: "Senha precisa de no mínimo 8 caracteres" })
      .max(25),
    confirmPassword: z
      .string()
      .min(8, { message: "Senha precisa de no mínimo 8 caracteres" })
      .max(25),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
      });
    }
  });
