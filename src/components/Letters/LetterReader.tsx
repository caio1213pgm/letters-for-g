"use client";

import {
  LetterPreviewType,
  UnlockedLetterType,
} from "@/types/letterReaderType";
import { useEffect, useRef, useState } from "react";
import EnvelopeOpening from "./EnvelopeOpening";
import LetterPaper from "./LetterPaper";
import LetterUnlockModal from "./LetterUnlockModal";

type LetterReaderProps = {
  preview: LetterPreviewType;
  initialLetter: UnlockedLetterType | null;
};

type ReaderPhase = "locked" | "opening" | "open";

// Mesma duração das animações do envelope em globals.css
const OPENING_DURATION_MS = 2350;

// O estado vem só do primeiro render: o cookie gravado pelo unlockLetter faz o
// Next renderizar a página de novo com initialLetter preenchido, e isso não pode
// interromper a animação que já está rodando
export default function LetterReader({
  preview,
  initialLetter,
}: LetterReaderProps) {
  const [phase, setPhase] = useState<ReaderPhase>(
    initialLetter ? "open" : "locked",
  );
  const [letter, setLetter] = useState<UnlockedLetterType | null>(
    initialLetter,
  );
  const [animateLetter, setAnimateLetter] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleUnlocked = (unlocked: UnlockedLetterType) => {
    setLetter(unlocked);
    setAnimateLetter(true);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setPhase("open");
      return;
    }

    setPhase("opening");
    timerRef.current = window.setTimeout(
      () => setPhase("open"),
      OPENING_DURATION_MS,
    );
  };

  if (phase === "opening") return <EnvelopeOpening />;
  if (phase === "open" && letter) {
    return <LetterPaper letter={letter} animate={animateLetter} />;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="flex flex-col gap-4 rounded-[20px] border border-border bg-card p-6 blur-[5px] sm:p-10 md:p-14"
      >
        <div className="h-8 w-3/4 rounded-lg bg-muted" />
        <div className="h-3 w-full rounded-full bg-muted" />
        <div className="h-3 w-11/12 rounded-full bg-muted" />
        <div className="h-3 w-full rounded-full bg-muted" />
        <div className="h-3 w-3/5 rounded-full bg-muted" />
      </div>
      <LetterUnlockModal preview={preview} onUnlocked={handleUnlocked} />
    </>
  );
}
