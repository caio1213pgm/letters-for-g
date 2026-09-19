"use client";

import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useState } from "react";
import Tiptap from "../editor/Tiptap";

export default function WriteLetter() {
  const [title, setTitle] = useState("");

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
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

        <div className="w-full rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-10">
          <Input
            label="Título"
            placeholder="Dê um título para sua carta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-auto rounded-none border-0 border-b border-dashed border-border bg-transparent px-0 pb-4 font-heading text-2xl text-foreground shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-3xl"
          />

          <div className="mt-8">
            <Tiptap />
          </div>
        </div>
      </div>
    </section>
  );
}
