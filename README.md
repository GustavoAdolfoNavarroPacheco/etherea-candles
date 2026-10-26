# Etherea Handmade Candles

Sitio web de catálogo y carrito para Etherea Handmade Candles. Los pedidos se finalizan por WhatsApp.

- Next.js (App Router) + TypeScript + Tailwind CSS
- Carrito en el navegador (localStorage), total en COP
- Despliegue previsto: Vercel (https://ethereacandles.vercel.app)

## Desarrollo

```bash
npm install
npm run dev
```

## Dónde editar

- `src/lib/config.ts`: número de WhatsApp y URL del sitio.
- `src/data/products.ts`: catálogo. **Actualmente son datos de ejemplo.** `getProducts()` es el punto donde se conectará el Google Sheet.
- `src/app/politicas/page.tsx`, `src/app/page.tsx`: textos provisionales por completar con la guía de marca.
