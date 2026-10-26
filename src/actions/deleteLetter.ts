"use server";
import { auth } from "@/auth";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteLetter(letterId: string | number, password: string) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const parsedLetterId = letterId.toString();

  const isPasswordValid = await checkLetterPassword(parsedLetterId, password);
  if (!isPasswordValid) {
    return null;
  }

  const deletedLetter = await prisma.letter.delete({
    where: {
      slug: parsedLetterId,
    },
  });

  revalidatePath("/dashboard");

  return deletedLetter;
}
