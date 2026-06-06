import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-heading text-base text-foreground">
            L · F · G
          </span>
          <span>· Letters-for-G</span>
        </div>
        <p className="flex items-center gap-1.5">
          Feito com <Heart className="h-3.5 w-3.5 fill-primary text-primary" />{" "}
          para a G.
        </p>
      </div>
    </footer>
  );
}
