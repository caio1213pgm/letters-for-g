import { KeyRound, Send } from "lucide-react";

export default function EnvelopeMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -rotate-2 rounded-3xl bg-gradient-to-br from-primary/10 to-chart-1/20 blur-2xl" />
      <div className="relative rotate-1 rounded-2xl border border-border bg-card p-7 shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between border-b border-dashed border-border pb-4 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Para: G.</span>
          <span className="font-heading text-base normal-case tracking-normal text-primary">
            L · F · G
          </span>
        </div>
        <div className="space-y-3 py-6 font-heading text-2xl leading-snug text-foreground">
          <p>&ldquo;Hoje a saudade chegou</p>
          <p>antes do café.</p>
          <p>Decidi te escrever</p>
          <p>enquanto ela passa...&ldquo;</p>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <KeyRound className="h-3.5 w-3.5" />
            senha • • • • • •
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            <Send className="h-3 w-3" /> Enviar
          </button>
        </div>
      </div>

      {/* tilted second card */}
      <div className="absolute -bottom-6 -left-4 hidden h-24 w-44 -rotate-12 rounded-xl border border-border bg-card shadow-xl md:block">
        <div className="flex h-full items-center justify-center font-heading text-sm text-muted-foreground">
          carta #002 · lida ♥
        </div>
      </div>
    </div>
  );
}
