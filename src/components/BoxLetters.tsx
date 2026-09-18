import { getLetters } from "@/actions/getLetters";
import EmptyLetter from "./Letters/emptyLetter";
import LetterCard from "./ui/letterCard";

type BoxLettersProps = {
  authorId: string;
};

export default async function BoxLetters() {
  const lettersData = await getLetters();

  return (
    <div className="flex flex-col items-center w-full">
      <h1>MOSTRAR CARTAS</h1>
      <div className="grid grid-cols-3 gap-4 border shadow-xl rounded-xl p-6 w-250">
        {lettersData.map((item) => (
          <LetterCard letter={item} key={item.id} />
        ))}
        <EmptyLetter />
      </div>
    </div>
  );
}
