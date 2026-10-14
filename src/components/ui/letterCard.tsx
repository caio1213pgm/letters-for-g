import { letterCardType } from "@/types/letterCardType";
import { stripHtml } from "@/utils/stripHtml";
import { Mail } from "lucide-react";
import Link from "next/link";

type letterCardProps = {
  letter: letterCardType;
};

export default function LetterCard({ letter }: letterCardProps) {
  return (
    <div className="group flex min-h-44 cursor-pointer flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <Link href={`/writeLetter/${letter.slug}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-4 w-4" />
          </span>
          <h2 className="truncate font-heading text-lg text-foreground">
            {letter.title}
          </h2>
        </div>
        <p className="mt-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {stripHtml(letter.resume)}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-4 text-xs text-muted-foreground">
          <span>{letter.lastEdit}</span>
          <span className="italic">{letter.author}</span>
        </div>
      </Link>
    </div>
  );
}
