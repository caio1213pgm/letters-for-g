import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <div className="bg-blue-500 py-5">
          <p>Dashboard</p>
        </div>
        <div className="max-w-3xl h-full my-auto mx-auto">{children}</div>
      </SessionProvider>
    </>
  );
}
