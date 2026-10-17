"use client";

import { useState } from "react";
import { Button } from "./button";
import { UserRound } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserProfile() {
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <div>
      <div
        onMouseEnter={() => setOpenOptions(true)}
        onMouseLeave={() => setOpenOptions(false)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 border-2 p-2 rounded-full cursor-pointer">
          <UserRound />
        </div>
        {openOptions && (
          <div className="">
            <Button
              variant="destructive"
              onClick={() => {
                signOut({ redirect: true, redirectTo: "/login" });
              }}
            >
              Sair
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
