"use server";
import { Prisma } from "@/generated/prisma/client";
import { getClientIp } from "@/lib/clientIp";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit } from "@/lib/rateLimit";
import { registerSchema } from "@/schemas/register.schema";
import { ActionResult } from "@/types/letterType";
import { RegisterSchemaType } from "@/types/registerType";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";

const EMAIL_TAKEN = "Email já cadastrado";

const REGISTER_WINDOW_MS = 60 * 60 * 1000;
const MAX_REGISTERS_PER_IP = 5;
// Sem IP conhecido, todos dividem um teto único e mais folgado
const MAX_REGISTERS_UNKNOWN_IP = 30;

export async function createUser(
  input: RegisterSchemaType,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  const { email, name, password } = parsed.data;

  const ip = getClientIp(await headers());
  const limit = await consumeRateLimit(
    `register:${ip ?? "unknown"}`,
    REGISTER_WINDOW_MS,
  );
  if (limit.attempts > (ip ? MAX_REGISTERS_PER_IP : MAX_REGISTERS_UNKNOWN_IP)) {
    return {
      ok: false,
      error: `Muitos cadastros em pouco tempo. Tente de novo em ${limit.retryInMinutes} min.`,
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        credential: {
          create: { passwordHash },
        },
      },
    });
  } catch (error) {
    // O unique do banco cobre duas requisições simultâneas com o mesmo email
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { ok: false, error: EMAIL_TAKEN };
    }
    throw error;
  }

  return { ok: true, data: undefined };
}
