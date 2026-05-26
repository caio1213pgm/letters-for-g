"use client";
import { useForm } from "react-hook-form";
import { GithubIcon } from "../icons/GitHubIcon";
import GoogleIcon from "../icons/GoogleIcon";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export default function FormLogin() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  return (
    <div>
      <Card className="w-xs sm:w-md py-5">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Insira suas credencias ou entre com sua conta google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit">Entrar</Button>
              <Button variant="outline" className="gap-2">
                <GoogleIcon />
                Login com o google
              </Button>
              <Button variant="outline" className="gap-2">
                <GithubIcon />
                Login com GitHub
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="mx-auto text-muted-foreground hover:text-foreground hover:cursor-pointer transition-all duration-200">
            Crie sua conta
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
