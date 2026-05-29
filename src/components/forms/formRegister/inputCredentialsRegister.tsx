"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/register.schema";
import { RegisterSchemaType } from "@/types/registerType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function InputCredentialRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        placeholder="Digite seu email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
      <Input
        label="Nome de usuário"
        placeholder="Digite seu nome"
        {...register("name")}
      />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <Input
        label="Confirmar senha"
        placeholder="Confirme sua senha"
        type="password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
      )}
      <Button>Confirmar</Button>
    </form>
  );
}
