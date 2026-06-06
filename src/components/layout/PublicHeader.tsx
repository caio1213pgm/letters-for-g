import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6">
            <Mail className="h-4 w-4" />
          </span>
          <span className="font-heading text-3xl leading-none tracking-tight">
            L<span className="text-primary">·</span>F
            <span className="text-primary">·</span>G
          </span>
        </Link>

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
      </div>
    </header>
  );
}
