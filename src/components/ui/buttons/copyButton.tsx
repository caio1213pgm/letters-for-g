"use client";
import { CheckCheck, Copy } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

export default function CopyButton({
  letterSlug,
}: {
  letterSlug: string | number;
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = async () => {
    const link = `${window.location.origin}/letter/${letterSlug}`;
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
    } catch {
      setLinkCopied(false);
    }
  };
  return (
    <Button
      variant="outline"
      className="max-w-10 rounded-md py-4 cursor-pointer"
      onClick={async () => await copyLink()}
    >
      {linkCopied ? <CheckCheck /> : <Copy />}
    </Button>
  );
}
