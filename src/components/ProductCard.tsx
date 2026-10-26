"use client";

import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { formatCOP } from "@/lib/format";
import { CandleMark } from "./CandleMark";

export function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white/60">
      <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-champagne to-ivory">
        {p.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.foto} alt={p.nombre} className="h-full w-full object-cover" />
        ) : (
          <CandleMark className="h-24 opacity-80 transition group-hover:scale-105" />
        )}
        {!p.disponible && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-ivory">Agotada</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">{p.coleccion}</p>
        <h3 className="mt-1 font-serif text-xl text-ink">{p.nombre}</h3>
        <p className="text-sm text-ink/60">{p.aroma} · {p.tamano}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg text-ink">{formatCOP(p.precio)}</span>
          <button
            disabled={!p.disponible}
            onClick={() => add(p)}
            className="rounded-full border border-gold px-4 py-1.5 text-sm text-gold-dark transition hover:bg-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold-dark"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
