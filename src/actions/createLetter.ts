"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { letterPasswordSchema } from "@/schemas/letterPassword.schema";
import { LetterPasswordSchemaType } from "@/types/letterPasswordType";
import { generateSlug } from "@/utils/generateSlug";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

type CreateLetterProps = {
  text: string;
  title: string;
} & LetterPasswordSchemaType;

export async function createLetter({
  text,
  title,
  password,
  passwordHint,
}: CreateLetterProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const slug = generateSlug(title);

  const parsedPassword = letterPasswordSchema.parse({ password, passwordHint });
  const passwordLetter = await bcrypt.hash(parsedPassword.password, 12);

  const newLetter = {
    authorId: user.id || "",
    authorName: user.name || "",
    text,
    title,
    slug,
    passwordLetter,
    passwordHint: parsedPassword.passwordHint,
  };

  const letter = await prisma.letter.create({
    data: newLetter,
    select: { slug: true },
  });

  return letter;
}
