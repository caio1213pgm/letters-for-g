import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { letterCardType } from "@/types/letterCardType";
import { redirect } from "next/navigation";

export async function getLetterById(letterId: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const uniqueLetter = await prisma.letter.findUnique({
    where: { slug: letterId },
  });

  console.log("uniqueLetter", uniqueLetter);
  return uniqueLetter as letterCardType | null;
}
