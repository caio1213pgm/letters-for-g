import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FooterAuthForms from "../footerAuthForms";
import InputCredentialRegister from "./inputCredentialsRegister";

export default function FormRegister() {
  return (
    <div>
      <div
        className="pointer-events-none absolute left-1/3 top-1 h-130 w-100 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-chart-1), transparent 50%)",
        }}
      />
      <div
        className="overflow-x-hidden pointer-events-none absolute right-1/8 bottom-3 h-130 w-100 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-chart-1), transparent 50%)",
        }}
      />
      <Card className="w-xs sm:w-md py-5">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>
            Insira seus dados para criar uma nova conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <InputCredentialRegister />
          </div>
        </CardContent>
        <CardFooter>
          <FooterAuthForms
            label="Já possui conta? Faça seu login"
            path="/login"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
