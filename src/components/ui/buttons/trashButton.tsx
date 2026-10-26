"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { deleteLetter } from "@/actions/deleteLetter";
import { checkLetterPassword } from "@/actions/checkLetterPassword";
import { ModalDeleteLetter } from "../modals/ModalDeleteLetter";
import { useCallback, useState } from "react";

export default function TrashButton({
  letterId,
}: {
  letterId: string | number;
}) {
  const [openModal, setOpenModal] = useState(false);
  const slug = letterId.toString();

  const handleValidatePassword = useCallback(
    (password: string) => checkLetterPassword(slug, password),
    [slug],
  );

  const handleDeleteLetter = async (password: string) => {
    const deleteitem = await deleteLetter(letterId, password);
    if (deleteitem) {
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        variant="outline"
        className="max-w-10 rounded-md py-4 cursor-pointer"
      >
        <Trash2 />
      </Button>
      <ModalDeleteLetter
        open={openModal}
        setOpen={setOpenModal}
        onValidatePassword={handleValidatePassword}
        onConfirm={handleDeleteLetter}
      />
    </>
  );
}
