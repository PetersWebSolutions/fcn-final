import { useState, useEffect } from "react";
import Logo from "./Logo";
import {
  Pin,
  Clock,
  Calendar,
  Heart,
  ChevronRight,
} from "./Icons";

const EXPLORE = [
  { label: "Our services", href: "#services" },
  { label: "Vaccines available", href: "#vaccines" },
  { label: "Yellow Fever & BOQ", href: "#yellow-fever" },
  { label: "Hours & Room 601", href: "#visit" },
  { label: "Book a visit", href: "#book" },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.080!2d120.9804261!3d14.5811745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca25bf79af95:0xd7c83757e4421931!2sSan%20Luis%20Terraces%2C%20Kalaw%20Ave%2C%20Ermita%2C%20Manila%2C%201000%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1726000000000!5m2!1sen!2sph";

export default function Footer() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMapOpen(false);
    };
    if (isMapOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMapOpen]);
  return (
    <footer className="relative bg-navy-950 text-white">
      <div className="dotted-divider-light opacity-60" />
      <div className="bg-blueprint pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Top — divided into 2: FCN logo + Explore | Google Map */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-12">
          {/* Left: Logo + Explore + Visit compact */}
          <div className="space-y-8">
            <div>
              <Logo variant="light" />
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-10">
              <div>
                <h4 className="eyebrow text-gold-400 !text-[0.7rem] !font-bold !tracking-[0.2em] !justify-start !text-left">Explore</h4>
                <ul className="mt-4 space-y-2.5">
                  {EXPLORE.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-gold-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="eyebrow text-gold-400 !text-[0.7rem] !font-bold !tracking-[0.2em] !justify-start !text-left">Visit us</h4>
                <div className="mt-4 space-y-2.5 text-[0.82rem] leading-relaxed text-white/70">
                  <p>
                    <span className="block font-bold uppercase tracking-wide text-white text-[0.78rem]">FCN Medical and Vaccination Center</span>
                    <span className="block">Room 601, 6/F San Luis Terraces</span>
                    <span className="block">638 T.M. Kalaw Ave, Ermita Manila 1000</span>
                  </p>
                  <p className="text-[0.78rem]">
                    Tel. 87429179
                    <br />
                    <a href="mailto:fcnmedical.vaccination@gmail.com" className="text-gold-300 hover:text-gold-200 underline underline-offset-2 break-all">fcnmedical.vaccination@gmail.com</a>
                  </p>
                  <p className="flex items-center gap-1.5 text-[0.75rem] text-white/50">
                    <Clock className="h-3.5 w-3.5 text-gold-400" />
                    Mon–Fri 8–5 · Sat 8–4
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-[0.8rem] font-bold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              <Calendar className="h-4 w-4" />
              Book an appointment
            </a>
          </div>

          {/* Right: Google Map — more space — clickable to popup */}
          <div
            id="footer-map"
            onClick={() => setIsMapOpen(true)}
            className="group/map overflow-hidden rounded-[1.25rem] border border-white/10 bg-navy-900/50 shadow-soft flex flex-col cursor-pointer transition-all duration-300 hover:border-gold-500/30 hover:shadow-[0_0_0_1px_rgba(198,154,53,0.2),0_12px_30px_-10px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-5 py-3 bg-navy-900/80 border-b border-white/10">
              <h4 className="eyebrow text-gold-400 flex items-center gap-2 !text-[0.7rem] !font-bold !tracking-[0.18em] !justify-start !text-left">
                <Pin className="h-4 w-4" />
                San Luis Terraces — Live Map
              </h4>
              <span className="text-[0.65rem] font-medium text-white/50 group-hover/map:text-gold-300 transition-colors">Click to enlarge • 14.5811745, 120.9804261</span>
            </div>
            <div className="relative flex-1 min-h-[280px] lg:min-h-[320px] bg-navy-900">
              <iframe
                id="fcn-live-map"
                title="FCN Medical and Vaccination Center — San Luis Terraces @14.5811745,120.9804261"
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 pointer-events-none"
              />
              {/* Click overlay to open popup — keeps user on site */}
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-navy-950/0 transition-all duration-300 group-hover/map:bg-navy-950/20">
                <span className="rounded-full bg-navy-950/80 px-4 py-2 text-[0.7rem] font-bold tracking-wide text-white opacity-0 backdrop-blur-md border border-white/10 transition-all duration-300 group-hover/map:opacity-100 group-hover/map:translate-y-0 translate-y-2">
                  Click to open popup map
                </span>
              </div>
            </div>
            <div className="px-5 py-3 bg-navy-900/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-white/60">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMapOpen(true);
                }}
                className="text-gold-300 hover:text-gold-200 underline underline-offset-2 text-left"
              >
                Room 601, 6/F San Luis Terraces — View larger map
              </button>
              <span className="text-white/40">● Popup — 14.5811745, 120.9804261</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-[0.74rem] text-white/45 sm:flex-row">
          <p>© 2026 FCN. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <Heart className="h-3.5 w-3.5 text-gold-400" />
            for healthy journeys
          </p>
        </div>
      </div>

      {/* Popup map modal — enlarge feature only, classy borders, no directions */}
      {isMapOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setIsMapOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="San Luis Terraces live map popup"
        >
          <div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[1.25rem] border border-white/15 bg-navy-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-navy-900/90 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Pin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[0.8rem] font-bold uppercase tracking-wide text-white">San Luis Terraces — Live Map</h4>
                  <p className="text-[0.68rem] text-white/50">Room 601, 6/F 638 T.M. Kalaw Ave, Ermita Manila 1000 • 14.5811745, 120.9804261</p>
                </div>
              </div>
              <button
                onClick={() => setIsMapOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close map popup"
              >
                ✕
              </button>
            </div>

            <div className="relative h-[70vh] min-h-[400px] w-full bg-navy-900 sm:h-[75vh]">
              <iframe
                title="FCN Medical — San Luis Terraces popup place @14.5811745,120.9804261"
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-navy-900/90 px-5 py-3 text-[0.72rem] text-white/60">
              <span>FCN Medical — Room 601, 6/F San Luis Terraces • 14.5811745, 120.9804261</span>
              <div className="flex items-center gap-3">
                <span className="hidden text-white/40 sm:inline">ESC or click outside to close • stays on site</span>
                <button
                  onClick={() => setIsMapOpen(false)}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-[0.75rem] font-bold text-white transition-colors hover:bg-white/15"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
