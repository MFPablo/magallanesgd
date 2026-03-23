import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/ui/GridBackground";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/animations/CustomCursor";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebas = localFont({
  src: "../fonts/BebasNeue-Regular.woff2",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Pedro Magallanes | Diseñador Gráfico",
  description:
    "Portfolio de Pedro Magallanes - Diseñador Gráfico Artístico Digital",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-[var(--color-cream)] text-[var(--color-dark)] font-[family-name:var(--font-inter)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <GridBackground />
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
