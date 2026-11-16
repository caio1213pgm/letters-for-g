import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";

const instrumentSansHeading = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Letters-for-G",
    template: "%s · Letters-for-G",
  },
  description:
    "Escreva uma carta, lacre com uma senha e envie o link para alguém especial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        instrumentSansHeading.variable,
      )}
    >
      {/* Extensões do navegador (Grammarly, ColorZilla, gerenciadores de senha)
          injetam atributos no body antes do React hidratar. O aviso vale só
          para este elemento, não para os filhos. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
