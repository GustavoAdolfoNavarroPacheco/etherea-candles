"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatCOP } from "@/lib/format";
import { getLenis } from "@/lib/motion";

export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove, clear, whatsappUrl } = useCart();

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito">
      <button
        className="overlay-in absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-label="Cerrar carrito"
      />
      <aside className="drawer-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between px-6 py-5 shadow-[0_12px_30px_-20px_rgba(43,33,24,0.4)]">
          <h2 className="font-serif text-3xl text-ink">Tu carrito</h2>
          <button onClick={() => setOpen(false)} className="icon-btn" aria-label="Cerrar">×</button>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-ink/80">Aún no has agregado velas.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product: p, qty }) => (
                <li key={p.referencia} className="line-in bg-white p-4 shadow-[0_8px_30px_-14px_rgba(43,33,24,0.25)]">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-serif text-xl text-ink">{p.nombre}</p>
                      <p className="text-sm text-ink/80">{p.coleccion} · {p.aroma} · {p.tamano}</p>
                    </div>
                    <p className="whitespace-nowrap text-ink">{formatCOP(p.precio * qty)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-base">
                    <button className="icon-btn" onClick={() => setQty(p.referencia, qty - 1)} aria-label="Quitar uno">−</button>
                    <span className="w-4 text-center">{qty}</span>
                    <button className="icon-btn" onClick={() => setQty(p.referencia, qty + 1)} aria-label="Agregar uno">+</button>
                    <button className="navlink ml-auto text-sm text-ink/80" onClick={() => remove(p.referencia)}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 bg-ivory px-6 py-5 shadow-[0_-16px_40px_-20px_rgba(43,33,24,0.4)]">
          <div className="flex justify-between font-serif text-2xl text-ink">
            <span>Total</span>
            <span>{formatCOP(total)}</span>
          </div>
          <p className="text-sm text-ink/80">
            El valor del envío se confirma por WhatsApp. Pago por transferencia o contra entrega.
          </p>
          <a
            href={lines.length ? whatsappUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!lines.length}
            className={`btn-gold w-full ${lines.length ?"" : "pointer-events-none opacity-40"}`}
          >
            Finalizar pedido por WhatsApp
          </a>
          {lines.length > 0 && (
            <button onClick={clear} className="navlink mx-auto block text-sm text-ink/80">
              Vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
