import Link from "next/link";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import UserProfile from "../userProfile";

export default async function GroupButtonsHeader() {
  const session = await auth();
  if (session?.user) {
    return <UserProfile />;
  }
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className="rounded-full px-4 py-4 text-sm font-medium text-foreground transition-colors hover:brightness-90"
      >
        <Link href="/login">Entrar</Link>
      </Button>
      <Button
        variant="default"
        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
      >
        <Link href="/register">Registrar</Link>

        <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
