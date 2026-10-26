import LetterContent from "@/components/editor/LetterContent";
import { cn } from "@/lib/utils";
import { UnlockedLetterType } from "@/types/letterReaderType";

type LetterPaperProps = {
  letter: UnlockedLetterType;
  animate?: boolean;
};

export default function LetterPaper({ letter, animate }: LetterPaperProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-[20px] border border-border bg-card p-6 shadow-2xl shadow-primary/10 sm:p-10 md:p-14",
        animate && "letter-rise",
      )}
    >
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 border-b border-dashed border-border pb-4 text-[13px] text-muted-foreground">
        <span>
          Para{" "}
          <strong className="font-medium text-foreground">
            {letter.readerName}
          </strong>
        </span>
        <span>{letter.createdAt}</span>
      </div>

      <h1 className="font-heading text-[clamp(28px,6vw,40px)] leading-[1.12] font-medium tracking-tight">
        {letter.title}
      </h1>

      <LetterContent content={letter.text} />

      <span className="pt-2 font-heading text-2xl italic">
        {letter.authorName}
      </span>
    </article>
  );
}
