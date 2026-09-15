"use server";
import { prisma } from "@/lib/prisma";

type createLetterProps = {
  authorId: string;
};

export async function createLetter() {
  console.log("chegou");
  const newLetter = {
    authorId: "cmtusw7ce00002oxf7oif6qmq",
    text: "minha primeira carta teste com texto",
    title: "carta 123",
    slug: "carta_abc",
  };
  const letter = await prisma.letter.create({
    data: newLetter,
  });

  console.log(letter);
}
