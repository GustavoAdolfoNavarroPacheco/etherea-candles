"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

const STEPS = [
  "Elige tus velas y agrégalas al carrito.",
  "Finaliza tu pedido por WhatsApp.",
  "Paga por transferencia o contra entrega.",
];

/** Pasos en tarjetas elevadas unidas por una línea que se dibuja con el scroll. */
export function Steps() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-title]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-title]", start: "top 95%", end: "top 70%", scrub: true },
        },
      );
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "[data-steps]", start: "top 80%", end: "bottom 60%", scrub: 0.8 },
      });
      tl.fromTo("[data-fill-x]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 3 }, 0);
      tl.fromTo("[data-fill-y]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 3 }, 0);
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, i) => {
        tl.fromTo(
          step.querySelector("[data-card]"),
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 },
          i * 1.1,
        );
        tl.fromTo(
          step.querySelector("[data-box]"),
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, ease: "back.out(2.2)", duration: 0.6 },
          i * 1.1 + 0.2,
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-champagne/50 px-5 pb-28 pt-28 shadow-[inset_0_24px_40px_-32px_rgba(43,33,24,0.35),inset_0_-24px_40px_-32px_rgba(43,33,24,0.25)]">
      <div className="mx-auto max-w-5xl">
        <h2 data-title className="text-center font-serif text-5xl text-ink sm:text-6xl">¿Cómo pedir?</h2>
        <ol data-steps className="relative mt-24 grid gap-16 md:grid-cols-3 md:gap-8">
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-gold/30 md:hidden">
            <span data-fill-y className="block h-full w-full origin-top bg-gold-dark" />
          </span>
          <span aria-hidden="true" className="absolute left-[16.67%] right-[16.67%] top-0 hidden h-px bg-gold/30 md:block">
            <span data-fill-x className="block h-full w-full origin-left bg-gold-dark" />
          </span>
          {STEPS.map((t, i) => (
            <li key={t} data-step className="relative">
              <div
                data-card
                className="relative bg-white px-8 pb-10 pt-16 text-center shadow-[0_30px_60px_-28px_rgba(43,33,24,0.45)]"
              >
                <span
                  data-box
                  className="absolute left-1/2 top-0 grid h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center bg-gold-dark font-serif text-4xl text-white shadow-[0_14px_28px_-10px_rgba(43,33,24,0.55)]"
                >
                  {i + 1}
                </span>
                <p className="text-lg leading-relaxed text-ink">{t}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
