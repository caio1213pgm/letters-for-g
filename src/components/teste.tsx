"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function TesteLogOff() {
  const { data } = useSession();
  return (
    <div className="flex gap-4 w-full">
      <h4>Olá, {data?.user?.name}</h4>
      <Button
        variant="destructive"
        onClick={async () => {
          await signOut({ redirect: true, redirectTo: "/login" });
        }}
      >
        Sair
      </Button>
    </div>
  );
}
