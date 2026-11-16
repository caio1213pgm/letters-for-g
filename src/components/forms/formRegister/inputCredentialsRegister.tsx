"use client";
import { createUser } from "@/actions/createUser";
import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/register.schema";
import { RegisterSchemaType } from "@/types/registerType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function InputCredentialRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: RegisterSchemaType) => {
    setServerError(null);
    const result = await createUser(data);
    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    // Conta criada: entra direto, sem pedir as credenciais de novo
    const login = await loginAction({
      email: data.email,
      password: data.password,
    });
    if (login?.error) {
      router.push("/login");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        placeholder="Digite seu email"
        autoComplete="email"
        aria-invalid={!!errors.email}
        {...register("email")}
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
      <Input
        label="Nome de usuário"
        placeholder="Digite seu nome"
        autoComplete="name"
        aria-invalid={!!errors.name}
        {...register("name")}
      />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        autoComplete="new-password"
        aria-invalid={!!errors.password}
        {...register("password")}
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <Input
        label="Confirmar senha"
        placeholder="Confirme sua senha"
        type="password"
        autoComplete="new-password"
        aria-invalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
      )}
      {serverError && (
        <p role="alert" className="text-sm text-red-500">
          {serverError}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Criando conta..." : "Confirmar"}
      </Button>
    </form>
  );
}
