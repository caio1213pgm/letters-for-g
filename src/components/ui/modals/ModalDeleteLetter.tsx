"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../buttons/button";

type ModalDeleteLetterProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  // Cartas antigas sem senha só pedem a confirmação
  requiresPassword: boolean;
  // Retorna a mensagem de erro, ou null quando a carta foi excluída
  onConfirm: (password: string) => Promise<string | null>;
};

type DeleteLetterFormProps = Pick<
  ModalDeleteLetterProps,
  "requiresPassword" | "onConfirm"
>;

function DeleteLetterForm({
  requiresPassword,
  onConfirm,
}: DeleteLetterFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const canSubmit = !isDeleting && (!requiresPassword || password !== "");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsDeleting(true);
    setError(null);
    try {
      const result = await onConfirm(password);
      if (result) setError(result);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Excluir carta</DialogTitle>
        <DialogDescription>
          Uma carta excluída não pode ser restaurada.
          {requiresPassword && (
            <>
              <br />
              <span className="font-semibold text-foreground">
                Digite a senha da carta para confirmar.
              </span>
            </>
          )}
        </DialogDescription>
      </DialogHeader>
      {requiresPassword && (
        <div className="flex flex-col gap-1.5">
          <Input
            label="Senha da carta"
            type="password"
            placeholder="Digite a senha"
            autoComplete="off"
            autoFocus
            value={password}
            aria-invalid={!!error}
            onChange={handlePasswordChange}
          />
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      )}
      {!requiresPassword && error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isDeleting}>
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" variant="destructive" disabled={!canSubmit}>
          {isDeleting ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function ModalDeleteLetter({
  open,
  setOpen,
  requiresPassword,
  onConfirm,
}: ModalDeleteLetterProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        {/* Remontar o form a cada abertura zera senha e erro */}
        {open && (
          <DeleteLetterForm
            requiresPassword={requiresPassword}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
