import Link from "next/link";
import { SITE } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-28 bg-cocoa text-ivory/90 shadow-[0_-20px_40px_-30px_rgba(43,33,24,0.28)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <Logo className="h-10 w-auto brightness-125" />
        </div>
        <div className="text-base">
          <p className="mb-3 text-gold-light">Navegar</p>
          <ul className="space-y-2">
            <li><Link href="/inicio" className="navlink">Inicio</Link></li>
            <li><Link href="/catalogo" className="navlink">Catálogo</Link></li>
            <li><Link href="/politicas" className="navlink">Pagos y envíos</Link></li>
          </ul>
        </div>
        <div className="text-base">
          <p className="mb-3 text-gold-light">Contacto</p>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            className="navlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {SITE.whatsappDisplay}
          </a>
        </div>
      </div>
      <p className="py-5 text-center text-sm text-ivory/70">© Etherea Handmade Candles</p>
    </footer>
  );
}
