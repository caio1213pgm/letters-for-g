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
    <div>
      <Card className="w-xs sm:w-md py-5">
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
