"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, killScrollTriggers, prefersReducedMotion, revealAll, setLenis } from "@/lib/motion";

/** Lenis (scroll suave) sincronizado con el ticker de GSAP + animaciones de scroll. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, autoRaf: false });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    revealAll();
    ScrollTrigger.refresh();
    return killScrollTriggers;
  }, [pathname]);

  return null;
}
