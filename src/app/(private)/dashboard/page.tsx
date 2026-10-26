import BoxLetters from "@/components/BoxLetters";
import { Mail } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto flex w-full flex-col items-center gap-8 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Mail className="h-3 w-3 text-primary" />
            Minhas cartas
          </span>
          <h1 className="font-heading text-3xl leading-tight tracking-tight md:text-4xl">
            Tudo o que você já escreveu.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Volte a uma carta antiga ou comece uma nova, quando a vontade
            chegar.
          </p>
        </div>

        <BoxLetters />
      </div>
    </section>
  );
}
