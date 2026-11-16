"use server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

import { auth } from "@/auth";
import { letterCardType } from "@/types/letterCardType";
import { redirect } from "next/navigation";

export async function getLetters(): Promise<letterCardType[]> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const letters = await prisma.letter.findMany({
    where: { authorId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      slug: true,
      title: true,
      text: true,
      authorName: true,
      updatedAt: true,
      passwordLetter: true,
    },
  });

  return letters.map((item) => ({
    author: item.authorName,
    lastEdit: dayjs(item.updatedAt).format("DD/MM/YYYY"),
    resume: item.text,
    title: item.title,
    slug: item.slug,
    hasPassword: item.passwordLetter !== "",
  }));
}
