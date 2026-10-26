"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface Item {
  name: string;
  tagline: string;
}

/** Colecciones: tarjetas que suben con el scroll y números que se desplazan a distinta velocidad. */
export function Collections({ items }: { items: Item[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-line]", start: "top 90%", end: "top 55%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 120 + i * 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 100%", end: "top 62%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          card.querySelector("[data-num]"),
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative -mt-14 bg-ivory pb-28 pt-24 shadow-[0_-20px_40px_-24px_rgba(0,0,0,0.3)]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center font-serif text-5xl text-ink sm:text-6xl">Nuestras colecciones</h2>
        <div data-line className="mx-auto mt-6 h-px w-40 origin-left bg-gold" aria-hidden="true" />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((c, i) => (
            <Link
              key={c.name}
              data-card
              href={`/catalogo?coleccion=${encodeURIComponent(c.name)}`}
              className="lift group relative block overflow-hidden bg-white px-8 pb-10 pt-40 md:[&:nth-child(2)]:mt-16"
            >
              <span
                data-num
                className="pointer-events-none absolute right-6 top-4 select-none font-serif text-[9rem] leading-none text-champagne"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-serif text-4xl text-ink">{c.name}</h3>
              <p className="relative mt-4 text-base text-ink/80">{c.tagline}</p>
              <span className="relative mt-8 flex items-center gap-2 text-base text-gold-dark">
                <span className="navlink">Explorar</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
