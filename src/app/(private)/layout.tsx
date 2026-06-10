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
        <PrivateHeader />
        <div className="max-w-3xl h-full my-auto mx-auto">{children}</div>
      </SessionProvider>
    </>
  );
}
