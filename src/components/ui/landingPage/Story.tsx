export default function Story() {
  return (
    <section id="historia" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          A história por trás
        </p>
        <h2 className="mt-4 font-heading text-4xl leading-tight md:text-5xl">
          Nasceu de uma distância — e de uma vontade enorme de encurtá-la.
        </h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Um desenvolvedor, longe da namorada, começou a sentir que mensagens
            rápidas não cabiam tudo o que queria dizer. Faltava o gesto de{" "}
            <em className="font-heading text-foreground">escrever uma carta</em>{" "}
            — pausar, pensar, escolher cada palavra.
          </p>
          <p>
            Foi assim que{" "}
            <span className="font-heading text-primary">Letters-for-G</span>{" "}
            apareceu: um lugar simples para escrever cartas de verdade,
            fechá-las com uma senha e mandar para a pessoa certa por um link.
          </p>
          <p className="font-heading text-2xl italic text-foreground">
            &ldquo;Porque algumas coisas só dizem o que precisam quando são
            escritas devagar.&ldquo;
          </p>
        </div>
      </div>
    </section>
  );
}
