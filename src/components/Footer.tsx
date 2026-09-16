import Logo from "./Logo";
import {
  Globe,
  ShieldCheck,
  TestTube,
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

const CREDENTIALS = [
  { icon: Globe, label: "ISTM member community" },
  { icon: ShieldCheck, label: "Seafarer friendly" },
  { icon: TestTube, label: "Tuberculin / PPD testing" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white">
      <div className="dotted-divider-light opacity-60" />
      <div className="bg-blueprint pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs font-display text-[1.02rem] font-semibold italic leading-snug text-white/85">
              “Your Health, Your Journey, Our Priority.”
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {CREDENTIALS.map((c) => {
                const Icon = c.icon;
                return (
                  <li
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-2 text-[0.72rem] font-medium text-white/70"
                  >
                    <Icon className="h-4 w-4 text-gold-400" />
                    {c.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="eyebrow text-gold-400">Explore</h4>
            <ul className="mt-5 space-y-3">
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

          {/* Visit */}
          <div>
            <h4 className="eyebrow text-gold-400">Visit us</h4>
            <div className="mt-5 space-y-3.5 text-sm text-white/65">
              <p className="flex gap-2.5">
                <Pin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" />
                <span>
                  Room 601 — follow the navy wayfinding signs from the lobby to
                  the 6th floor.
                </span>
              </p>
              <p className="flex gap-2.5">
                <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" />
                <span>
                  Mon–Fri 8:00 AM – 5:00 PM
                  <br />
                  Sat 8:00 AM – 4:00 PM
                </span>
              </p>
            </div>
            <a
              href="#book"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-[0.82rem] font-bold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              <Calendar className="h-4 w-4" />
              Book an appointment
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-[0.74rem] text-white/45 sm:flex-row">
          <p>© 2026 FCN. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <Heart className="h-3.5 w-3.5 text-gold-400" />
            for healthy journeys
          </p>
        </div>
      </div>
    </footer>
  );
}
