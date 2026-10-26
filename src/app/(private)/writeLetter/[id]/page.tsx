import { getLetterById } from "@/actions/getLetterById";
import WriteLetter from "@/components/Letters/WriteLetter";
import Link from "next/link";

type WriteLetterByIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WriteLetterByIdPage({
  params,
}: WriteLetterByIdPageProps) {
  const { id } = await params;
  const letter = await getLetterById(id);
  if (!letter) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-border bg-card p-6 text-center shadow-xl shadow-primary/5 rounded-2xl">
        <div className="text-center text-lg text-muted-foreground">
          Carta não encontrada.
        </div>
        <Link href="/writeLetter" className="text-blue-500 hover:underline">
          Escrever uma nova carta
        </Link>
      </div>
    );
  }

  if (letter.status === "READ") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-border bg-card p-6 text-center shadow-xl shadow-primary/5 rounded-2xl">
        <div className="text-center text-lg text-muted-foreground">
          Esta carta já foi lida e não pode mais ser editada.
        </div>
        <Link
          href={`/letter/${letter.slug}`}
          className="text-blue-500 hover:underline"
        >
          Ver carta
        </Link>
      </div>
    );
  }

  return <WriteLetter letterData={letter} />;
}
