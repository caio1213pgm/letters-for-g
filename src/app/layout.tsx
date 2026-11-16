import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Caveat,
  Dancing_Script,
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter,
  Lora,
} from "next/font/google";
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

// Fontes opcionais do editor de cartas: sem preload, só baixam quando uma carta as usa
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  preload: false,
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  preload: false,
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  preload: false,
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
        lora.variable,
        caveat.variable,
        dancingScript.variable,
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
