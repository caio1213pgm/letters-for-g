import { Heart, Lock, Mail, Sparkles } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: Lock,
      title: "Senha por carta",
      text: "Cada carta tem sua própria chave. Privacidade desde o primeiro rascunho.",
    },
    {
      icon: Mail,
      title: "Link único",
      text: "Um endereço só seu para enviar — sem cadastro do destinatário.",
    },
    {
      icon: Heart,
      title: "Editor afetuoso",
      text: "Tipografia bonita, foco total. Escrever vira um ritual.",
    },
    {
      icon: Sparkles,
      title: "Para sempre",
      text: "Suas cartas ficam guardadas, prontas para serem relidas.",
    },
  ];

  return (
    <section id="recursos" className="border-t border-border bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Recursos
            </p>
            <h2 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">
              O essencial — e nada além disso.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            L-F-G não tenta ser uma rede social. É só você, sua carta e quem
            você ama do outro lado.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <it.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-heading text-xl">{it.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
