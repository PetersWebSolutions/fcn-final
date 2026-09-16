import type { SVGProps } from "react";

export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" {...props}>
      <defs>
      <linearGradient id="lg-mark" x1="6" y1="4" x2="34" y2="36">
        <stop offset="0" stopColor="#1b3a72" />
        <stop offset="1" stopColor="#0b1b3a" />
      </linearGradient>
      </defs>
      <path
        d="M20 3.5 6.5 8v10.6c0 8.2 5.6 14.5 13.5 17.4 7.9-2.9 13.5-9.2 13.5-17.4V8L20 3.5Z"
        fill="url(#lg-mark)"
      />
      {/* globe */}
      <circle cx="20" cy="18.4" r="6.4" stroke="#e6c878" strokeWidth="1.6" />
      <path d="M13.6 18.4h12.8M20 12c-1.9 1.7-1.9 11.1 0 12.8M20 12c1.9 1.7 1.9 11.1 0 12.8" stroke="#e6c878" strokeWidth="1.3" />
      {/* plane */}
      <path
        d="M24.6 13.6 17.2 17l-3.4-.9.9 2.1 2.4.7-2 2.2 1.4 1.4 2.3-2 .7 2.5 2.1.9-.9-3.5 3.4-3.5 2.2.4-1.7-3.7Z"
        fill="#f5ead0"
      />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const sub = variant === "light" ? "text-gold-300" : "text-gold-600";
  const name = variant === "light" ? "text-white" : "text-navy-900";
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`} aria-label="FCN Medical & Vaccination Center — home">
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]" />
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-extrabold tracking-[0.18em] ${name}`}>
          FCN
        </span>
        <span className={`mt-0.5 block text-[0.52rem] font-bold uppercase tracking-[0.2em] ${sub}`}>
          Medical &amp; Vaccination Center
        </span>
      </span>
    </a>
  );
}
