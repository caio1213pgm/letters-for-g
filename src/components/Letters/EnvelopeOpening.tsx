import { Lock } from "lucide-react";

export default function EnvelopeOpening() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center perspective-[900px]">
      <span role="status" className="sr-only">
        Abrindo a carta
      </span>
      <div className="envelope" aria-hidden="true">
        <div className="envelope-back" />
        <div className="envelope-paper">
          <div className="h-1.5 w-3/5 rounded-full bg-muted" />
          <div className="h-1.5 w-11/12 rounded-full bg-muted" />
          <div className="h-1.5 w-4/5 rounded-full bg-muted" />
        </div>
        <div className="envelope-front" />
        <div className="envelope-flap">
          <div className="envelope-flap-shape" />
          <span className="envelope-seal">
            <Lock className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
