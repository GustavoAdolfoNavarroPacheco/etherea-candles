"use client";

import { useCart } from "@/lib/cart";
import { formatCOP } from "@/lib/format";

export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove, clear, whatsappUrl } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito">
      <button
        className="absolute inset-0 bg-ink/50"
        onClick={() => setOpen(false)}
        aria-label="Cerrar carrito"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-gold/30 px-5 py-4">
          <h2 className="font-serif text-2xl text-ink">Tu carrito</h2>
          <button onClick={() => setOpen(false)} className="text-2xl leading-none text-ink/60" aria-label="Cerrar">×</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-ink/60">Aún no has agregado velas.</p>
          ) : (
            <ul className="divide-y divide-gold/20">
              {lines.map(({ product: p, qty }) => (
                <li key={p.referencia} className="py-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-serif text-lg text-ink">{p.nombre}</p>
                      <p className="text-xs text-ink/60">{p.coleccion} · {p.aroma} · {p.tamano}</p>
                    </div>
                    <p className="whitespace-nowrap text-ink">{formatCOP(p.precio * qty)}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <button className="h-7 w-7 rounded-full border border-gold" onClick={() => setQty(p.referencia, qty - 1)} aria-label="Quitar uno">−</button>
                    <span>{qty}</span>
                    <button className="h-7 w-7 rounded-full border border-gold" onClick={() => setQty(p.referencia, qty + 1)} aria-label="Agregar uno">+</button>
                    <button className="ml-auto text-ink/50 underline" onClick={() => remove(p.referencia)}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t border-gold/30 px-5 py-4">
          <div className="flex justify-between font-serif text-xl text-ink">
            <span>Total</span>
            <span>{formatCOP(total)}</span>
          </div>
          <p className="text-xs text-ink/60">
            El valor del envío se confirma por WhatsApp. Pago por transferencia o contra entrega.
          </p>
          <a
            href={lines.length ? whatsappUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!lines.length}
            className={`block rounded-full bg-gold-dark px-6 py-3 text-center tracking-wide text-white transition hover:bg-cocoa ${
              lines.length ? "" : "pointer-events-none opacity-40"
            }`}
          >
            Finalizar pedido por WhatsApp
          </a>
          {lines.length > 0 && (
            <button onClick={clear} className="block w-full text-center text-xs text-ink/50 underline">
              Vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
