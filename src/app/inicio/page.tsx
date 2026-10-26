import Link from "next/link";
import { COLLECTIONS, getProducts } from "@/data/products";
import { Logo } from "@/components/Logo";
import { Collections } from "@/components/home/Collections";
import { Gallery3D } from "@/components/home/Gallery3D";
import { Statement } from "@/components/home/Statement";
import { Steps } from "@/components/home/Steps";
import { SocialDock } from "@/components/home/SocialDock";

export default async function Inicio() {
  const gallery = (await getProducts())
    .filter((p) => p.foto)
    .map((p) => ({ src: p.foto!, nombre: p.nombre, coleccion: p.coleccion }));
  return (
    <>
      <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-cocoa text-ivory">
        <div data-parallax="12" className="absolute inset-0 -z-10">
          <div className="glow absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(201,164,92,0.16),transparent)]" />
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
        <span className="scroll-cue absolute bottom-10 left-1/2 h-14 w-px bg-gold-light/70" aria-hidden="true" />
      </section>

      <Collections items={COLLECTIONS} />

      <Gallery3D items={gallery} />

      <Statement />

      <Steps />

      <section className="bg-ivory px-5 pb-28 pt-28">
        <h2 className="text-center font-serif text-5xl text-ink sm:text-6xl">Síguenos</h2>
        <SocialDock />
      </section>
    </>
  );
}
