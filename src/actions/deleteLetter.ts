"use server";
import { auth } from "@/auth";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types/letterType";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteLetter(
  slug: string,
  password: string,
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const isPasswordValid = await checkLetterPassword(slug, password);
  if (!isPasswordValid) {
    return { ok: false, error: "Senha inválida" };
  }

  const deleted = await prisma.letter.deleteMany({
    where: { slug, authorId: session.user.id },
  });
  if (deleted.count === 0) {
    return { ok: false, error: "Carta não encontrada" };
  }

  revalidatePath("/dashboard");
  return { ok: true, data: undefined };
}
