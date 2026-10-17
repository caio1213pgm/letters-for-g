import { hasLetterAccess } from "@/lib/letterAccess";
import { prisma } from "@/lib/prisma";
import {
  LetterPreviewType,
  UnlockedLetterType,
} from "@/types/letterReaderType";
import { formatLetterDate } from "@/utils/formatLetterDate";

type PublicLetter = {
  preview: LetterPreviewType;
  letter: UnlockedLetterType | null;
};

export async function getPublicLetter(
  slug: string,
): Promise<PublicLetter | null> {
  const letter = await prisma.letter.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      text: true,
      authorName: true,
      passwordHint: true,
      passwordLetter: true,
      createdAt: true,
      readerName: true,
    },
  });

  // Cartas sem senha foram criadas antes do lacre e não são públicas
  if (!letter || letter.passwordLetter === "") return null;

  const hasAccess = await hasLetterAccess(letter);

  return {
    preview: {
      slug: letter.slug,
      authorName: letter.authorName,
      passwordHint: letter.passwordHint,
    },
    letter: hasAccess
      ? {
          title: letter.title,
          text: letter.text,
          authorName: letter.authorName,
          readerName: letter.readerName,
          createdAt: formatLetterDate(letter.createdAt),
        }
      : null,
  };
}
