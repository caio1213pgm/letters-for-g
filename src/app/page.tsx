"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [stateEmail, setStateEmail] = useState("");
  const [statePassword, setStatePassWord] = useState("");

  return (
    <main>
      <div className="flex mx-auto max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Ensira seu email e senha para fazer o login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input
                label="Email"
                placeholder="Digite seu email"
                onChange={({ target: { value } }) => setStateEmail(value)}
                value={stateEmail}
              />
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                onChange={({ target: { value } }) => setStatePassWord(value)}
                value={statePassword}
              />
              <Button
                onClick={async () => {
                  const userLogin = {
                    email: stateEmail,
                    password: statePassword,
                  };
                  console.log(userLogin);
                  await signIn("credentials", {
                    email: stateEmail,
                    password: statePassword,
                  });
                }}
              >
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
