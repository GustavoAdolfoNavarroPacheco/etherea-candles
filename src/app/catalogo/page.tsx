import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/data/products";
import { CatalogGrid } from "@/components/CatalogGrid";

export const metadata: Metadata = { title: "Catálogo | Etherea Handmade Candles" };

export default async function Catalogo() {
  const products = await getProducts();
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-10">
      <Suspense>
        <CatalogGrid products={products} />
      </Suspense>
    </section>
  );
}
