import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Saosini - Especialistas en el Mundo de los Cuyes",
    template: "%s | Saosini"
  },
  description: "Especialistas en la venta de cuyes reproductores de alta calidad genética, alimento balanceado, accesorios y medicamentos. Envíos en todo el Perú.",
  keywords: ["cuyes reproductores", "granja de cuyes", "alimento para cuyes", "cuyes peru", "genética de cuyes"],
  openGraph: {
    title: "Saosini - Especialistas en el Mundo de los Cuyes",
    description: "Venta de reproductores y suministros para la crianza técnica de cuyes.",
    url: "https://saosinicuyes.com",
    siteName: "Saosini",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saosini",
    description: "Calidad premium en reproductores y suministros para cuyes.",
  }
};

import { AuthProvider } from "@/components/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable} ${plusJakarta.variable} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
