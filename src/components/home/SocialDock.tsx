"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/config";
import { prefersReducedMotion } from "@/lib/motion";

type Key = "instagram" | "whatsapp";

const PROFILES: Record<Key, { label: string; href: string; w: number; h: number }> = {
  instagram: { label: "Instagram", href: "https://www.instagram.com/ethereavelas/", w: 360, h: 224 },
  whatsapp: { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}`, w: 360, h: 196 },
};
const ORDER: Key[] = ["instagram", "whatsapp"];

/** Logo oficial de WhatsApp (Simple Icons, CC0). */
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function Icon({ name, className = "h-6 w-6" }: { name: Key; className?: string }) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d={WHATSAPP_PATH} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

/**
 * Dock de redes: una sola tarjeta de vista previa que cambia de tamaño y se desplaza
 * hacia el ícono activo mientras su contenido se funde (inspirado en "Social Preview Dock").
 */
export function SocialDock() {
  const [active, setActive] = useState<Key>("instagram");
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const btns = useRef<Record<Key, HTMLButtonElement | null>>({ instagram: null, whatsapp: null });
  const first = useRef(true);

  useEffect(() => {
    const c = card.current;
    const r = root.current;
    const b = btns.current[active];
    if (!c || !r || !b) return;
    const p = PROFILES[active];
    const x = b.offsetLeft + b.offsetWidth / 2 - r.offsetWidth / 2;
    const max = Math.max(0, (r.offsetWidth - p.w) / 2);
    const target = { width: p.w, height: p.h, x: Math.max(-max, Math.min(max, x * 0.6)) };
    const instant = first.current || prefersReducedMotion();
    first.current = false;
    gsap.to(c, { ...target, xPercent: -50, duration: instant ? 0 : 0.7, ease: "power3.out", overwrite: "auto" });
    ORDER.forEach((k) => {
      const panel = c.querySelector<HTMLElement>(`[data-panel="${k}"]`);
      if (!panel) return;
      gsap.to(panel, {
        opacity: k === active ? 1 : 0,
        y: k === active ? 0 : 8,
        duration: instant ? 0 : 0.45,
        delay: k === active && !instant ? 0.12 : 0,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [active]);

  return (
    <div ref={root} className="relative mx-auto mt-72 w-full max-w-md">
      <div
        ref={card}
        className="absolute bottom-full left-1/2 mb-6 overflow-hidden bg-white shadow-[0_36px_70px_-24px_rgba(43,33,24,0.55)]"
        style={{ width: PROFILES.instagram.w, height: PROFILES.instagram.h, maxWidth: "100%" }}
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-cocoa" aria-hidden="true">
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />
        </div>

        <div data-panel="instagram" className="absolute inset-0 px-5 pt-6" style={{ pointerEvents: active === "instagram" ? "auto" : "none" }}>
          <div className="relative flex items-end justify-between">
            <span className="grid h-[4.5rem] w-[4.5rem] place-items-center bg-white font-serif text-4xl text-gold-dark shadow-[0_14px_28px_-12px_rgba(43,33,24,0.6)]">
              E
            </span>
            <a
              href={PROFILES.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={active === "instagram" ? 0 : -1}
              className="btn-gold btn-sm !bg-gold-dark"
            >
              Seguir
            </a>
          </div>
          <p className="mt-4 font-serif text-3xl tracking-[0.16em] text-ink">ETHEREA</p>
          <p className="text-base font-medium text-gold-dark">@ethereavelas</p>
          <p className="mt-1 text-base text-ink/90">Velería artesanal · Compra online · COL</p>
        </div>

        <div data-panel="whatsapp" className="absolute inset-0 px-5 pt-6" style={{ opacity: 0, pointerEvents: active === "whatsapp" ? "auto" : "none" }}>
          <div className="relative flex items-end justify-between">
            <span className="grid h-[4.5rem] w-[4.5rem] place-items-center bg-white text-[#128c4a] shadow-[0_14px_28px_-12px_rgba(43,33,24,0.6)]">
              <Icon name="whatsapp" className="h-10 w-10" />
            </span>
            <a
              href={PROFILES.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={active === "whatsapp" ? 0 : -1}
              className="btn-gold btn-sm !bg-gold-dark"
            >
              Escribir
            </a>
          </div>
          <p className="mt-4 font-serif text-3xl text-ink">Pedidos por WhatsApp</p>
          <p className="text-base font-medium text-gold-dark">{SITE.whatsappDisplay}</p>
        </div>
      </div>

      <div className="mx-auto flex w-fit items-center gap-2 bg-white p-2 shadow-[0_18px_40px_-18px_rgba(43,33,24,0.45)]">
        {ORDER.map((k) => (
          <button
            key={k}
            ref={(el) => {
              btns.current[k] = el;
            }}
            type="button"
            aria-label={PROFILES[k].label}
            aria-pressed={active === k}
            onMouseEnter={() => setActive(k)}
            onFocus={() => setActive(k)}
            onClick={() => setActive(k)}
            className={`grid h-14 w-14 place-items-center transition-[transform,background-color,color] duration-300 hover:scale-110 ${
              active === k ? "bg-gold-dark text-white" : "bg-ivory text-gold-dark"
            }`}
          >
            <Icon name={k} className="h-7 w-7" />
          </button>
        ))}
      </div>
    </div>
  );
}
