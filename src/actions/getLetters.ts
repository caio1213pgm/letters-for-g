"use server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

import { auth } from "@/auth";
import { letterCardType } from "@/types/letterCardType";
import { redirect } from "next/navigation";

export async function getLetters() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const authorId = user.id;
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
