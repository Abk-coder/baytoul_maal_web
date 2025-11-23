import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

import prisma from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.settings.findUnique({
    where: { id: "default-settings" },
  });

  const siteName = settings?.siteName || "Baytul Maal";
  const description = settings?.description || "Association caritative musulmane dédiée à la solidarité et à l'entraide.";
  const siteUrl = settings?.siteUrl || "https://baytulmaal.sn";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: description,
    openGraph: {
      title: siteName,
      description: description,
      url: siteUrl,
      siteName: siteName,
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: description,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
