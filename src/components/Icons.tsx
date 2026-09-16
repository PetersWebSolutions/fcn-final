import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Pin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 10c0 5.4-7.2 11.4-7.5 11.7a.8.8 0 0 1-1 0C11.2 21.4 4 15.4 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </svg>
);

export const Compass = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.5v5.6c0 4.5 3 8 7 9.9 4-1.9 7-5.4 7-9.9V5.5L12 3Z" />
  </svg>
);

export const ShieldCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.5v5.6c0 4.5 3 8 7 9.9 4-1.9 7-5.4 7-9.9V5.5L12 3Z" />
    <path d="m9 11.8 2.2 2.2L15.5 9.5" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const SearchX = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6M8.5 8.5l5 5m0-5-5 5" />
  </svg>
);

export const Grid = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const Plane = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10.5 13.5 3 11l1.5-1.5 6.5 1 4.5-4.5a2 2 0 0 1 3 0 2 2 0 0 1 0 3l-4.5 4.5 1 6.5L15 21.5l-2.5-7.5-3.5 3.5-.5 3-1.5.5-1-4-4-1 .5-1.5 3-.5 3.5-3.5Z" />
  </svg>
);

export const Refresh = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5M4 4v4.5h4.5" />
    <path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.5M20 20v-4.5h-4.5" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const User = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.8 4.2-5.5 7.5-5.5s6.3 1.7 7.5 5.5" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 4h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L20 15.5V18a2.5 2.5 0 0 1-2.7 2.5A14.8 14.8 0 0 1 3.5 6.7 2.5 2.5 0 0 1 5.5 4Z" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Note = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h11l3 3v13H5V4Z" />
    <path d="M8.5 11h7M8.5 14.5h5" />
  </svg>
);

export const Send = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 4 3 10.5l7 2.2L12.5 20 21 4Z" />
    <path d="m10 12.7 5-5.2" />
  </svg>
);

/* ------ Service illustrations ------ */

export const ClipboardPlane = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="4.5" width="14" height="16" rx="2.5" />
    <path d="M9 4.5a3 3 0 0 1 6 0" />
    <path d="M14.6 9.7 9 11.2l1-1 4.4-.4 3-3a1.3 1.3 0 0 1 1.9 1.9l-3 3-.4 4.4-1 1 1.5-5.6Z" fill="currentColor" stroke="none" />
  </svg>
);

export const SyringeShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 5.5 5.3v5c0 4 2.7 7 6.5 8.7 3.8-1.7 6.5-4.7 6.5-8.7v-5L12 3Z" />
    <path d="m8.8 13.7 1.6-2.6m2.4-1 1.6-2.6" />
    <path d="m12.4 9.9 1.7 1.7M9.6 12.7l1.7 1.7" />
    <path d="m8.3 14.2 1.5 1.5" />
  </svg>
);

export const Stethoscope = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 4v5a4 4 0 0 0 8 0V4" />
    <path d="M6 4H4.5M14 4h1.5" />
    <path d="M10 17a5.5 5.5 0 0 0 11 0v-2.2" />
    <circle cx="21" cy="12.5" r="2" />
  </svg>
);

export const DocCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 3.5h8L19 7.5V20.5H6.5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
    <path d="M14.5 3.5V8h4.2" />
    <path d="m8.5 13.5 2 2 3.5-3.8" />
  </svg>
);

export const TestTube = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10 3h4M11 3v11.5L7.8 19a2.3 2.3 0 0 0 3.8 2.6l.4-.6 3.2-5.5V3" />
    <path d="M8.3 14.5h7.4" />
    <circle cx="11" cy="17.5" r=".7" fill="currentColor" stroke="none" />
  </svg>
);

/* ------ Misc ------ */

export const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 17l-5.25 2.7 1-5.85L3.5 9.7l5.9-.9L12 3.5Z" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9.5 6C6.5 7.2 5 9.7 5 13.2V18h5.2v-5.2H7.7c0-2 .9-3.3 2.8-4L9.5 6Zm9 0c-3 1.2-4.5 3.7-4.5 7.2V18h5.2v-5.2h-2.5c0-2 .9-3.3 2.8-4L18.5 6Z" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6Z" />
  </svg>
);

export const Temple = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 21h16M5 21v-6h14v6M5 15 12 6l7 9" />
    <path d="M12 3.5V6M9.2 6h5.6" />
  </svg>
);

export const ChatBadge = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 3.5V16A2.5 2.5 0 0 1 4 13.5v-7Z" />
    <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" strokeWidth="2.6" />
  </svg>
);

export const CardBadge = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="M7 15h4M7 12.5h2.5" />
    <circle cx="16.5" cy="13.8" r="1.4" />
  </svg>
);

export const Whatsapp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.27-8.23 2.2 0 4.28.86 5.84 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.2-8.26 8.2Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.63.8-.77.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.25-.84.82-.84 2 0 1.18.86 2.31.98 2.47.12.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Heart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20s-7.5-4.6-9.4-9C1.3 7.9 3 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3 0 4.7 2.9 3.4 6-1.9 4.4-5.4 9-5.4 9Z" />
  </svg>
);

export const Dots = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="19" cy="12" r="1.6" />
  </svg>
);
