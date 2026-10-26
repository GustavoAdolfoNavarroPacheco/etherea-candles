import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/data/products";
import { CatalogGrid } from "@/components/CatalogGrid";

export const metadata: Metadata = { title: "Catálogo | Etherea Handmade Candles" };

export default async function Catalogo() {
  const products = await getProducts();
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-serif text-5xl text-ink">Catálogo</h1>
      <p className="mb-4 mt-2 text-xs text-ink/50">Productos de ejemplo mientras se carga el catálogo real.</p>
      <Suspense>
        <CatalogGrid products={products} />
      </Suspense>
    </section>
  );
}
