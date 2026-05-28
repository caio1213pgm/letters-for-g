"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function MainHeader() {
  const router = useRouter();
  return (
    <div className="w-full bg-primary flex justify-between items-center py-4 px-10">
      <Label className="text-4xl">L - F - G</Label>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="lg"
          className="px-4"
          onClick={() => router.push("/login")}
        >
          Entrar
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-4"
          onClick={() => router.push("/register")}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
}
