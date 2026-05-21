import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <h1>bem vindoo</h1>
      <p>Olá, {session?.user?.name} você está no letters for g</p>
    </div>
  );
}
