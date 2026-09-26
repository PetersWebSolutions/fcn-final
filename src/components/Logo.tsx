import type { ImgHTMLAttributes } from "react";

export function LogoMark({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/images/fcn-logo.jpg"
      alt="FCN Medical & Vaccination Center logo"
      className={`${className} rounded-2xl object-cover ring-1 ring-navy-900/15`}
      {...props}
    />
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
