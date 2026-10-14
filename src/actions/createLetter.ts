"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/utils/generateSlug";
import { redirect } from "next/navigation";

type CreateLetterProps = {
  text: string;
  title: string;
};

export async function createLetter({ text, title }: CreateLetterProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const slug = generateSlug(title);

  const newLetter = {
    authorId: user.id || "",
    authorName: user.name || "",
    text,
    title,
    slug,
  };

  const letter = await prisma.letter.create({
    data: newLetter,
  });

  return letter;
}
