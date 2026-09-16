import { Plus } from "lucide-react";

export default function EmptyLetter() {
  return (
    <div className="group border-2 border-zinc-400 border-dashed rounded-lg px-4 py-4 shadow-sm cursor-pointer min-h-36 hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center gap-2">
      <p>Escreva sua carta</p>
      <Plus className="group-hover:spin-360" />
    </div>
  );
}
