"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(SplitText);

const PHOTOS = {
  left: "/velas-test/Vela blanca con tapa de madera.webp",
  right: "/velas-test/Set Velas Cilíndricas x3.webp",
};

/**
 * "Hechas a mano": texto que se ilumina palabra por palabra, con una marca de agua
 * y dos fotos flotantes que se mueven a distinta velocidad para dar profundidad.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create("[data-words]", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-words]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.fromTo(
        "[data-kicker]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-kicker]", start: "top 92%", end: "top 70%", scrub: true },
        },
      );
      const scrub = { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 };
      gsap.fromTo("[data-mark]", { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: scrub });
      gsap.fromTo("[data-photo=left]", { y: 140, rotate: -7 }, { y: -140, rotate: -2, ease: "none", scrollTrigger: scrub });
      gsap.fromTo("[data-photo=right]", { y: 220, rotate: 6 }, { y: -200, rotate: 2, ease: "none", scrollTrigger: scrub });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="nosotros" className="relative scroll-mt-24 overflow-hidden bg-ivory px-5 py-44">
      <span
        data-mark
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-serif text-[22vw] leading-none tracking-[0.12em] text-champagne/70"
      >
        ETHEREA
      </span>

      {(["left", "right"] as const).map((side) => (
        <figure
          key={side}
          data-photo={side}
          aria-hidden="true"
          className={`absolute hidden aspect-[4/5] lg:block ${
            side === "left"
              ? "left-[5%] top-24 w-[17vw] max-w-[250px]"
              : "bottom-24 right-[5%] w-[14vw] max-w-[210px]"
          } shadow-[0_40px_70px_-30px_rgba(43,33,24,0.55)]`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={encodeURI(PHOTOS[side])} alt="" className="h-full w-full object-cover" draggable={false} />
        </figure>
      ))}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 data-kicker className="font-serif text-5xl text-ink sm:text-6xl">Hechas a mano</h2>
        <p data-words className="mt-12 font-serif text-3xl leading-snug text-ink sm:text-5xl">
          Cada vela de Etherea se elabora de forma artesanal, con atención a la sostenibilidad.
        </p>
        <p className="mt-10 text-sm text-ink/70">
          [Texto provisional: pendiente de reemplazar con el de la guía de marca.]
        </p>
      </div>
    </section>
  );
}
