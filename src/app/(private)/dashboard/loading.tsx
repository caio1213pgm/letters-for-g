import { Mail } from "lucide-react";

const SKELETON_CARDS = 3;

// Espelha o layout de page.tsx e LetterCard para a troca de tela não pular
export default function loadingDashboard() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="w-full py-10 md:py-14"
    >
      <span className="sr-only">Carregando suas cartas</span>

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

        <div
          aria-hidden="true"
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {Array.from({ length: SKELETON_CARDS }, (_, index) => (
            <div
              key={index}
              className="flex min-h-44 animate-pulse flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 shrink-0 rounded-xl bg-primary/10" />
                <span className="h-5 w-3/5 rounded-md bg-muted" />
              </div>
              <div className="mt-4 flex flex-1 flex-col gap-2">
                <span className="h-3 w-full rounded-full bg-muted" />
                <span className="h-3 w-4/5 rounded-full bg-muted" />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-4">
                <span className="h-3 w-20 rounded-full bg-muted" />
                <span className="h-3 w-16 rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
