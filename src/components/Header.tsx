import { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import { Calendar, Clock, Menu, Close, Pin } from "./Icons";
import OpenStatusBar from "./OpenStatusBar";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Vaccines", href: "#vaccines" },
  { label: "Yellow Fever", href: "#yellow-fever" },
  { label: "Doctors", href: "#doctors" },
  { label: "Visit", href: "#visit" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 12);

      // Scroll down → FCN Logo moves UP to disappear, Moving bar moves UP but stays on top
      // Scroll up → FCN Logo comes DOWN and pushes Moving bar DOWN
      if (current < 100) {
        setHeaderVisible(true);
      } else {
        const last = lastScrollYRef.current;
        if (current > last + 8) {
          // scrolling DOWN → hide FCN Logo, moving bar moves to top
          setHeaderVisible(false);
        } else if (current < last - 8) {
          // scrolling UP → show FCN Logo, pushes moving bar down
          setHeaderVisible(true);
        }
      }
      lastScrollYRef.current = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) =>
      document.querySelector(n.href)
    ).filter(Boolean) as HTMLElement[];
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* FCN Logo header — hides on scroll down, shows on scroll up — collapses so moving bar moves to top */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          headerVisible ? "max-h-[120px] translate-y-0 opacity-100" : "max-h-0 -translate-y-full opacity-0"
        }`}
      >
        {/* Main nav */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/90 shadow-[0_8px_30px_-18px_rgba(8,20,43,0.35)] backdrop-blur-xl"
              : "bg-white/70 backdrop-blur-md"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6 lg:px-10">
            <Logo />

            <ul className="hidden items-center gap-8 lg:flex">
              {NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href} className="flex flex-col items-center">
                    <a
                      href={item.href}
                      className={`link-sweep text-[0.86rem] font-semibold transition-colors ${
                        isActive
                          ? "text-navy-900"
                          : "text-ink-soft hover:text-navy-900"
                      }`}
                    >
                      {item.label}
                    </a>
                    <span
                      className={`mt-0.5 h-1 w-1 rounded-full bg-gold-500 transition-all duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="#book"
                className="group hidden items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-[0.82rem] font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-pop sm:inline-flex"
              >
                <Calendar className="h-4 w-4 text-gold-300 transition-transform duration-300 group-hover:rotate-6" />
                Book a visit
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-900 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Scrolling open status bar — ALWAYS visible (now open/closed moving bar) */}
      <OpenStatusBar />

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-16 z-40 origin-top bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-6">
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={`transform transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-navy-900/8 py-4 font-display text-xl font-bold text-navy-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-4 text-sm font-semibold text-white"
            >
              <Calendar className="h-4 w-4 text-gold-300" />
              Book an appointment
            </a>
            <p className="flex items-center justify-center gap-2 text-xs text-muted">
              <Pin className="h-3.5 w-3.5 text-gold-500" /> Room 601
              <span className="text-navy-900/20">·</span>
              <Clock className="h-3.5 w-3.5 text-gold-500" /> Mon–Sat
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
