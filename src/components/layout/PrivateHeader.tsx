import { Mail, UserRound } from "lucide-react";
import Link from "next/link";

export default function PrivateHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6">
            <Mail className="h-4 w-4" />
          </span>
          <span className="font-heading text-3xl leading-none tracking-tight">
            L<span className="text-primary">·</span>F
            <span className="text-primary">·</span>G
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={"/dashboard"}>
            <span className="hover:underline hover:text-accent-foreground cursor-pointer transition-all duration-200">
              Minhas Cartas
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 border-2 p-2 rounded-full cursor-pointer">
          <UserRound />
        </div>
      </div>
    </header>
  );
}
