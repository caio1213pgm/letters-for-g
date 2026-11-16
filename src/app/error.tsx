"use client";

import { Button } from "@/components/ui/buttons/button";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
        Algo deu errado.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Não conseguimos concluir o que você pediu. Tente de novo em instantes.
      </p>
      <Button onClick={reset} className="rounded-full px-5">
        Tentar novamente
      </Button>
    </main>
  );
}
