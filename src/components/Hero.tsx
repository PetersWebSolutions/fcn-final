import { useState, useEffect } from "react";
import {
  Calendar,
  Compass,
  Pin,
  Check,
  SyringeShield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "./Icons";

const GALLERY_IMAGES = [
  { src: "/images/gallery1.jpeg", alt: "FCN clinic photo 1" },
  { src: "/images/gallery2.jpeg", alt: "FCN clinic photo 2" },
  { src: "/images/gallery3.jpeg", alt: "FCN clinic photo 3" },
  { src: "/images/gallery4.jpg", alt: "FCN clinic photo 4" },
  { src: "/images/gallery5.jpg", alt: "FCN clinic photo 5" },
  { src: "/images/gallery6.jpg", alt: "FCN clinic photo 6" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % GALLERY_IMAGES.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative overflow-hidden bg-paper pt-36 md:pt-44">
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
            className="reveal mt-6 font-display text-[13vw] font-extrabold leading-[0.88] tracking-[-0.03em] xs:text-[12vw] sm:text-6xl lg:text-[4.1rem] sm:leading-[1.04] sm:tracking-normal"
            data-reveal-delay="80"
          >
            <span className="text-navy-950">Your Health.</span>
            <br />
            <span className="text-navy-950">Your Journey.</span>
            <br />
            <span className="font-playfair font-bold italic text-gold-500">Our Priority.</span>
          </h1>

          <p className="reveal mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            FCN is your travel-health home — pre-travel consults, travel &amp;
            routine vaccines, medical certificates, and seafarer-ready
            quarantine assistance.
          </p>

          <div className="reveal mt-8 flex flex-nowrap items-center gap-2 sm:gap-3" data-reveal-delay="240">
            <a
              href="#book"
              className="group inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2.5 whitespace-nowrap rounded-full bg-navy-900 px-4 py-3 text-[0.8rem] font-semibold text-white shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <Calendar className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-gold-300 transition-transform duration-300 group-hover:rotate-6 shrink-0" />
              <span className="whitespace-nowrap">Book an appointment</span>
            </a>
            <a
              href="#vaccines"
              className="group inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full border border-navy-900/15 bg-white px-4 py-3 text-[0.8rem] font-semibold text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900/35 hover:shadow-soft sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <span className="whitespace-nowrap">Explore vaccines</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
            </a>
          </div>
        </div>

        {/* Image composition — art frame with circular photo screen */}
        <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none" data-reveal-delay="200">
          <div className="group/frame relative overflow-hidden rounded-[2rem] shadow-pop ring-1 ring-navy-900/10">
            {/* Art frame */}
            <div className="relative aspect-[3/2] w-full bg-navy-950">
              <img
                src="/images/hero-frame.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Circular display screen — gallery photos */}
              <div className="absolute left-[68.7%] top-[53.25%] aspect-[13/10] w-[65.6%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-4 ring-gold-500">
                {GALLERY_IMAGES.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                {/* Gallery controls */}
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                  className="absolute left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-soft backdrop-blur transition-all hover:bg-white group-hover/frame:flex"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c + 1) % GALLERY_IMAGES.length)}
                  className="absolute right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-soft backdrop-blur transition-all hover:bg-white group-hover/frame:flex"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  {GALLERY_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"}`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
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
          <div className="absolute bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-3.5 shadow-card backdrop-blur sm:bottom-5 sm:left-5">
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
