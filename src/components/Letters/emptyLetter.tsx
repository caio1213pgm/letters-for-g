import { Plus } from "lucide-react";
import Link from "next/link";

export default function EmptyLetter() {
  return (
    <Link
      href="/writeLetter"
      className="group flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/40"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-90">
        <Plus className="h-5 w-5" />
      </span>
      <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        Escreva uma nova carta
      </p>
    </Link>
  );
}
