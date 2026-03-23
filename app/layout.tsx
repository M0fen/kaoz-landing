import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Syne, UnifrakturMaguntia, Noto_Sans_JP, Orbitron } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: ["400"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const unifraktur = UnifrakturMaguntia({
  subsets: ["latin"],
  variable: "--font-unifraktur",
  weight: ["400"],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  weight: ["400", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "KAOZ | CROMO COLLECTION",
  description: "// HECHO POR ARTISTAS // PARA ARTISTAS // Acceso a la terminal visual y sonora.",
  openGraph: {
    title: "KAOZ | CROMO COLLECTION",
    description: "// HECHO POR ARTISTAS // PARA ARTISTAS // Acceso a la terminal visual y sonora.",
    type: "website",
    images: [{ url: "/portadagaleria.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${spaceMono.variable} ${syne.variable} ${unifraktur.variable} ${notoSansJP.variable} ${orbitron.variable} antialiased bg-black text-silver selection:bg-brand-red selection:text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
