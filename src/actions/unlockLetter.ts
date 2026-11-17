"use server";
import { auth } from "@/auth";
import { getClientIp } from "@/lib/clientIp";
import { grantLetterAccess } from "@/lib/letterAccess";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, resetRateLimit } from "@/lib/rateLimit";
import { unlockLetterSchema } from "@/schemas/unlockLetter.schema";
import { UnlockLetterResult } from "@/types/letterReaderType";
import { formatLetterDate } from "@/utils/formatLetterDate";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
// Limite por leitor (IP informado pelo proxy confiável)
const MAX_ATTEMPTS_PER_IP = 5;
// Teto por carta, somando todos os IPs: segura quem troca de IP ou forja headers,
// e é o único limite quando o IP não é conhecido
const MAX_ATTEMPTS_PER_LETTER = 30;

export async function unlockLetter(
  slug: string,
  password: string,
): Promise<UnlockLetterResult> {
  const parsed = unlockLetterSchema.safeParse({ password });
  if (!parsed.success) {
    return { status: "invalid", remainingAttempts: MAX_ATTEMPTS_PER_IP };
  }

  const letter = await prisma.letter.findUnique({ where: { slug } });
  if (!letter || letter.passwordLetter === "") return { status: "not_found" };

  const ip = getClientIp(await headers());
  const ipKey = ip ? `unlock:${letter.id}:ip:${ip}` : null;
  const letterKey = `unlock:${letter.id}:all`;

  // A tentativa é contada ANTES de conferir a senha: requisições paralelas
  // ocupam cada uma a sua vaga e não passam juntas pelo limite
  const [ipState, letterState] = await Promise.all([
    ipKey ? consumeRateLimit(ipKey, ATTEMPT_WINDOW_MS) : null,
    consumeRateLimit(letterKey, ATTEMPT_WINDOW_MS),
  ]);

  if (ipState && ipState.attempts > MAX_ATTEMPTS_PER_IP) {
    return { status: "blocked", retryInMinutes: ipState.retryInMinutes };
  }
  if (letterState.attempts > MAX_ATTEMPTS_PER_LETTER) {
    return { status: "blocked", retryInMinutes: letterState.retryInMinutes };
  }

  const isValid = await bcrypt.compare(
    parsed.data.password,
    letter.passwordLetter,
  );

  if (!isValid) {
    const remainingByLetter = MAX_ATTEMPTS_PER_LETTER - letterState.attempts;
    const remainingAttempts = ipState
      ? Math.min(MAX_ATTEMPTS_PER_IP - ipState.attempts, remainingByLetter)
      : remainingByLetter;

    if (remainingAttempts <= 0) {
      const exhausted =
        ipState && ipState.attempts >= MAX_ATTEMPTS_PER_IP
          ? ipState
          : letterState;
      return { status: "blocked", retryInMinutes: exhausted.retryInMinutes };
    }
    return { status: "invalid", remainingAttempts };
  }

  // Acertou: zera só o contador deste leitor. O teto da carta continua valendo
  // para os erros que outras origens acumularam na janela.
  if (ipKey) await resetRateLimit(ipKey);

  // O próprio autor conferindo a carta não conta como leitura
  const session = await auth();
  if (session?.user?.id !== letter.authorId) {
    await prisma.letter.update({
      where: { id: letter.id },
      data: { status: "READ", readers: { increment: 1 } },
    });
  }

  await grantLetterAccess(letter);

  return {
    status: "ok",
    letter: {
      title: letter.title,
      text: letter.text,
      authorName: letter.authorName,
      readerName: letter.readerName,
      createdAt: formatLetterDate(letter.createdAt),
    },
  };
}
