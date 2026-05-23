export default function Home() {
  // const [stateEmail, setStateEmail] = useState("");
  // const [statePassword, setStatePassWord] = useState("");

  // const router = useRouter();

  return (
    <main>
      <div className="flex mx-auto my-auto max-w-3xl h-full">
        {/* <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Ensira seu email e senha para fazer o login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input
                label="Email"
                placeholder="Digite seu email"
                onChange={({ target: { value } }) => setStateEmail(value)}
                value={stateEmail}
              />
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                onChange={({ target: { value } }) => setStatePassWord(value)}
                value={statePassword}
              />
              <Button
                onClick={async () => {
                  const result = await signIn("credentials", {
                    email: stateEmail,
                    password: statePassword,
                    redirect: false,
                  });
                  if (result.error) {
                    alert("email ou senha inválidos");
                    return;
                  }
                  alert("Seja bem vindo");
                  router.push("/dashboard");
                }}
              >
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card> */}
        pagina inicial
      </div>
    </main>
  );
}
