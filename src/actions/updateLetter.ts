/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type updateLetterProps = {
  letterData: {
    text: string;
    id: string;
    slug: string;
    readerName: string;
  };
  password: string;
};

export async function updateLetter({
  letterData,
  password,
}: updateLetterProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const isPasswordValid = await checkLetterPassword(letterData.slug, password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  const updateLetter = await prisma.letter.update({
    where: {
      id: letterData.id,
    },
    data: {
      text: letterData.text,
      readerName: letterData.readerName,
    },
  });

  return updateLetter;
}
