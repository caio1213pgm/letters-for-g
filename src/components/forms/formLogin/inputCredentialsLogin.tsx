"use client";
import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/login.schema";
import { loginSchemaType } from "@/types/loginType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function InputCredentialsLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: loginSchemaType) => {
    const result = await loginAction(data);
    if (result?.error) {
      const errorMessage = result.error || "Erro ao fazer login";
      alert(errorMessage);
      return;
    }
    router.push("/dashboard");
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
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <Button type="submit">Entrar</Button>
    </form>
  );
}
