import { prisma } from "./prisma";

export const createAndViewUser = async () => {
  const viewTesteUsers = await prisma.testeUser.findMany();
  return viewTesteUsers;
};
