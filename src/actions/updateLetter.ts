"use server";

import { auth } from "@/auth";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { prisma } from "@/lib/prisma";
import { letterSchema } from "@/schemas/letter.schema";
import { ActionResult, LetterSchemaType } from "@/types/letterType";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type UpdateLetterProps = {
  slug: string;
  letterData: LetterSchemaType;
  password: string;
};

export async function updateLetter({
  slug,
  letterData,
  password,
}: UpdateLetterProps): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const parsed = letterSchema.safeParse(letterData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const isPasswordValid = await checkLetterPassword(slug, password);
  if (!isPasswordValid) {
    return { ok: false, error: "Senha inválida" };
  }

  // O filtro por autor e status fica na própria query: nada do cliente decide qual carta muda
  const updated = await prisma.letter.updateMany({
    where: { slug, authorId: session.user.id, status: { not: "READ" } },
    data: parsed.data,
  });

  if (updated.count === 0) {
    return {
      ok: false,
      error: "Esta carta já foi lida e não pode mais ser alterada.",
    };
  }

  revalidatePath("/dashboard");
  return { ok: true, data: undefined };
}
