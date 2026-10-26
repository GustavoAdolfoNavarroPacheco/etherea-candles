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
    <header className="site-header sticky top-0 z-30 bg-ivory/85 shadow-[0_10px_40px_-18px_rgba(43,33,24,0.35)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <Link href="/inicio" aria-label="Etherea, inicio" className="press shrink-0">
          <Logo priority className="h-7 w-auto sm:h-11" />
        </Link>
        <nav className="flex items-center gap-4 text-base font-medium tracking-wide sm:gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={pathname === l.href}
              className="navlink text-ink/85 data-[active=true]:text-gold-dark"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="btn-ghost"
            aria-label={`Abrir carrito, ${count} productos`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            <span key={count} className="badge">{count}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
