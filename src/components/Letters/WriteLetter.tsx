/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createLetter } from "@/actions/createLetter";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { LetterPasswordResult } from "@/types/letterReaderType";
import { LetterPasswordSchemaType } from "@/types/letterPasswordType";
import { PenLine, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Tiptap from "../editor/Tiptap";
import LetterPasswordModal from "./LetterPasswordModal";
import LetterUnlockModal from "./LetterUnlockModal";
import { updateLetter } from "@/actions/updateLetter";

type WriteLetterProps = {
  letterData?: any;
};

export default function WriteLetter({ letterData }: WriteLetterProps) {
  const [title, setTitle] = useState(letterData ? letterData.title : "");
  const [readerName, setReaderName] = useState(
    letterData ? letterData.readerName : "",
  );
  const [text, setText] = useState<string>(letterData?.text || "");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [letterLink, setLetterLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canSubmit =
    title.trim() !== "" && text.replace(/<[^>]*>/g, "").trim() !== "";

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
    } catch {
      // Alguns navegadores bloqueiam a cópia fora do clique; o link fica visível no modal
      setLinkCopied(false);
    }
  };

  const handleCreate = ({
    password,
    passwordHint,
  }: LetterPasswordSchemaType) => {
    if (letterData) return;

    startTransition(async () => {
      const { slug } = await createLetter({
        title: title.trim(),
        text,
        password,
        passwordHint,
      });
      const link = `${window.location.origin}/letter/${slug}`;
      setLetterLink(link);
      await copyLink(link);
    });
  };

  const verifyEditPassword = async (
    password: string,
  ): Promise<LetterPasswordResult> => {
    const isValid = await checkLetterPassword(letterData.slug, password);
    return isValid ? { status: "ok" } : { status: "invalid" };
  };

  // Só é chamada depois que a senha foi confirmada no modal
  const handleEditUnlocked = (password: string) => {
    setIsUnlockOpen(false);
    startTransition(async () => {
      const letterUpdateData = {
        text: text,
        id: letterData.id,
        slug: letterData.slug,
        readerName: readerName,
      };
      await updateLetter({
        letterData: letterUpdateData,
        password,
      });
      router.push("/dashboard");
    });
  };

  function labelButton() {
    if (letterData) {
      return "Alterar carta";
    }
    if (isPending) {
      return "Criando...";
    }
    if (isPending && letterData) {
      return "Alterando carta";
    }
    return "Criar carta";
  }

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
            label={!!letterData ? "" : "Título"}
            placeholder="Dê um título para sua carta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!!letterData}
            className="h-auto rounded-md border-0 border-b border-dashed border-border bg-transparent px-4 py-2 font-heading text-2xl text-foreground shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-3xl"
          />

          <div className="mt-5">
            <Tiptap content={text} onChange={setText} />
          </div>

          <div className="mt-4 flex justify-between">
            <Input
              label=""
              placeholder="Para:"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
              // className="rounded-none border-0 border-b border-dashed border-border bg-transparent px-0 pb-4 font-heading text-2xl text-foreground shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-3xl"
            />
            <Button
              onClick={() => {
                if (letterData) {
                  setIsUnlockOpen(true);
                  return;
                }
                setIsPasswordOpen(true);
              }}
              disabled={!canSubmit || isPending}
            >
              <Send />
              {labelButton()}
            </Button>
          </div>
        </div>
      </div>

      <LetterPasswordModal
        open={isPasswordOpen}
        onOpenChange={setIsPasswordOpen}
        onConfirm={handleCreate}
        isPending={isPending}
        letterLink={letterLink}
        linkCopied={linkCopied}
        onCopyLink={() => letterLink && copyLink(letterLink)}
        onFinish={() => router.push("/dashboard")}
      />

      {letterData && isUnlockOpen && (
        <LetterUnlockModal
          mode="edit"
          preview={{
            slug: letterData.slug,
            authorName: letterData.authorName,
            passwordHint: letterData.passwordHint,
          }}
          verifyPassword={verifyEditPassword}
          onUnlocked={handleEditUnlocked}
          onCancel={() => setIsUnlockOpen(false)}
        />
      )}
    </section>
  );
}
