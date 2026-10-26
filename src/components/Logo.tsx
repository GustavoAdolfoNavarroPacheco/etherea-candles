import Image from "next/image";

export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="Etherea Handmade Candles"
      width={959}
      height={199}
      priority={priority}
      className={className}
    />
  );
}
