/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createLetter } from "@/actions/createLetter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LetterPasswordSchemaType } from "@/types/letterPasswordType";
import { PenLine, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Tiptap from "../editor/Tiptap";
import LetterPasswordModal from "./LetterPasswordModal";

type WriteLetterProps = {
  letterData?: any;
};

export default function WriteLetter({ letterData }: WriteLetterProps) {
  const [title, setTitle] = useState(letterData ? letterData.title : "");
  const [text, setText] = useState<string>(letterData?.text || "");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canSubmit = title.trim() !== "" && text.replace(/<[^>]*>/g, "").trim() !== "";

  const handleCreate = ({ password, passwordHint }: LetterPasswordSchemaType) => {
    if (letterData) return;

    startTransition(async () => {
      await createLetter({ title: title.trim(), text, password, passwordHint });
      router.push("/dashboard");
    });
  };

  return (
    <section className="w-full py-4 md:py-6">
      <div className="mx-auto flex min-w-2xl md:max-w-2xl flex-col items-center gap-5 px-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <PenLine className="h-3 w-3 text-primary" />
            Nova carta
          </span>
          <h1 className="font-heading text-3xl leading-tight tracking-tight md:text-4xl">
            Um editor calmo, sem distrações.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Escreva devagar, escolha cada palavra. Sua carta fica guardada por
            aqui até você decidir enviá-la.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-border bg-card p-5 shadow-xl shadow-primary/5 md:p-6">
          <Input
            label="Título"
            placeholder="Dê um título para sua carta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-auto rounded-none border-0 border-b border-dashed border-border bg-transparent px-0 pb-4 font-heading text-2xl text-foreground shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-3xl"
          />

          <div className="mt-5">
            <Tiptap content={letterData?.text || ""} onChange={setText} />
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => !letterData && setIsPasswordOpen(true)}
              disabled={!canSubmit || isPending}
            >
              <Send />
              {isPending ? "Criando..." : "Criar carta"}
            </Button>
          </div>
        </div>
      </div>

      <LetterPasswordModal
        open={isPasswordOpen}
        onOpenChange={setIsPasswordOpen}
        onConfirm={handleCreate}
        isPending={isPending}
      />
    </section>
  );
}
