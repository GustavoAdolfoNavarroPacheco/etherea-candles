"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/inicio", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 bg-ivory/85 shadow-[0_10px_40px_-18px_rgba(43,33,24,0.35)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/inicio" aria-label="Etherea, inicio" className="press shrink-0">
          <Logo priority className="h-9 w-auto sm:h-11" />
        </Link>
        <nav className="flex items-center gap-5 text-sm font-light tracking-wide sm:gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={pathname === l.href}
              className="navlink text-ink/80 data-[active=true]:text-gold-dark"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="btn-ghost"
            aria-label={`Abrir carrito, ${count} productos`}
          >
            Carrito
            <span key={count} className="badge">{count}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
