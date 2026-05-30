import { createAndViewUser } from "@/lib/testeFnUser";

export default async function Home() {
  const users = await createAndViewUser();

  console.log(users);

  return (
    <main className="h-full w-full mx-auto">
      <div>página inicial</div>
    </main>
  );
}
