"use client";
import { CheckCheck, Copy } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

export default function CopyButton({ letterSlug }: { letterSlug: string }) {
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
      title="Copiar link da carta"
      className="max-w-10 rounded-md py-4 cursor-pointer"
      onClick={copyLink}
    >
      {linkCopied ? <CheckCheck /> : <Copy />}
      <span className="sr-only">Copiar link da carta</span>
    </Button>
  );
}
