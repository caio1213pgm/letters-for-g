"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { unlockLetterSchema } from "@/schemas/unlockLetter.schema";
import bcrypt from "bcryptjs";

export async function checkLetterPassword(
  slug: string,
  password: string,
): Promise<boolean> {
  const parsed = unlockLetterSchema.safeParse({ password });
  if (!parsed.success) return false;

  const session = await auth();
  if (!session?.user?.id) return false;

  const letter = await prisma.letter.findFirst({
    where: { slug, authorId: session.user.id },
    select: { passwordLetter: true },
  });
  if (!letter) return false;

  return bcrypt.compare(parsed.data.password, letter.passwordLetter);
}
