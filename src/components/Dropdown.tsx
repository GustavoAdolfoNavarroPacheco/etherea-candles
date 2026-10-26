"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Dropdown({
  label,
  children,
  panelClassName = "w-72",
  align = "right",
}: {
  label: string;
  children: ReactNode;
  panelClassName?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-base font-medium text-ink transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          className={`line-in absolute ${align === "left" ? "left-0 sm:left-auto sm:right-0" : "right-0"} top-full z-20 mt-3 max-w-[calc(100vw-2rem)] bg-white p-4 shadow-[0_18px_40px_-16px_rgba(43,33,24,0.3)] ${panelClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
