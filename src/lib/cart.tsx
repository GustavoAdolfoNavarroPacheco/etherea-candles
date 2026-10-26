"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { SITE } from "@/lib/config";
import { formatCOP } from "@/lib/format";

export interface CartLine {
  product: Product;
  qty: number;
}

type Action =
  | { type: "add"; product: Product }
  | { type: "setQty"; ref: string; qty: number }
  | { type: "remove"; ref: string }
  | { type: "clear" }
  | { type: "load"; lines: CartLine[] };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "load":
      return action.lines;
    case "add": {
      const found = state.find((l) => l.product.referencia === action.product.referencia);
      if (found)
        return state.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l));
      return [...state, { product: action.product, qty: 1 }];
    }
    case "setQty":
      return state
        .map((l) => (l.product.referencia === action.ref ? { ...l, qty: action.qty } : l))
        .filter((l) => l.qty > 0);
    case "remove":
      return state.filter((l) => l.product.referencia !== action.ref);
    case "clear":
      return [];
  }
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product) => void;
  setQty: (ref: string, qty: number) => void;
  remove: (ref: string) => void;
  clear: () => void;
  whatsappUrl: string;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "etherea-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "load", lines: JSON.parse(raw) });
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const total = lines.reduce((s, l) => s + l.product.precio * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const body = lines
      .map(
        (l) =>
          `• ${l.qty} x ${l.product.nombre} (${l.product.referencia}, ${l.product.aroma}, ${l.product.tamano}) - ${formatCOP(l.product.precio * l.qty)}`,
      )
      .join("\n");
    const msg = `Hola Etherea, quiero hacer este pedido:\n\n${body}\n\nTotal: ${formatCOP(total)}\n\n¿Me confirmas disponibilidad y datos de pago/envío?`;
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add: (product) => {
        dispatch({ type: "add", product });
        setOpen(true);
      },
      setQty: (ref, qty) => dispatch({ type: "setQty", ref, qty }),
      remove: (ref) => dispatch({ type: "remove", ref }),
      clear: () => dispatch({ type: "clear" }),
      whatsappUrl: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart debe usarse dentro de CartProvider");
  return c;
}
