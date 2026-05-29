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
