import MainHeader from "@/components/layout/header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="max-w-3xl h-full my-auto mx-auto">{children}</div>
    </>
  );
}
