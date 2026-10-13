import { getLetterById } from "@/actions/getLetterById";
import WriteLetter from "@/components/Letters/WriteLetter";
import { letterCardType } from "@/types/letterCardType";

export default async function WriteLetterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const urlParams = await params;

  const letterData = await getLetterById(urlParams.slug);
  if (!letterData) {
    return (
      <div>
        <h1>Letter not found</h1>
      </div>
    );
  }
  return <WriteLetter letterData={letterData} />;
}
