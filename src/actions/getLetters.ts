"use server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

import { auth } from "@/auth";
import { letterCardType } from "@/types/letterCardType";

type getLettersProps = {
  authorId: string;
};

export async function getLetters() {
  const { user } = await auth();
  const authorId = user.id;
  console.log(user);
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
