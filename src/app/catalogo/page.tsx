import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/data/products";
import { CatalogGrid } from "@/components/CatalogGrid";

export const metadata: Metadata = { title: "Catálogo | Etherea Handmade Candles" };

export default async function Catalogo() {
  const products = await getProducts();
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h1 data-reveal className="font-serif text-6xl text-ink sm:text-7xl">Catálogo</h1>
      <p data-reveal className="mb-10 mt-3 text-sm text-ink/80">
        Productos de ejemplo mientras se carga el catálogo real.
      </p>
      <Suspense>
        <CatalogGrid products={products} />
      </Suspense>
    </section>
  );
}
