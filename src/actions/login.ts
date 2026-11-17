"use server";
import { signIn } from "@/auth";
import { RATE_LIMITED_CODE } from "@/lib/authConfig";
import { loginSchemaType } from "@/types/loginType";
import { AuthError, CredentialsSignin } from "next-auth";

export async function loginAction(data: loginSchemaType) {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (
        error instanceof CredentialsSignin &&
        error.code === RATE_LIMITED_CODE
      ) {
        return {
          error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
        };
      }
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
