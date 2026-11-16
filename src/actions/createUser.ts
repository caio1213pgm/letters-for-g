"use server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/register.schema";
import { ActionResult } from "@/types/letterType";
import { RegisterSchemaType } from "@/types/registerType";
import bcrypt from "bcryptjs";

const EMAIL_TAKEN = "Email já cadastrado";

export async function createUser(
  input: RegisterSchemaType,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  const { email, name, password } = parsed.data;

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
