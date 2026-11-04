"use client";

import { Button } from "@/components/ui/buttons/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  LetterPasswordResult,
  LetterPreviewType,
  UnlockedLetterType,
} from "@/types/letterReaderType";
import { UnlockLetterSchemaType } from "@/types/unlockLetterType";
import { unlockLetterSchema } from "@/schemas/unlockLetter.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LockOpen } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type LetterUnlockModalProps = {
  preview: LetterPreviewType;
  // "read": leitor abrindo a carta. "edit": autor confirmando a senha para alterar
  mode?: "read" | "edit";
  verifyPassword: (password: string) => Promise<LetterPasswordResult>;
  onUnlocked: (password: string, letter?: UnlockedLetterType) => void;
  // Com onCancel o modal pode ser fechado; sem ele, o leitor precisa digitar a senha
  onCancel?: () => void;
};

function invalidMessage(remaining: number | undefined) {
  if (remaining === undefined) return "Senha incorreta.";
  return remaining === 1
    ? "Senha incorreta. Resta 1 tentativa."
    : `Senha incorreta. Restam ${remaining} tentativas.`;
}

function blockedMessage(minutes: number) {
  return `Muitas tentativas erradas. Tente de novo em ${minutes} ${minutes === 1 ? "minuto" : "minutos"}.`;
}

export default function LetterUnlockModal({
  preview,
  mode = "read",
  verifyPassword,
  onUnlocked,
  onCancel,
}: LetterUnlockModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnlockLetterSchemaType>({
    resolver: zodResolver(unlockLetterSchema),
    defaultValues: { password: "" },
  });

  const isEdit = mode === "edit";
  const author = preview.authorName || "Alguém";
  const errorMessage = errors.password?.message ?? serverError;

  const onSubmit = ({ password }: UnlockLetterSchemaType) => {
    setServerError(null);
    startTransition(async () => {
      const result = await verifyPassword(password);

      if (result.status === "ok") {
        onUnlocked(password, result.letter);
        return;
      }
      if (result.status === "invalid") {
        setServerError(invalidMessage(result.remainingAttempts));
      }
      if (result.status === "blocked") {
        setIsBlocked(true);
        setServerError(blockedMessage(result.retryInMinutes));
      }
      if (result.status === "not_found") {
        setIsBlocked(true);
        setServerError("Esta carta não está mais disponível.");
      }
      reset({ password: "" });
    });
  };

  return (
    <Dialog open onOpenChange={(next) => !next && onCancel?.()}>
      <DialogContent
        onEscapeKeyDown={(e) => {
          if (!onCancel) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (!onCancel) e.preventDefault();
        }}
        className="flex flex-col items-center gap-5 px-5 pt-8 pb-6 sm:px-7"
      >
        <div className="grid size-18 place-items-center rounded-full border-[1.5px] border-dashed border-primary/45">
          <span className="grid size-13 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
            <Lock className="size-5" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <DialogTitle className="text-2xl tracking-tight">
            {isEdit ? "Confirme a senha" : "Esta carta está lacrada"}
          </DialogTitle>
          <DialogDescription className="max-w-75 leading-relaxed">
            {isEdit
              ? "Digite a senha da carta para poder alterá-la."
              : `${author} deixou uma carta para você. Digite a senha que vocês combinaram para abrir.`}
          </DialogDescription>
        </div>

        {preview.passwordHint && (
          <div className="flex w-full flex-col gap-0.5 rounded-2xl border border-dashed border-primary/35 bg-primary/5 px-3.5 py-3">
            <span className="text-xs font-medium text-primary">
              {isEdit ? "Sua dica" : `Dica de ${author}`}
            </span>
            <span className="text-sm text-foreground">
              {preview.passwordHint}
            </span>
          </div>
        )}

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1.5">
            <Input
              label="Senha da carta"
              type="password"
              placeholder="Digite a senha"
              autoComplete="off"
              autoFocus
              disabled={isBlocked}
              aria-invalid={!!errorMessage}
              className="h-11 rounded-xl text-base"
              {...register("password")}
            />
            {errorMessage && (
              <p role="alert" className="text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending || isBlocked}
            className="h-11 w-full rounded-xl"
          >
            <LockOpen />
            {isPending
              ? isEdit
                ? "Confirmando..."
                : "Abrindo..."
              : isEdit
                ? "Confirmar"
                : "Abrir carta"}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isPending}
              className="h-10 w-full rounded-xl text-muted-foreground"
            >
              Cancelar
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
