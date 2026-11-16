"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { letterSchema } from "@/schemas/letter.schema";
import { letterPasswordSchema } from "@/schemas/letterPassword.schema";
import { LetterPasswordSchemaType } from "@/types/letterPasswordType";
import { ActionResult, LetterSchemaType } from "@/types/letterType";
import { generateSlug } from "@/utils/generateSlug";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

type CreateLetterProps = LetterSchemaType & LetterPasswordSchemaType;

export async function createLetter(
  input: CreateLetterProps,
): Promise<ActionResult<{ slug: string }>> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const parsedLetter = letterSchema.safeParse(input);
  if (!parsedLetter.success) {
    return { ok: false, error: parsedLetter.error.issues[0].message };
  }
  const parsedPassword = letterPasswordSchema.safeParse(input);
  if (!parsedPassword.success) {
    return { ok: false, error: parsedPassword.error.issues[0].message };
  }

  const { title, text, readerName } = parsedLetter.data;
  const passwordLetter = await bcrypt.hash(parsedPassword.data.password, 12);

  const letter = await prisma.letter.create({
    data: {
      authorId: session.user.id,
      authorName: session.user.name ?? "",
      title,
      text,
      readerName,
      slug: generateSlug(title),
      passwordLetter,
      passwordHint: parsedPassword.data.passwordHint,
    },
    select: { slug: true },
  });

  return { ok: true, data: letter };
}
