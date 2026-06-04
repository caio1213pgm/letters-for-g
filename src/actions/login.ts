"use server";
import { signIn } from "@/auth";
import { loginSchemaType } from "@/types/loginType";
import { AuthError } from "next-auth";

export async function loginAction(data: loginSchemaType) {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou senha inválidos." };
        default:
          return { error: "Algo deu errado. Tente novamente." };
      }
    }
    throw error;
  }
}
