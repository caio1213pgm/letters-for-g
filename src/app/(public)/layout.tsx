import Footer from "@/components/layout/PublicFooter";
import Header from "@/components/layout/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="h-full">{children}</div>
      <Footer />
    </>
  );
}
