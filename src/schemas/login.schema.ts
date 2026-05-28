import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }).max(255),
  password: z
    .string()
    .min(4, { message: "Senha precisa ter mais de 8 caractéres" })
    .max(20),
});
