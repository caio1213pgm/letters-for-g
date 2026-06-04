"use server";
import { prisma } from "@/lib/prisma";
import { RegisterSchemaType } from "@/types/registerType";
import bcrypt from "bcryptjs";

export async function createUser({
  email,
  name,
  password,
}: RegisterSchemaType) {
  const existsEmail = await prisma.user.findUnique({ where: { email } });
  if (existsEmail) throw new Error("Email já cadastrado");

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      credential: {
        create: { passwordHash },
      },
    },
  });
  return user;
}
