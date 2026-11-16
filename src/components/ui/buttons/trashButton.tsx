"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { deleteLetter } from "@/actions/deleteLetter";
import { ModalDeleteLetter } from "../modals/ModalDeleteLetter";
import { useState } from "react";

type TrashButtonProps = {
  slug: string;
  hasPassword: boolean;
};

export default function TrashButton({ slug, hasPassword }: TrashButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteLetter = async (password: string) => {
    const result = await deleteLetter(slug, password);
    if (!result.ok) return result.error;
    setOpenModal(false);
    return null;
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        variant="outline"
        title="Excluir carta"
        className="max-w-10 rounded-md py-4 cursor-pointer"
      >
        <Trash2 />
        <span className="sr-only">Excluir carta</span>
      </Button>
      <ModalDeleteLetter
        open={openModal}
        setOpen={setOpenModal}
        requiresPassword={hasPassword}
        onConfirm={handleDeleteLetter}
      />
    </>
  );
}
