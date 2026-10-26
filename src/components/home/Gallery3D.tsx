"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export interface GalleryItem {
  src: string;
  nombre: string;
  coleccion: string;
}

/** Distancia (px) entre fotos en el eje Z y posición [vw, vh] de cada una. */
const SPACING = 760;
const POS: [number, number][] = [[-24, -8], [20, 8], [-6, 14], [26, -12], [-22, 10], [8, -6]];

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Galería 3D: la sección se fija y el scroll recorre las fotos en profundidad (túnel).
 * Solo se animan transform y opacity. Sin movimiento, se muestra una cuadrícula simple.
 */
export function Gallery3D({ items }: { items: GalleryItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const stage = el.querySelector<HTMLElement>("[data-stage]");
    const world = el.querySelector<HTMLElement>("[data-world]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    if (!stage || !world || !bar) return;

    const rx = gsap.quickTo(world, "rotationX", { duration: 0.9, ease: "power3" });
    const ry = gsap.quickTo(world, "rotationY", { duration: 0.9, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      ry((e.clientX / window.innerWidth - 0.5) * 8);
      rx(-(e.clientY / window.innerHeight - 0.5) * 6);
    };
    window.addEventListener("pointermove", onMove);

    const ctx = gsap.context(() => {
      const planes = gsap.utils.toArray<HTMLElement>("[data-plane]");
      const n = planes.length;
      const state = { p: 0 };
      let shown = -1;
      gsap.set(planes, { xPercent: -50, yPercent: -50 });

      const render = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const spread = w < 640 ? 0.5 : 1;
        const cam = -SPACING * 0.2 + state.p * ((n - 1) * SPACING + SPACING * 0.45);
        let nearest = 0;
        let best = Infinity;
        planes.forEach((plane, i) => {
          const z = cam - i * SPACING;
          const [px, py] = POS[i % POS.length];
          const opacity =
            smooth(-3 * SPACING, -1.6 * SPACING, z) * (1 - smooth(0.35 * SPACING, 0.8 * SPACING, z));
          gsap.set(plane, {
            x: ((px * w) / 100) * spread,
            y: (py * h) / 100,
            z,
            opacity,
            visibility: opacity < 0.01 ? "hidden" : "visible",
          });
          const d = Math.abs(z + SPACING * 0.1);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        gsap.set(bar, { scaleX: state.p });
        if (nearest !== shown) {
          shown = nearest;
          setCurrent(nearest);
        }
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + window.innerHeight * n * 0.9,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: render,
          },
        })
        .to(state, { p: 1, ease: "none", onUpdate: render });
      render();
    }, el);

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  const active = items[current] ?? items[0];

  return (
    <div ref={root}>
      <div data-stage className="gallery3d-stage relative h-screen overflow-hidden bg-cocoa text-ivory">
        <h2 className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-5 text-center font-serif text-6xl text-[#fff5e1] mix-blend-difference sm:text-8xl">
          Nuestras velas
        </h2>

        <div className="pointer-events-none absolute inset-0 z-10 [perspective:1100px]">
          <div data-world className="absolute inset-0 [transform-style:preserve-3d]">
            {items.map((it) => (
              <figure
                key={it.src}
                data-plane
                className="invisible absolute left-1/2 top-1/2 aspect-[4/5] w-[min(62vw,300px)] opacity-0 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:w-[min(30vw,400px)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={encodeURI(it.src)} alt={it.nombre} className="h-full w-full object-cover" draggable={false} />
              </figure>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-4 px-5 pb-8 sm:px-10">
          <div aria-live="polite">
            <p className="text-sm tracking-[0.25em] text-gold-light">
              {String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <p className="mt-1 font-serif text-2xl sm:text-3xl">{active?.nombre}</p>
          </div>
          <Link href={`/catalogo?q=${encodeURIComponent(active?.nombre ?? "")}`} className="btn-gold btn-sm">
            Ver en el catálogo
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-gold/25" aria-hidden="true">
          <div data-bar className="h-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>

      <ul className="gallery3d-static mx-auto max-w-6xl grid-cols-2 gap-4 bg-cocoa p-5 text-ivory sm:grid-cols-3">
        {items.map((it) => (
          <li key={it.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={encodeURI(it.src)} alt={it.nombre} className="aspect-[4/5] w-full object-cover" />
            <p className="mt-2 font-serif text-xl">{it.nombre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
