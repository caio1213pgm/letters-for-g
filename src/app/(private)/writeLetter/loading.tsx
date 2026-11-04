import { PenLine } from "lucide-react";

// Espelha o layout de WriteLetter para a troca de tela não pular
export default function loadingWriteLetter() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="w-full py-4 md:py-6"
    >
      <span className="sr-only">Abrindo o editor</span>

      <div className="mx-auto flex min-w-2xl flex-col items-center gap-5 px-4 md:max-w-2xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <PenLine className="h-3 w-3 text-primary" />
            Nova carta
          </span>
          <h1 className="font-heading text-3xl leading-tight tracking-tight md:text-4xl">
            Um editor calmo, sem distrações.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Escreva devagar, escolha cada palavra. Sua carta fica guardada por
            aqui até você decidir enviá-la.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="w-full animate-pulse rounded-3xl border border-border bg-card p-5 shadow-xl shadow-primary/5 md:p-6"
        >
          <div className="flex items-center border-b border-dashed border-border pb-4">
            <span className="h-8 w-2/3 rounded-lg bg-muted md:h-9" />
          </div>

          <div className="mt-5 flex w-full flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-muted" />
              <span className="h-8 w-8 rounded-lg bg-muted" />
              <span className="h-8 w-8 rounded-lg bg-muted" />
              <span className="h-8 w-8 rounded-lg bg-muted" />
            </div>
            <div className="flex min-h-56 flex-col gap-3 rounded-2xl border border-border bg-background px-6 py-5">
              <span className="h-3 w-full rounded-full bg-muted" />
              <span className="h-3 w-11/12 rounded-full bg-muted" />
              <span className="h-3 w-4/5 rounded-full bg-muted" />
              <span className="h-3 w-3/5 rounded-full bg-muted" />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <span className="h-8 w-28 rounded-lg bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
