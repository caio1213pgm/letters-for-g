/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type updateLetterProps = {
  letterData: {
    text: string;
    id: string;
    readerName: string;
  };
};

export async function updateLetter({ letterData }: updateLetterProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
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
