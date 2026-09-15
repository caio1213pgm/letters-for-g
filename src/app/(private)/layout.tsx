import { AuthProvider } from "@/components/context/AuthContext";
import PrivateHeader from "@/components/layout/PrivateHeader";
import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <AuthProvider>
          <PrivateHeader />
          <div className="max-w-3xl h-full my-auto mx-auto">{children}</div>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}
