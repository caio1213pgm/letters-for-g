import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getLetterById(letterId: string) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }

  const uniqueLetter = await prisma.letter.findUnique({
    where: { slug: letterId },
    omit: { passwordLetter: true },
  });

  if (user.id !== uniqueLetter?.authorId) {
    return null;
  }

  return uniqueLetter;
}
