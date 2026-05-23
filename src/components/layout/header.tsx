import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function MainHeader() {
  return (
    <div className="w-full bg-primary flex justify-between items-center py-4 px-10">
      <Label className="text-4xl">L - F - G</Label>
      <div className="flex gap-2">
        <Button variant="secondary" size="lg" className="px-4">
          Entrar
        </Button>
        <Button variant="outline" size="lg" className="px-4">
          Registrar
        </Button>
      </div>
    </div>
  );
}
