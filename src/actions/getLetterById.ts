import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { EditableLetterType } from "@/types/letterType";
import { redirect } from "next/navigation";

// Busca uma carta do autor logado pelo slug, para o editor
export async function getLetterById(
  slug: string,
): Promise<EditableLetterType | null> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const letter = await prisma.letter.findFirst({
    where: { slug, authorId: session.user.id },
    select: {
      id: true,
      slug: true,
      title: true,
      text: true,
      readerName: true,
      status: true,
      authorName: true,
      passwordHint: true,
      passwordLetter: true,
    },
  });
  if (!letter) return null;

  const { passwordLetter, ...rest } = letter;
  return { ...rest, hasPassword: passwordLetter !== "" };
}
