import z from "zod";

// A regra de tamanho vale no cadastro; no login basta não mandar vazio
export const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }).max(255),
  password: z
    .string()
    .min(1, { message: "Digite sua senha" })
    .max(72, { message: "Senha inválida" }),
});
