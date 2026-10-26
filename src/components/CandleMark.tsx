export function CandleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 96" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8d29a" />
          <stop offset="1" stopColor="#a8823a" />
        </linearGradient>
      </defs>
      <path d="M32 6c5 8 9 13 9 20a9 9 0 0 1-18 0c0-7 4-12 9-20Z" fill="url(#gold)" opacity=".9" />
      <rect x="31" y="34" width="2" height="8" fill="#6b5a3a" />
      <rect x="14" y="42" width="36" height="46" rx="5" fill="url(#gold)" opacity=".25" stroke="url(#gold)" strokeWidth="1.5" />
    </svg>
  );
}
