import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-20">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, oklch(0.828 0.111 230.318), transparent 50%)",
            }}
          />
          <div className="relative max-w-2xl">
            <h2 className="font-heading text-4xl leading-tight md:text-6xl">
              Que carta você escreveria, se tivesse tempo?
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/80">
              Comece agora. Sua primeira carta sai em menos de cinco minutos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="inline-flex items-center gap-2 rounded-full  p-6 text-sm font-medium text-foreground transition-transform"
              >
                <Link href="/register">Criar conta grátis</Link>

                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full border border-primary-foreground/30 p-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary hover:text-accent"
              >
                <Link href="/login">Já tenho conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
