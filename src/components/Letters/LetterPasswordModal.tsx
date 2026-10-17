"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { letterPasswordSchema } from "@/schemas/letterPassword.schema";
import { LetterPasswordSchemaType } from "@/types/letterPasswordType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";

type LetterPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: LetterPasswordSchemaType) => void;
  isPending: boolean;
};

export default function LetterPasswordModal({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: LetterPasswordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LetterPasswordSchemaType>({
    resolver: zodResolver(letterPasswordSchema),
    defaultValues: { password: "", passwordHint: "" },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col items-center gap-5 px-5 pt-8 pb-6 sm:px-7">
        <div className="grid size-18 place-items-center rounded-full border-[1.5px] border-dashed border-primary/45">
          <span className="grid size-13 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
            <Lock className="size-5" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <DialogTitle className="text-2xl tracking-tight">
            Lacre sua carta
          </DialogTitle>
          <DialogDescription className="max-w-75 leading-relaxed">
            Só quem souber a senha consegue abrir e ler o que você escreveu.
          </DialogDescription>
        </div>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onConfirm)}
        >
          <div className="flex flex-col gap-1.5">
            <Input
              label="Senha da carta"
              type="password"
              placeholder="Pelo menos 4 caracteres"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className="h-10 rounded-xl"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 border-t border-dashed border-border pt-4">
            <Input
              label="Dica para quem vai ler (opcional)"
              placeholder="Ex.: a cidade onde a gente se conheceu"
              autoComplete="off"
              aria-invalid={!!errors.passwordHint}
              className="h-10 rounded-xl"
              {...register("passwordHint")}
            />
            {errors.passwordHint ? (
              <p className="text-sm text-red-500">
                {errors.passwordHint.message}
              </p>
            ) : (
              <p className="text-xs leading-relaxed text-muted-foreground">
                A dica aparece na tela de senha. Não coloque a própria senha
                aqui.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 w-full rounded-xl"
            >
              <Lock />
              {isPending ? "Lacrando..." : "Lacrar e criar carta"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                className="h-10 w-full rounded-xl text-muted-foreground"
              >
                Voltar ao editor
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
