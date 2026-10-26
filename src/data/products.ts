export type Collection = "Serenidad" | "Energía" | "Etherea";

export interface Product {
  referencia: string;
  nombre: string;
  coleccion: Collection;
  aroma: string;
  tamano: string;
  precio: number; // COP
  foto?: string; // ruta en /public o URL; si falta se muestra un marcador
  disponible: boolean;
  fecha?: string; // fecha de creación (AAAA-MM-DD), para ordenar
  vendidos?: number; // unidades vendidas, para "Más vendidos"
}

export const COLLECTIONS: { name: Collection; tagline: string }[] = [
  { name: "Serenidad", tagline: "Calma y descanso para tus momentos de pausa." },
  { name: "Energía", tagline: "Vitalidad y claridad para activar tu espacio." },
  { name: "Etherea", tagline: "La esencia de la casa, hecha a mano." },
];

/**
 * DATOS DE EJEMPLO: nombres, aromas, tamaños y precios son ficticios
 * y se reemplazarán cuando se entregue el catálogo real
 * (estructura lista para cargarse desde Google Sheets).
 */
export const PRODUCTS: Product[] = [
  { referencia: "EJ-001", nombre: "Vela Ámbar", coleccion: "Serenidad", aroma: "Aroma de ejemplo", tamano: "200 g", precio: 40000, foto: "/velas-test/Vela Ambar.webp", disponible: true, fecha: "2026-03-12", vendidos: 48 },
  { referencia: "EJ-002", nombre: "Vela blanca con tapa de madera", coleccion: "Serenidad", aroma: "Aroma de ejemplo", tamano: "120 g", precio: 28000, foto: "/velas-test/Vela blanca con tapa de madera.webp", disponible: true, fecha: "2026-05-02", vendidos: 31 },
  { referencia: "EJ-003", nombre: "Set Velas Cilíndricas x3", coleccion: "Energía", aroma: "Aroma de ejemplo", tamano: "3 × 100 g", precio: 40000, foto: "/velas-test/Set Velas Cilíndricas x3.webp", disponible: true, fecha: "2026-07-20", vendidos: 64 },
  { referencia: "EJ-004", nombre: "Velas Flotantes Estrella x3", coleccion: "Energía", aroma: "Aroma de ejemplo", tamano: "3 uds", precio: 28000, foto: "/velas-test/Velas Flotantes Estrella x3.webp", disponible: false, fecha: "2026-09-08", vendidos: 12 },
  { referencia: "EJ-005", nombre: "Caja de regalo para condolencias", coleccion: "Etherea", aroma: "Aroma de ejemplo", tamano: "250 g", precio: 48000, foto: "/velas-test/Caja de regalo para condolencias.webp", disponible: true, fecha: "2026-01-15", vendidos: 22 },
  { referencia: "EJ-006", nombre: "Polvo de Luz – Cera Granulada", coleccion: "Etherea", aroma: "Aroma de ejemplo", tamano: "120 g", precio: 28000, foto: "/velas-test/Polvo de Luz – Cera Granulada para Velas.webp", disponible: true, fecha: "2026-10-01", vendidos: 40 },
];

export async function getProducts(): Promise<Product[]> {
  // Punto único de acceso: aquí se conectará el Google Sheet más adelante.
  return PRODUCTS;
}
