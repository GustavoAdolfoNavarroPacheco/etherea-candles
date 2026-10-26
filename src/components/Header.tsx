"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useIconHover } from "@animateicons/react";
import { SearchIcon, ShoppingCartIcon } from "@animateicons/react/lucide";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/inicio", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const { ref: cartRef, triggerProps: cartTrigger } = useIconHover();
  const { ref: searchRef, triggerProps: searchTrigger } = useIconHover();
  // La búsqueda solo existe en /catalogo; guardar la ruta donde se abrió la cierra al navegar.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isCatalog = pathname === "/catalogo";
  const searching = isCatalog && openOn === pathname;
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // La búsqueda vive en la URL (?q=) para que el catálogo la lea y sea compartible.
  const applyQuery = (q: string) => {
    const params = new URLSearchParams(window.location.search);
    if (q.trim()) params.set("q", q);
    else params.delete("q");
    const qs = params.toString();
    window.dispatchEvent(new Event("catalog:before-change"));
    router.replace(`/catalogo${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const toggleSearch = () => {
    if (searching) {
      setOpenOn(null);
      return;
    }
    setValue(new URLSearchParams(window.location.search).get("q") ?? "");
    setOpenOn(pathname);
  };

  useEffect(() => {
    const clear = () => setValue("");
    window.addEventListener("catalog:query-cleared", clear);
    return () => window.removeEventListener("catalog:query-cleared", clear);
  }, []);

  useEffect(() => {
    if (searching) inputRef.current?.focus();
  }, [searching]);

  useEffect(() => {
    if (!searching) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searching]);

  return (
    <header className="site-header sticky top-0 z-30 bg-ivory/85 shadow-[0_8px_28px_-18px_rgba(43,33,24,0.22)] backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:px-5">
        <Link href="/inicio" aria-label="Etherea, inicio" className="press shrink-0 justify-self-start">
          <span aria-hidden="true" className="block aspect-[959/199] h-6 bg-gold-dark [mask-image:url(/logo.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] sm:h-10" />
        </Link>
        <nav className="flex items-center gap-3 text-base font-medium tracking-wide sm:gap-12 sm:text-lg">
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
        </nav>
        <div className="flex items-center gap-2 justify-self-end sm:gap-5">
          {isCatalog && (
            <button
              {...searchTrigger}
              onClick={toggleSearch}
              className="press p-1 text-gold-dark"
              aria-label="Buscar velas"
              aria-expanded={searching}
            >
              <SearchIcon ref={searchRef} size={24} duration={1} />
            </button>
          )}
          <button
            {...cartTrigger}
            onClick={() => setOpen(true)}
            className="press relative p-1 text-gold-dark"
            aria-label={`Abrir carrito, ${count} productos`}
          >
            <ShoppingCartIcon ref={cartRef} size={26} duration={1} />
            <span key={count} className="badge absolute -right-2.5 -top-2.5 !h-[1.2rem] !min-w-[1.2rem] !text-[0.75rem] leading-none shadow-[0_2px_6px_-2px_rgba(43,33,24,0.4)]">{count}</span>
          </button>
        </div>
      </div>
      <div
        data-open={searching}
        inert={!searching}
        className="search-panel absolute inset-x-0 top-full"
      >
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            inputRef.current?.blur();
          }}
          className="mx-auto max-w-6xl px-4 py-3 sm:px-5"
        >
          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              applyQuery(e.target.value);
            }}
            placeholder="Buscar velas…"
            aria-label="Buscar velas"
            className="w-full bg-white px-5 py-3 text-base text-ink shadow-[var(--shadow-soft)] outline-none placeholder:text-ink/50"
          />
        </form>
      </div>
    </header>
  );
}
