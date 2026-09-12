import { letterCardType } from "@/types/letterCardType";

export default function getLetters(): letterCardType[] {
  const letter: letterCardType = {
    author: "Caio Fabio",
    lastEdit: "10/10/2026",
    resume: "Resumo de uma carta de amor para uma pessoa amada",
    title: "Uma carta de amor",
    id: 0,
  };
  const lettersArr = [];
  for (let index = 0; index < 4; index++) {
    const element = {
      ...letter,
      id: index,
    };
    lettersArr.push(element);
  }

  return lettersArr;
}
