import Link from "next/link";
import { COLLECTIONS, getProducts } from "@/data/products";
import { CandleMark } from "@/components/CandleMark";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const products = (await getProducts()).slice(0, 3);
  return (
    <>
      <section className="bg-gradient-to-b from-champagne to-ivory">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-20 text-center">
          <CandleMark className="h-20" />
          <h1 className="mt-6 font-serif text-5xl tracking-[0.15em] uppercase text-ink sm:text-7xl">Etherea</h1>
          <p className="mt-1 font-serif text-xl tracking-[0.3em] uppercase text-gold-dark">Handmade Candles</p>
          <p className="mt-6 max-w-xl text-ink/70">
            Velas artesanales hechas a mano para crear atmósferas únicas en tu hogar.
          </p>
          <Link
            href="/catalogo"
            className="mt-8 rounded-full bg-gold-dark px-8 py-3 tracking-wide text-white transition hover:bg-cocoa"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center font-serif text-4xl text-ink">Nuestras colecciones</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.name}
              href={`/catalogo?coleccion=${encodeURIComponent(c.name)}`}
              className="rounded-2xl border border-gold/40 bg-white/60 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-serif text-3xl text-ink">{c.name}</h3>
              <p className="mt-3 text-sm text-ink/60">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <h2 className="text-center font-serif text-4xl text-ink">Destacadas</h2>
        <p className="mt-2 text-center text-xs text-ink/50">Productos de ejemplo mientras se carga el catálogo real.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.referencia} product={p} />)}
        </div>
      </section>

      <section id="nosotros" className="mx-auto mt-24 max-w-3xl scroll-mt-24 px-5 text-center">
        <h2 className="font-serif text-4xl text-ink">Hechas a mano</h2>
        <p className="mt-4 text-ink/70">
          Cada vela de Etherea se elabora de forma artesanal, con atención a la sostenibilidad.
        </p>
        <p className="mt-2 text-xs text-ink/40">[Texto provisional: pendiente de reemplazar con el de la guía de marca.]</p>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-5 text-center">
        <h2 className="font-serif text-3xl text-ink">¿Cómo pedir?</h2>
        <ol className="mt-6 grid gap-4 text-sm text-ink/70 sm:grid-cols-3">
          <li><span className="font-serif text-3xl text-gold-dark">1</span><br />Elige tus velas y agrégalas al carrito.</li>
          <li><span className="font-serif text-3xl text-gold-dark">2</span><br />Finaliza tu pedido por WhatsApp.</li>
          <li><span className="font-serif text-3xl text-gold-dark">3</span><br />Paga por transferencia o contra entrega.</li>
        </ol>
      </section>
    </>
  );
}
