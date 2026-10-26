import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pagos y envíos | Etherea Handmade Candles" };

export default function Politicas() {
  return (
    <section className="mx-auto max-w-3xl space-y-10 px-5 py-16">
      <h1 className="font-serif text-5xl text-ink">Pagos y envíos</h1>

      <div>
        <h2 className="font-serif text-3xl text-ink">Formas de pago</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/70">
          <li>Transferencia bancaria.</li>
          <li>Pago contra entrega.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-serif text-3xl text-ink">Envíos</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/70">
          <li>Tiempo de procesamiento: 1 a 2 días.</li>
          <li>Tiempo de entrega: 3 a 6 días.</li>
        </ul>
        <p className="mt-3 text-sm text-ink/50">
          El valor del envío se confirma por WhatsApp al finalizar el pedido.
        </p>
      </div>

      <p className="text-xs text-ink/40">
        [Pendiente: completar el detalle de políticas (cambios, cuidados, sostenibilidad) con el texto de la guía de marca.]
      </p>
    </section>
  );
}
