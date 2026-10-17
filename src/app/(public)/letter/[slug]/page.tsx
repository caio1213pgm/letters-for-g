import { getPublicLetter } from "@/actions/getPublicLetter";
import LetterReader from "@/components/Letters/LetterReader";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type LetterPageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Uma carta para você",
  robots: { index: false, follow: false },
};

export default async function LetterPage({ params }: LetterPageProps) {
  const { slug } = await params;
  const publicLetter = await getPublicLetter(slug);
  if (!publicLetter) notFound();

  return (
    <section className="min-h-[70vh] w-full bg-muted/50 px-4 py-8 md:py-14">
      <div className="mx-auto w-full max-w-170">
        <LetterReader
          preview={publicLetter.preview}
          initialLetter={publicLetter.letter}
        />
      </div>
    </section>
  );
}
