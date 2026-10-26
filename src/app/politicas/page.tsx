import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pagos y envíos | Etherea Handmade Candles" };

export default function Politicas() {
  return (
    <section className="mx-auto max-w-3xl space-y-10 px-5 py-16">
      <h1 data-reveal className="font-serif text-6xl text-ink sm:text-7xl">Pagos y envíos</h1>

      <div data-reveal className="bg-white p-8 shadow-[0_14px_40px_-18px_rgba(43,33,24,0.3)]">
        <h2 className="font-serif text-3xl text-ink">Formas de pago</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/80">
          <li>Transferencia bancaria.</li>
          <li>Pago contra entrega.</li>
        </ul>
      </div>

      <div data-reveal className="bg-white p-8 shadow-[0_14px_40px_-18px_rgba(43,33,24,0.3)]">
        <h2 className="font-serif text-3xl text-ink">Envíos</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/80">
          <li>Tiempo de procesamiento: 1 a 2 días.</li>
          <li>Tiempo de entrega: 3 a 6 días.</li>
        </ul>
        <p className="mt-3 text-base text-ink/80">
          El valor del envío se confirma por WhatsApp al finalizar el pedido.
        </p>
      </div>

      <p className="text-sm text-ink/80">
        [Pendiente: completar el detalle de políticas (cambios, cuidados, sostenibilidad) con el texto de la guía de marca.]
      </p>
    </section>
  );
}
