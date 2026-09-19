import { getLetters } from "@/actions/getLetters";
import EmptyLetter from "./Letters/emptyLetter";
import LetterCard from "./ui/letterCard";

export default async function BoxLetters() {
  const lettersData = await getLetters();

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
      {lettersData.map((item) => (
        <LetterCard letter={item} key={item.id} />
      ))}
      <EmptyLetter />
    </div>
  );
}
