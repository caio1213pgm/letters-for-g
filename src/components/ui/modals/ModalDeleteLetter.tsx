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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../button";

const VALIDATION_DELAY_MS = 300;

type ModalDeleteLetterProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onValidatePassword: (password: string) => Promise<boolean>;
  onConfirm: (password: string) => Promise<void>;
};

type DeleteLetterFormProps = Pick<
  ModalDeleteLetterProps,
  "onValidatePassword" | "onConfirm"
>;

function DeleteLetterForm({
  onValidatePassword,
  onConfirm,
}: DeleteLetterFormProps) {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (password === "") return;

    let isCurrent = true;
    const timer = setTimeout(async () => {
      const isValid = await onValidatePassword(password);
      if (isCurrent) setIsPasswordValid(isValid);
    }, VALIDATION_DELAY_MS);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [password, onValidatePassword]);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordValid(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPasswordValid || isDeleting) return;

    setIsDeleting(true);
    try {
      await onConfirm(password);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Excluir carta</DialogTitle>
        <DialogDescription>
          Uma carta excluída não pode ser restaurada. <br />{" "}
          <span className="text-gray-700 font-semibold">
            Digite a senha da carta para confirmar.
          </span>
        </DialogDescription>
      </DialogHeader>
      <Input
        label="Senha da carta"
        type="password"
        placeholder="Digite a senha"
        autoComplete="off"
        autoFocus
        value={password}
        onChange={handlePasswordChange}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button
          type="submit"
          variant="destructive"
          disabled={!isPasswordValid || isDeleting}
        >
          {isDeleting ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function ModalDeleteLetter({
  open,
  setOpen,
  onValidatePassword,
  onConfirm,
}: ModalDeleteLetterProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DeleteLetterForm
          onValidatePassword={onValidatePassword}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>
  );
}
