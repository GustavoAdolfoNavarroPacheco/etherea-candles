import Link from "next/link";
import { COLLECTIONS, getProducts } from "@/data/products";
import { Logo } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";

export default async function Inicio() {
  const products = (await getProducts()).slice(0, 3);
  return (
    <>
      <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#150f0a] via-cocoa to-[#4a3820] text-ivory">
        <div data-parallax="12" className="absolute inset-0 -z-10">
          <div className="glow absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(201,164,92,0.45),transparent)]" />
          <div className="orb absolute left-[8%] top-[18%] h-40 w-40 bg-[radial-gradient(closest-side,rgba(236,217,163,0.25),transparent)]" />
          <div className="orb absolute bottom-[12%] right-[10%] h-56 w-56 bg-[radial-gradient(closest-side,rgba(201,164,92,0.28),transparent)] [animation-delay:-4s]" />
        </div>
        <div className="flex flex-col items-center px-5 pb-28 pt-16 text-center">
          <div data-reveal="scale" className="w-[88vw] max-w-3xl">
            <Logo priority className="h-auto w-full brightness-[1.35] drop-shadow-[0_0_40px_rgba(201,164,92,0.45)]" />
          </div>
          <p data-reveal className="mt-10 max-w-xl text-lg leading-relaxed text-ivory/90">
            Velas artesanales hechas a mano para crear atmósferas únicas en tu hogar.
          </p>
          <Link data-reveal href="/catalogo" className="btn-gold mt-10">
            Ver catálogo
          </Link>
        </div>
        <span className="scroll-cue absolute bottom-10 left-1/2 h-14 w-px bg-gradient-to-b from-gold-light to-transparent" aria-hidden="true" />
      </section>

      <section className="relative -mt-14 bg-ivory pb-4 pt-20 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-6xl px-5">
          <h2 data-reveal className="text-center font-serif text-5xl text-ink sm:text-6xl">Nuestras colecciones</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.name}
                data-reveal
                href={`/catalogo?coleccion=${encodeURIComponent(c.name)}`}
                className="lift bg-gradient-to-br from-white via-ivory to-champagne p-10 text-center"
              >
                <h3 className="font-serif text-4xl text-ink">{c.name}</h3>
                <p className="mt-4 text-base text-ink/80">{c.tagline}</p>
                <span className="navlink mt-6 inline-block text-base text-gold-dark">Explorar</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-5">
        <h2 data-reveal className="text-center font-serif text-5xl text-ink sm:text-6xl">Destacadas</h2>
        <p data-reveal className="mt-3 text-center text-sm text-ink/80">
          Productos de ejemplo mientras se carga el catálogo real.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.referencia} product={p} />)}
        </div>
      </section>

      <section id="nosotros" className="mx-auto mt-28 max-w-3xl scroll-mt-24 px-5 text-center">
        <h2 data-reveal className="font-serif text-5xl text-ink sm:text-6xl">Hechas a mano</h2>
        <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/80">
          Cada vela de Etherea se elabora de forma artesanal, con atención a la sostenibilidad.
        </p>
        <p data-reveal className="mt-2 text-sm text-ink/80">
          [Texto provisional: pendiente de reemplazar con el de la guía de marca.]
        </p>
      </section>

      <section className="mx-auto mt-28 max-w-4xl px-5 text-center">
        <h2 data-reveal className="font-serif text-5xl text-ink sm:text-6xl">¿Cómo pedir?</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            "Elige tus velas y agrégalas al carrito.",
            "Finaliza tu pedido por WhatsApp.",
            "Paga por transferencia o contra entrega.",
          ].map((t, i) => (
            <li key={t} data-reveal className="bg-white p-8 shadow-[0_14px_40px_-18px_rgba(43,33,24,0.3)]">
              <span className="font-serif text-5xl text-gold">{i + 1}</span>
              <p className="mt-3 text-base text-ink/80">{t}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
