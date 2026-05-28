import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
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
          <p className="mx-auto text-muted-foreground hover:text-foreground hover:cursor-pointer transition-all duration-200">
            Crie sua conta
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
