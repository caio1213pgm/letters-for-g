import { getCartas, getLetters } from "@/actions/getLetters";
import LetterCard from "./ui/letterCard";

export default async function BoxLetters() {
  const lettersData = await getLetters();

  const letters = await getCartas();

  return (
    <div className="flex flex-col items-center">
      <h1>MOSTRAR CARTAS</h1>
      <div className="grid grid-cols-2 gap-4 border shadow-xl rounded-xl p-5">
        {lettersData.map((item) => (
          <LetterCard letter={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
