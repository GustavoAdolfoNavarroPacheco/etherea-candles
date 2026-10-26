"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { COLLECTIONS, type Collection, type Product } from "@/data/products";
import { revealAll } from "@/lib/motion";
import { ProductCard } from "./ProductCard";

export function CatalogGrid({ products }: { products: Product[] }) {
  const param = useSearchParams().get("coleccion");
  const initial = COLLECTIONS.find((c) => c.name === param)?.name ?? "Todas";
  const [filter, setFilter] = useState<Collection | "Todas">(initial);
  const tabs: (Collection | "Todas")[] = ["Todas", ...COLLECTIONS.map((c) => c.name)];
  const visible = filter === "Todas" ? products : products.filter((p) => p.coleccion === filter);

  useEffect(() => {
    revealAll();
  }, [filter]);

  return (
    <div>
      <div data-reveal className="mb-10 flex flex-wrap gap-3" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={filter === t}
            onClick={() => setFilter(t)}
            className="chip"
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.referencia} product={p} />
        ))}
      </div>
    </div>
  );
}
