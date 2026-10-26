"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { COLLECTIONS, type Collection, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function CatalogGrid({ products }: { products: Product[] }) {
  const param = useSearchParams().get("coleccion");
  const initial = COLLECTIONS.find((c) => c.name === param)?.name ?? "Todas";
  const [filter, setFilter] = useState<Collection | "Todas">(initial);
  const tabs: (Collection | "Todas")[] = ["Todas", ...COLLECTIONS.map((c) => c.name)];
  const visible = filter === "Todas" ? products : products.filter((p) => p.coleccion === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={filter === t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === t
                ? "border-gold-dark bg-gold-dark text-white"
                : "border-gold/50 text-ink/70 hover:border-gold-dark"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.referencia} product={p} />
        ))}
      </div>
    </div>
  );
}
