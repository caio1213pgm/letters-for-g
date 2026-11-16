"use client";

import { createLetter } from "@/actions/createLetter";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { updateLetter } from "@/actions/updateLetter";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { LetterPasswordResult } from "@/types/letterReaderType";
import { LetterPasswordSchemaType } from "@/types/letterPasswordType";
import { EditableLetterType } from "@/types/letterType";
import { stripHtml } from "@/utils/stripHtml";
import { PenLine, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Tiptap from "../editor/Tiptap";
import LetterPasswordModal from "./LetterPasswordModal";
import LetterUnlockModal from "./LetterUnlockModal";

type WriteLetterProps = {
  letterData?: EditableLetterType;
};

export default function WriteLetter({ letterData }: WriteLetterProps) {
  const isEdit = letterData !== undefined;

  const [title, setTitle] = useState(letterData?.title ?? "");
  const [readerName, setReaderName] = useState(letterData?.readerName ?? "");
  const [text, setText] = useState(letterData?.text ?? "");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [letterLink, setLetterLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canSubmit =
    title.trim() !== "" && readerName.trim() !== "" && stripHtml(text) !== "";

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
    if (isEdit) return;
    setFormError(null);

    startTransition(async () => {
      const result = await createLetter({
        title: title.trim(),
        readerName: readerName.trim(),
        text,
        password,
        passwordHint,
      });
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      const link = `${window.location.origin}/letter/${result.data.slug}`;
      setLetterLink(link);
      await copyLink(link);
    });
  };

  const verifyEditPassword = async (
    password: string,
  ): Promise<LetterPasswordResult> => {
    if (!letterData) return { status: "not_found" };
    const isValid = await checkLetterPassword(letterData.slug, password);
    return isValid ? { status: "ok" } : { status: "invalid" };
  };

  // Só é chamada depois que a senha foi confirmada no modal
  // (ou direto, para cartas antigas sem senha)
  const handleEditUnlocked = (password: string) => {
    if (!letterData) return;
    setIsUnlockOpen(false);
    setFormError(null);
    startTransition(async () => {
      const result = await updateLetter({
        slug: letterData.slug,
        letterData: {
          title: title.trim(),
          readerName: readerName.trim(),
          text,
        },
        password,
      });
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      router.push("/dashboard");
    });
  };

  const handleSubmitClick = () => {
    setFormError(null);
    if (!isEdit) {
      setIsPasswordOpen(true);
      return;
    }
    if (letterData.hasPassword) {
      setIsUnlockOpen(true);
      return;
    }
    handleEditUnlocked("");
  };

  function labelButton() {
    if (isPending) return isEdit ? "Alterando..." : "Criando...";
    return isEdit ? "Alterar carta" : "Criar carta";
  }

  return (
    <section className="w-full py-4 md:py-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <PenLine className="h-3 w-3 text-primary" />
            {isEdit ? "Alterar carta" : "Nova carta"}
          </span>
          <h1 className="font-heading text-2xl leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Um editor calmo, sem distrações.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Escreva devagar, escolha cada palavra. Sua carta fica guardada por
            aqui até você decidir enviá-la.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-border bg-card p-4 shadow-xl shadow-primary/5 sm:p-5 md:p-6">
          <Input
            label="Título"
            placeholder="Dê um título para sua carta"
            value={title}
            maxLength={120}
            onChange={(e) => setTitle(e.target.value)}
            className="h-auto rounded-md border-0 border-b border-dashed border-border bg-transparent px-4 py-2 font-heading text-2xl text-foreground shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-3xl"
          />

          <div className="mt-5">
            <Tiptap content={text} onChange={setText} />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="w-full sm:max-w-xs">
              <Input
                label="Para"
                placeholder="Nome de quem vai ler"
                value={readerName}
                maxLength={80}
                onChange={(e) => setReaderName(e.target.value)}
                className="h-11 text-base"
              />
            </div>
            <Button
              onClick={handleSubmitClick}
              disabled={!canSubmit || isPending}
              className="h-11 w-full sm:w-auto"
            >
              <Send />
              {labelButton()}
            </Button>
          </div>

          {formError && (
            <p role="alert" className="mt-3 text-sm text-red-500">
              {formError}
            </p>
          )}
        </div>
      </div>

      <LetterPasswordModal
        open={isPasswordOpen}
        onOpenChange={setIsPasswordOpen}
        onConfirm={handleCreate}
        isPending={isPending}
        error={formError}
        letterLink={letterLink}
        linkCopied={linkCopied}
        onCopyLink={() => letterLink && copyLink(letterLink)}
        onFinish={() => router.push("/dashboard")}
      />

      {isEdit && isUnlockOpen && (
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
