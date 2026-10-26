"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLLECTIONS, type Collection, type Product } from "@/data/products";
import { prefersReducedMotion, revealAll } from "@/lib/motion";
import { Dropdown } from "./Dropdown";
import { ProductCard } from "./ProductCard";

const normalize = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

type SortKey = "relevantes" | "vendidos" | "az" | "za" | "precio-asc" | "precio-desc" | "fecha-asc" | "fecha-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevantes", label: "Más relevantes" },
  { key: "vendidos", label: "Más vendidos" },
  { key: "az", label: "Alfabéticamente, A-Z" },
  { key: "za", label: "Alfabéticamente, Z-A" },
  { key: "precio-asc", label: "Precio, menor a mayor" },
  { key: "precio-desc", label: "Precio, mayor a menor" },
  { key: "fecha-asc", label: "Fecha: antiguo(a) a reciente" },
  { key: "fecha-desc", label: "Fecha: reciente a antiguo(a)" },
];

const byName = (a: Product, b: Product) => a.nombre.localeCompare(b.nombre, "es");
const byDate = (a: Product, b: Product) => (a.fecha ?? "").localeCompare(b.fecha ?? "");

const COMPARATORS: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  relevantes: null,
  vendidos: (a, b) => (b.vendidos ?? 0) - (a.vendidos ?? 0),
  az: byName,
  za: (a, b) => byName(b, a),
  "precio-asc": (a, b) => a.precio - b.precio,
  "precio-desc": (a, b) => b.precio - a.precio,
  "fecha-asc": byDate,
  "fecha-desc": (a, b) => byDate(b, a),
};

gsap.registerPlugin(Flip);

const CATALOG_BEFORE_CHANGE = "catalog:before-change";

const digits = (v: string) => v.replace(/\D/g, "");
const show = (v: string) => (v ? Number(v).toLocaleString("es-CO") : "");

function PriceField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (digits: string) => void;
}) {
  return (
    <label className="flex min-w-0 items-center gap-2 bg-ivory px-3 py-2.5 text-ink/80">
      <span aria-hidden="true">$</span>
      <input
        inputMode="numeric"
        aria-label={label}
        value={show(value)}
        placeholder={placeholder}
        onChange={(e) => onChange(digits(e.target.value))}
        className="min-w-0 flex-1 bg-transparent text-right text-ink outline-none placeholder:text-ink/45"
      />
    </label>
  );
}

