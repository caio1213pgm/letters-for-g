import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import FooterAuthForms from "../footerAuthForms";
import ButtonsLogin from "./buttonsLogin";
import InputCredentialsLogin from "./inputCredentialsLogin";

export default function FormLogin() {
  return (
    <div className="overflow-x-hidden">
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
      <Card className="w-xs sm:w-md py-5 border">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Insira suas credencias ou entre com sua conta google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <InputCredentialsLogin />
            <ButtonsLogin />
          </div>
        </CardContent>
        <CardFooter>
          <FooterAuthForms label="Crie sua conta" path="/register" />
        </CardFooter>
      </Card>
    </div>
  );
}
