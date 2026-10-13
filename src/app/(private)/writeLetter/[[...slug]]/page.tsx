import { getLetterById } from "@/actions/getLetterById";
import WriteLetter from "@/components/Letters/WriteLetter";
import Link from "next/link";

export default async function WriteLetterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const urlParams = await params;

  const letterData = await getLetterById(urlParams.slug[0]);

  if (!letterData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>Carta não encontrada</h1>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Voltar para a página de cartas
        </Link>
      </div>
    );
  }

  return <WriteLetter letterData={letterData} />;
}
