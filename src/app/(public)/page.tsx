import FormLogin from "@/components/forms/formLogin";

export default function Home() {
  // const [stateEmail, setStateEmail] = useState("");
  // const [statePassword, setStatePassWord] = useState("");

  // const router = useRouter();

  return (
    <main className="h-full w-full mx-auto">
      <div>
        <FormLogin />
      </div>
    </main>
  );
}
