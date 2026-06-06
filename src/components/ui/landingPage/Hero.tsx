import { Heart, Lock, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";
import EnvelopeMock from "./EnvelopmentMock";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="paper-texture absolute inset-0 opacity-60" />
      <div
        className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-chart-1), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Cartas em sua forma mais íntima
            </span>

            <h1 className="mt-6 font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Algumas palavras
              <br />
              merecem{" "}
              <em className="ink-underline not-italic text-primary">
                um envelope
              </em>
              .
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              <span className="font-heading text-foreground">
                Letters-for-G
              </span>{" "}
              é um escritor de cartas online. Você escreve, gera um link e envia
              para alguém especial — ela abre, digita a senha e lê só o que é
              dela.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button className="inline-flex items-center gap-2 rounded-full bg-primary p-5.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 ">
                <Link href="/dashboard">Escrever minha primeira carta</Link>
                <PenLine className="h-4 w-4" />
              </Button>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Como funciona
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Protegido por senha
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Feito com carinho
              </div>
            </div>
          </div>

          {/* Right — envelope mock */}
          <EnvelopeMock />
        </div>
      </div>
    </section>
  );
}
