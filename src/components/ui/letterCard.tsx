import { letterCardType } from "@/types/letterCardType";

type letterCardProps = {
  letter: letterCardType;
};
export default function LetterCard({ letter }: letterCardProps) {
  return (
    <div className="border-2 rounded-xl px-4 py-4 shadow-md cursor-pointer bg-blue-200 max-w-80 hover:scale-105 transition-all duration-200 flex flex-col">
      <h2 className="font-bold text-zinc-800 text-xl">{letter.title}</h2>
      <div className="border-y border-black py-2">
        <p className="text-zinc-700 text-sm truncate">{letter.resume}</p>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-zinc-800">{letter.lastEdit}</span>
        <p className="italic text-zinc-800">{letter.author}</p>
      </div>
      <span className="self-end bg-blue-500 px-1 rounded-full">
        {letter.id}
      </span>
    </div>
  );
}
