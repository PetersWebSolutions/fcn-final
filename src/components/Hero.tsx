import {
  Calendar,
  Compass,
  Globe,
  ShieldCheck,
  Pin,
  Check,
  SyringeShield,
  ArrowRight,
} from "./Icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-28 md:pt-32">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-paper-grid opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-navy-700/8 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10 lg:pb-24">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-navy-900/12 bg-white/70 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-800 shadow-sm backdrop-blur">
            <Compass className="h-3.5 w-3.5 text-gold-500" />
            <span className="text-navy-900/30">·</span>
            Travel medicine
            <span className="text-navy-900/30">·</span>
            Vaccination
            <span className="text-navy-900/30">·</span>
            Consultation
          </div>

          <h1
            className="reveal mt-6 font-display text-[2.5rem] font-extrabold leading-[1.04] text-navy-900 sm:text-6xl lg:text-[4.1rem]"
            data-reveal-delay="80"
          >
            Your Health.
            <br />
            Your Journey. Our
            <br />
            <span className="text-gold-500">Priority.</span>
          </h1>

          <p className="reveal mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            FCN is your travel-health home — pre-travel consults, travel &amp;
            routine vaccines, medical certificates, and seafarer-ready
            quarantine assistance.
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3" data-reveal-delay="240">
            <a
              href="#book"
              className="group inline-flex items-center gap-2.5 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800"
            >
              <Calendar className="h-4.5 w-4.5 text-gold-300 transition-transform duration-300 group-hover:rotate-6" />
              Book an appointment
            </a>
            <a
              href="#vaccines"
              className="group inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900/35 hover:shadow-soft"
            >
              Explore vaccines
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* open status */}
          <div className="reveal mt-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-600/20 bg-emerald-50/80 px-4 py-2 text-[0.78rem] font-semibold text-emerald-800" data-reveal-delay="300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Open now — walk-ins welcome
          </div>

          {/* affiliations */}
          <div className="reveal mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.78rem] font-medium text-muted" data-reveal-delay="360">
            <a href="#services" className="group inline-flex items-center gap-2 transition-colors hover:text-navy-900">
              <Globe className="h-4 w-4 text-navy-700/60 transition-colors group-hover:text-gold-500" />
              Intl Society of Travel Medicine
            </a>
            <a href="#yellow-fever" className="group inline-flex items-center gap-2 transition-colors hover:text-navy-900">
              <ShieldCheck className="h-4 w-4 text-navy-700/60 transition-colors group-hover:text-gold-500" />
              BOQ Yellow Fever assistance
            </a>
          </div>
        </div>

        {/* Image composition */}
        <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none" data-reveal-delay="200">
          <div className="relative overflow-hidden rounded-[1.75rem] rounded-tr-[3.5rem] rounded-bl-[3.5rem] shadow-pop ring-1 ring-navy-900/10">
            <img
              src="/images/clinic-hero.jpg"
              alt="Bright modern FCN clinic reception with navy armchairs and a white reception desk"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/5.2]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
          </div>

          {/* vaccine count badge */}
          <div className="animate-floaty absolute -left-3 top-5 flex items-center gap-2.5 rounded-2xl border border-navy-900/8 bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur sm:-left-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
              <SyringeShield className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold text-navy-900">
                17 vaccines
              </span>
              <span className="block text-[0.68rem] font-medium text-muted">
                travel + routine
              </span>
            </span>
          </div>

          {/* Room 601 card */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-3.5 shadow-card backdrop-blur sm:inset-x-5 sm:bottom-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-300">
                <Pin className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-600">
                  This way
                </span>
                <span className="block font-display text-lg font-extrabold text-navy-900">
                  Room 601
                </span>
              </span>
            </div>
            <a
              href="#visit"
              className="group shrink-0 rounded-full bg-navy-900 px-4 py-2.5 text-[0.75rem] font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Find us
              <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* walk-in tag */}
          <div className="animate-floaty-slow absolute -right-2 -bottom-5 flex items-center gap-1.5 rounded-full border border-navy-900/8 bg-gold-500 px-3.5 py-2 text-[0.72rem] font-bold text-navy-950 shadow-card sm:-right-5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-navy-900 text-gold-300">
              <Check className="h-3 w-3" />
            </span>
            Walk-in ready
          </div>
        </div>
      </div>
    </section>
  );
}
