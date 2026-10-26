import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Etherea Handmade Candles | Velas artesanales",
  description:
    "Velas artesanales hechas a mano. Colecciones Serenidad, Energía y Etherea. Pedidos por WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SmoothScroll />
        </CartProvider>
      </body>
    </html>
  );
}
