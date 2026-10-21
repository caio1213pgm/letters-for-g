"use client";

import { Button } from "./buttons/button";
import { LogOut, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import DropdownMenu, { DropdownArrayProps } from "./dropdown";

export default function UserProfile() {
  const arrayDropdownProfile: DropdownArrayProps[] = [
    {
      id: "1",
      label: "Sair",
      onClick: () => {
        signOut({ redirect: true, redirectTo: "/login" });
      },
      variant: "destructive",
      icon: <LogOut />,
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu
        trigger={
          <Button
            variant="outline"
            className="flex items-center gap-2 border-2 py-4 px-2 rounded-full cursor-pointer"
          >
            <UserRound />
          </Button>
        }
        arrayContent={arrayDropdownProfile}
      />
    </div>
  );
}
