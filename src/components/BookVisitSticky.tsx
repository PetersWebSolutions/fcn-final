import { useEffect, useState, useRef } from "react";
import { Calendar } from "./Icons";

export default function BookVisitSticky() {
  const [visible, setVisible] = useState(true);
  const [showAfterScroll, setShowAfterScroll] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const last = lastScrollYRef.current;

      // Only show after scrolling past 300px
      if (current > 300) {
        setShowAfterScroll(true);
      } else {
        setShowAfterScroll(false);
      }

      // Animation: Scrolling up → disappears, Scrolling down → appears
      if (current < 100) {
        setVisible(false);
      } else {
        if (current > last + 10) {
          // scrolling down → appear
          setVisible(true);
        } else if (current < last - 10) {
          // scrolling up → disappear
          setVisible(false);
        }
      }

      lastScrollYRef.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-20 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:right-24 ${
        visible && showAfterScroll
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <a
        href="#book"
        className="group flex items-center gap-2.5 rounded-full bg-navy-900 px-7 py-3.5 text-[0.9rem] font-bold text-white shadow-[0_12px_32px_-8px_rgba(8,20,43,0.5),0_4px_12px_rgba(8,20,43,0.2)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-[0_16px_40px_-8px_rgba(8,20,43,0.6)] active:scale-[0.98]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
          <Calendar className="h-4 w-4" />
        </span>
        Book a visit
        <span className="ml-1 text-gold-300 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </a>
    </div>
  );
}
