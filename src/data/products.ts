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
  { referencia: "EJ-001", nombre: "Vela de ejemplo 1", coleccion: "Serenidad", aroma: "Aroma de ejemplo", tamano: "200 g", precio: 40000, disponible: true },
  { referencia: "EJ-002", nombre: "Vela de ejemplo 2", coleccion: "Serenidad", aroma: "Aroma de ejemplo", tamano: "120 g", precio: 28000, disponible: true },
  { referencia: "EJ-003", nombre: "Vela de ejemplo 3", coleccion: "Energía", aroma: "Aroma de ejemplo", tamano: "200 g", precio: 40000, disponible: true },
  { referencia: "EJ-004", nombre: "Vela de ejemplo 4", coleccion: "Energía", aroma: "Aroma de ejemplo", tamano: "120 g", precio: 28000, disponible: false },
  { referencia: "EJ-005", nombre: "Vela de ejemplo 5", coleccion: "Etherea", aroma: "Aroma de ejemplo", tamano: "250 g", precio: 48000, disponible: true },
  { referencia: "EJ-006", nombre: "Vela de ejemplo 6", coleccion: "Etherea", aroma: "Aroma de ejemplo", tamano: "120 g", precio: 28000, disponible: true },
];

export async function getProducts(): Promise<Product[]> {
  // Punto único de acceso: aquí se conectará el Google Sheet más adelante.
  return PRODUCTS;
}
