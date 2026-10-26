"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Anima los elementos [data-reveal] que aún no se han revelado.
 * Es idempotente: se puede llamar de nuevo cuando aparecen elementos nuevos.
 * Solo anima transform y opacity (compositor, sin layout).
 */
export function revealAll() {
  const els = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-revealed])");
  if (!els.length) return;
  els.forEach((el) => el.setAttribute("data-revealed", ""));

  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, clearProps: "transform" });
    return;
  }

  ScrollTrigger.batch(els, {
    start: "top 90%",
    once: true,
    batchMax: 6,
    interval: 0.08,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        {
          opacity: 0,
          y: (_, el: HTMLElement) => (el.dataset.reveal === "scale" ? 40 : 48),
          scale: (_, el: HTMLElement) => (el.dataset.reveal === "scale" ? 0.92 : 1),
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true,
          force3D: true,
        },
      ),
  });

  gsap.utils.toArray<HTMLElement>("[data-parallax]:not([data-parallaxed])").forEach((el) => {
    el.setAttribute("data-parallaxed", "");
    const speed = parseFloat(el.dataset.parallax ?? "20");
    gsap.to(el, {
      yPercent: -speed,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
