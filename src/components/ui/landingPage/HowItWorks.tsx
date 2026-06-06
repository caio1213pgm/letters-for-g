import { KeyRound, PenLine, Send } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: PenLine,
      title: "Escreva a carta",
      text: "Um editor calmo, sem distrações. Só você, a página em branco e o que precisa ser dito.",
    },
    {
      icon: KeyRound,
      title: "Defina uma senha",
      text: "Só quem deve ler vai ler. Uma palavra que vocês dois conhecem basta.",
    },
    {
      icon: Send,
      title: "Envie o link",
      text: "Compartilhe por onde quiser. Ao abrir, ela digita a senha e a carta aparece.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="border-t border-border bg-muted/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Como funciona
          </p>
          <h2 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">
            Três passos entre o que você sente e o que ela(e) lê.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-heading text-3xl text-muted-foreground/40">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
