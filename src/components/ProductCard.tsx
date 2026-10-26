"use client";

import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { formatCOP } from "@/lib/format";
import { CandleMark } from "./CandleMark";

export function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  return (
    <article data-reveal className="lift group flex flex-col overflow-hidden rounded-3xl bg-white">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-champagne via-ivory to-gold-light/40">
        <div className="glow absolute h-2/3 w-2/3 rounded-full bg-gold-light/50 blur-3xl" />
        {p.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.foto} alt={p.nombre} className="zoom h-full w-full object-cover" />
        ) : (
          <CandleMark className="zoom relative h-28 drop-shadow-[0_10px_20px_rgba(143,111,47,0.35)]" />
        )}
        {!p.disponible && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-light text-ivory">Agotada</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-normal uppercase tracking-[0.25em] text-gold-dark">{p.coleccion}</p>
        <h3 className="mt-1 font-serif text-2xl font-light text-ink">{p.nombre}</h3>
        <p className="text-sm font-light text-ink/60">{p.aroma} · {p.tamano}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-lg font-light text-ink">{formatCOP(p.precio)}</span>
          <button disabled={!p.disponible} onClick={() => add(p)} className="btn-gold btn-sm">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
