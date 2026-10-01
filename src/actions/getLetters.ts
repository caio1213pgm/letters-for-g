"use server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

import { auth } from "@/auth";
import { letterCardType } from "@/types/letterCardType";
import { redirect } from "next/navigation";

type getLettersProps = {
  letterSlug?: string;
};

export async function getLetters({ letterSlug }: getLettersProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const authorId = user.id;
  if (letterSlug) {
    const uniqueLetter = await prisma.letter.findUnique({
      where: { id: letterSlug },
    });
    console.log(uniqueLetter);
  }
  const letters = await prisma.letter.findMany({
    where: { authorId },
  });

  const mappedLetters: letterCardType[] = letters.map((item, index) => {
    return {
      author: item.authorName,
      id: index,
      lastEdit: dayjs(item.createdAt).format("DD/MM/YYYY"),
      resume: item.text,
      title: item.title,
    };
  });
  return mappedLetters;
}
