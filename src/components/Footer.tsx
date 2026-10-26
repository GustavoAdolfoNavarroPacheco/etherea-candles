import Link from "next/link";
import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/30 bg-cocoa text-ivory/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl tracking-[0.2em] uppercase text-gold-light">Etherea</p>
          <p className="mt-2 text-sm">Handmade Candles</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 text-gold-light">Navegar</p>
          <ul className="space-y-1">
            <li><Link href="/catalogo" className="hover:text-gold-light">Catálogo</Link></li>
            <li><Link href="/politicas" className="hover:text-gold-light">Pagos y envíos</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 text-gold-light">Contacto</p>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            className="hover:text-gold-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {SITE.whatsappDisplay}
          </a>
        </div>
      </div>
      <p className="border-t border-ivory/10 py-4 text-center text-xs text-ivory/50">
        © Etherea Handmade Candles
      </p>
    </footer>
  );
}
