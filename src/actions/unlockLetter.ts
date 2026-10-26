"use server";
import { auth } from "@/auth";
import { grantLetterAccess } from "@/lib/letterAccess";
import { prisma } from "@/lib/prisma";
import { unlockLetterSchema } from "@/schemas/unlockLetter.schema";
import { UnlockLetterResult } from "@/types/letterReaderType";
import { formatLetterDate } from "@/utils/formatLetterDate";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";

const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

async function getClientIp() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip") || "unknown";
}

export async function unlockLetter(
  slug: string,
  password: string,
): Promise<UnlockLetterResult> {
  const parsed = unlockLetterSchema.safeParse({ password });
  if (!parsed.success) {
    return { status: "invalid", remainingAttempts: MAX_ATTEMPTS };
  }

  const letter = await prisma.letter.findUnique({ where: { slug } });
  if (!letter || letter.passwordLetter === "") return { status: "not_found" };

  const ip = await getClientIp();
  const now = Date.now();
  const attempt = await prisma.letterUnlockAttempt.findUnique({
    where: { letterId_ip: { letterId: letter.id, ip } },
  });
  const windowExpired =
    !attempt || now - attempt.windowStart.getTime() > ATTEMPT_WINDOW_MS;

  if (attempt && !windowExpired && attempt.attempts >= MAX_ATTEMPTS) {
    const retryAt = attempt.windowStart.getTime() + ATTEMPT_WINDOW_MS;
    return {
      status: "blocked",
      retryInMinutes: Math.max(1, Math.ceil((retryAt - now) / 60000)),
    };
  }

  const isValid = await bcrypt.compare(
    parsed.data.password,
    letter.passwordLetter,
  );

  if (!isValid) {
    const updated = await prisma.letterUnlockAttempt.upsert({
      where: { letterId_ip: { letterId: letter.id, ip } },
      create: { letterId: letter.id, ip, attempts: 1 },
      update: windowExpired
        ? { attempts: 1, windowStart: new Date(now) }
        : { attempts: { increment: 1 } },
    });
    const remainingAttempts = MAX_ATTEMPTS - updated.attempts;
    if (remainingAttempts <= 0) {
      return {
        status: "blocked",
        retryInMinutes: Math.ceil(ATTEMPT_WINDOW_MS / 60000),
      };
    }
    return { status: "invalid", remainingAttempts };
  }

  await prisma.letterUnlockAttempt.deleteMany({
    where: { letterId: letter.id, ip },
  });

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
