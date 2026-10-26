"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-gold/30 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase text-ink">
          Etherea
        </Link>
        <nav className="flex items-center gap-6 text-sm tracking-wide text-ink/80">
          <Link href="/catalogo" className="hover:text-gold-dark">Catálogo</Link>
          <Link href="/#nosotros" className="hidden hover:text-gold-dark sm:block">Nosotros</Link>
          <Link href="/politicas" className="hidden hover:text-gold-dark sm:block">Políticas</Link>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-gold px-4 py-1.5 text-gold-dark transition hover:bg-gold hover:text-white"
            aria-label={`Abrir carrito, ${count} productos`}
          >
            Carrito ({count})
          </button>
        </nav>
      </div>
    </header>
  );
}
