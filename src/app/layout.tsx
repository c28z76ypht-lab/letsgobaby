import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { getCollections } from "@/lib/shopify";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Let's go baby® — Family Concierge Service in Portugal",
  description:
    "Baby equipment rental and family concierge service in Lisbon, Cascais, Sintra and Porto. Top-quality strollers, car seats, cots and more delivered to your door.",
  keywords:
    "baby equipment rental Portugal, family concierge Lisbon, baby gear hire, stroller rental Lisbon, car seat rental Portugal",
  openGraph: {
    title: "Let's go baby® — Family Concierge Service in Portugal",
    description:
      "Baby equipment rental and family concierge service in Portugal. Everything your family needs for a stress-free holiday.",
    url: "https://www.letsgobaby.pt",
    siteName: "Let's go baby®",
    locale: "en_GB",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCollections = await getCollections();
  const headerCollections = allCollections
    .filter((c) => c.slug !== "all-products")
    .map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header collections={headerCollections} />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
