import { Mail } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Mail className="h-5 w-5" />
      </span>
      <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
        Essa página não existe.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        O link pode estar errado ou a carta pode ter sido excluída.
      </p>
      <Link href="/" className="text-sm text-primary hover:underline">
        Voltar para o início
      </Link>
    </main>
  );
}