export function CatalogGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const filter: Collection | "Todas" = COLLECTIONS.find((c) => c.name === params.get("coleccion"))?.name ?? "Todas";
  const [sort, setSort] = useState<SortKey>("relevantes");
  const [minStr, setMinStr] = useState("");
  const [maxStr, setMaxStr] = useState("");

  const query = params.get("q") ?? "";
  const q = normalize(query);
  const highest = useMemo(() => Math.max(0, ...products.map((p) => p.precio)), [products]);
  const min = minStr ? Number(minStr) : 0;
  const max = maxStr ? Number(maxStr) : Infinity;

  const sorted = useMemo(() => {
    const cmp = COMPARATORS[sort];
    return cmp ? [...products].sort(cmp) : products;
  }, [products, sort]);

  const matches = (p: Product) =>
    (filter === "Todas" || p.coleccion === filter) &&
    p.precio >= min &&
    p.precio <= max &&
    (!q || normalize(`${p.nombre} ${p.aroma} ${p.coleccion} ${p.referencia}`).includes(q));
  const shownKey = sorted.filter(matches).map((p) => p.referencia).join("|");
  const count = shownKey ? shownKey.split("|").length : 0;

  // Todas las tarjetas siguen en el DOM (las que no coinciden se ocultan) para que Flip
  // pueda animar su entrada, salida y desplazamiento al cambiar filtros u orden.
  const gridRef = useRef<HTMLDivElement>(null);
  const before = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [revealed] = useState(() => new Set(shownKey ? shownKey.split("|") : []));

  const capture = useCallback(() => {
    if (gridRef.current) before.current = Flip.getState(gridRef.current.children);
  }, []);
  const change = (fn: () => void) => {
    capture();
    fn();
  };

  useEffect(() => {
    window.addEventListener(CATALOG_BEFORE_CHANGE, capture);
    return () => window.removeEventListener(CATALOG_BEFORE_CHANGE, capture);
  }, [capture]);

  useEffect(() => {
    revealAll();
  }, []);

  // Parallax de las fotos con el scroll y revelado con máscara al entrar en pantalla.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(":scope > div", grid).forEach((wrap) => {
        const media = wrap.querySelector<HTMLElement>("[data-pimg]");
        const frame = wrap.querySelector<HTMLElement>("[data-frame]");
        if (!media || !frame) return;
        gsap.set(media, { scale: 1.2 });
        gsap.fromTo(
          media,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          },
        );
        if (wrap.hasAttribute("data-reveal")) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: wrap, start: "top 90%", once: true },
            },
          );
        }
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const state = before.current;
    before.current = null;
    const grid = gridRef.current;
    if (!state || !grid || prefersReducedMotion()) return;
    Flip.from(state, {
      targets: grid.children,
      duration: 0.8,
      ease: "power3.inOut",
      absoluteOnLeave: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" }),
      // Las tarjetas cambian de posición: se recalculan los disparadores del parallax.
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [shownKey]);

  const hasFilters = Boolean(minStr || maxStr || filter !== "Todas" || query);
  const clearAll = () => {
    capture();
    setMinStr("");
    setMaxStr("");
    window.dispatchEvent(new Event("catalog:query-cleared"));
    if (filter !== "Todas" || query) router.replace("/catalogo", { scroll: false });
  };

  const clearParam = (key: "q" | "coleccion") => {
    capture();
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    const qs = next.toString();
    router.replace(`/catalogo${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <h1 className="sr-only">Catálogo</h1>

        {(filter !== "Todas" || query) && (
          <div className="flex flex-wrap items-center gap-3">
            {filter !== "Todas" && (
              <button type="button" onClick={() => clearParam("coleccion")} className="chip !text-gold-dark" aria-label={`Quitar colección ${filter}`}>
                {filter} ✕
              </button>
            )}
            {query && (
              <button type="button" onClick={() => clearParam("q")} className="chip !text-gold-dark" aria-label={`Quitar búsqueda ${query}`}>
                “{query}” ✕
              </button>
            )}
          </div>
        )}

        <div data-reveal className="relative z-20 ml-auto flex items-center gap-8">
          {hasFilters && (
            <button type="button" onClick={clearAll} className="navlink text-base text-gold-dark">
              Eliminar filtros
            </button>
          )}

          <Dropdown label="Precio" align="left" panelClassName="w-[22rem]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <PriceField label="Precio mínimo" value={minStr} placeholder="0" onChange={(v) => change(() => setMinStr(v))} />
              <span className="text-ink/70">a</span>
              <PriceField label="Precio máximo" value={maxStr} placeholder={show(String(highest))} onChange={(v) => change(() => setMaxStr(v))} />
            </div>
          </Dropdown>

          <Dropdown label="Ordenar" panelClassName="w-64 !px-0 !py-2">
            <ul role="listbox" aria-label="Ordenar por">
              {SORTS.map((s) => (
                <li key={s.key} role="option" aria-selected={sort === s.key}>
                  <button
                    type="button"
                    onClick={() => change(() => setSort(s.key))}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-base text-ink/90 transition-colors hover:bg-ivory"
                  >
                    <span className="inline-block w-4 text-gold-dark">{sort === s.key ? "✓" : ""}</span>
                    <span className={sort === s.key ? "font-medium text-ink" : ""}>{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      </div>

      <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <div key={p.referencia} data-reveal={revealed.has(p.referencia) || undefined} className={matches(p) ? "flex [&>*]:w-full" : "hidden"}>
            <ProductCard product={p} reveal={false} />
          </div>
        ))}
      </div>
      {count === 0 && (
        <p className="py-16 text-center text-lg text-ink/70">No encontramos velas con esos filtros.</p>
      )}
    </div>
  );
}
