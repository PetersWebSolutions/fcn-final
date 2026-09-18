import { useState, useEffect, useRef, useCallback } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  ClipboardPlane,
  SyringeShield,
  Stethoscope,
  DocCheck,
  TestTube,
  ArrowUpRight,
} from "./Icons";

type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tag: string;
  title: string;
  body: string;
};

const SERVICES: Service[] = [
  {
    icon: ClipboardPlane,
    tag: "Before you fly",
    title: "Pre-Travel Health Consultation",
    body: "Destination risk review, vaccine planning, malaria guidance and a packing checklist tailored to your itinerary — ideally 4–6 weeks before departure.",
  },
  {
    icon: SyringeShield,
    tag: "Core service",
    title: "Travel & Routine Vaccination",
    body: "Typhoid, cholera, Japanese encephalitis, meningococcal, rabies, flu and more — matched to your route after a quick medical screen.",
  },
  {
    icon: Stethoscope,
    tag: "After you land",
    title: "Post-Travel Consultation",
    body: "Fever, stomach, skin or fatigue after a trip? Prompt review, testing referrals and a clear recovery plan.",
  },
  {
    icon: DocCheck,
    tag: "Documentation",
    title: "Medical & Travel Certificates",
    body: "Fit-to-travel letters, vaccination certificates and seafarer-ready medical documentation prepared same-visit.",
  },
  {
    icon: TestTube,
    tag: "Testing",
    title: "Tuberculin / Mantoux / PPD Testing",
    body: "Tuberculin skin testing (Mantoux / PPD) with proper reading schedule and documentation for work, school or travel.",
  },
];

function Card({ service, isActive }: { service: Service; isActive: boolean }) {
  const Icon = service.icon;
  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-soft transition-all duration-500
        ${isActive ? "border-gold-500/40 shadow-[0_0_0_1px_rgba(198,154,53,0.25),0_20px_40px_-12px_rgba(0,0,0,0.15),0_8px_20px_-8px_rgba(198,154,53,0.25)] lg:p-7" : "border-navy-900/10"}
      `}
      style={{ backfaceVisibility: "hidden" } as any}
    >
      <div className="flex items-start justify-between">
        <span className={`flex items-center justify-center rounded-xl bg-navy-900 text-gold-300 shadow-soft transition-all duration-300 group-hover:scale-105 group-hover:rotate-[-4deg] ${isActive ? "h-14 w-14 lg:h-[3.25rem] lg:w-[3.25rem]" : "h-12 w-12"}`}>
          <Icon className={`${isActive ? "h-7 w-7" : "h-6 w-6"}`} />
        </span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300
          ${isActive ? "border-navy-900/20 text-navy-900/60 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-gold-300" : "border-navy-900/12 text-navy-900/40"}
        `}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <span className={`mt-5 inline-flex w-fit items-center rounded-full border border-gold-500/35 bg-gold-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-600 ${isActive ? "lg:text-[0.62rem]" : ""}`}>
        {service.tag}
      </span>

      <h3 className={`mt-3 font-display font-bold leading-snug text-navy-900 ${isActive ? "text-[1.15rem] lg:text-[1.25rem]" : "text-[1.05rem]"}`}>{service.title}</h3>
      <p className={`mt-2 leading-relaxed text-muted ${isActive ? "text-[0.88rem] lg:text-[0.9rem]" : "text-[0.84rem]"}`}>{service.body}</p>

      {isActive && (
        <div className="mt-4 h-1 w-12 rounded-full bg-gold-500/60" />
      )}
    </article>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [metrics, setMetrics] = useState({ cardW: 380, gap: 20, isMobile: false });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const startXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);

  // Measure container + responsive metrics
  const updateMetrics = useCallback(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const cardW = isMobile ? Math.min(320, window.innerWidth * 0.82) : isTablet ? 360 : 380;
    const gap = isMobile ? 14 : 20;
    setMetrics({ cardW, gap, isMobile });
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    const ro = new ResizeObserver(() => updateMetrics());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateMetrics);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, [updateMetrics]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolling(true);
          if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = window.setTimeout(() => setIsScrolling(false), 1800);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const shouldPause = isHovered || isDragging || isTouching || isScrolling || !isInView;

  useEffect(() => {
    if (shouldPause) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % SERVICES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [shouldPause]);

  const goTo = useCallback((i: number) => {
    const len = SERVICES.length;
    const normalized = ((i % len) + len) % len;
    setActive(normalized);
    setIsTouching(true);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => setIsTouching(false), 2000);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsTouching(true);
    startXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDeltaRef.current = e.clientX - startXRef.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const threshold = 55;
    if (dragDeltaRef.current < -threshold) {
      setActive((p) => (p + 1) % SERVICES.length);
    } else if (dragDeltaRef.current > threshold) {
      setActive((p) => (p - 1 + SERVICES.length) % SERVICES.length);
    }
    setIsDragging(false);
    dragDeltaRef.current = 0;
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => setIsTouching(false), 2200);
  };

  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const DURATION = 900;

  const dragInfluence = isDragging ? dragDeltaRef.current * 0.85 : 0;
  const translateX = containerWidth / 2 - metrics.cardW / 2 - active * (metrics.cardW + metrics.gap) + dragInfluence;

  return (
    <section ref={sectionRef} id="services" className="relative bg-paper py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Our services
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]" data-reveal-delay="80">
            <span className="font-playfair text-[1.25em] font-bold italic leading-[0.9] text-gold-500">Complete care,</span> before and after you fly
          </h2>
          <p className="reveal mt-4 text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            From pre-travel risk consults to post-travel checkups and the certificates you need to board — everything in one calm, unhurried visit.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mt-12 lg:mt-14">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-gradient-to-r from-paper to-transparent sm:w-[12%] lg:w-[18%]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-gradient-to-l from-paper to-transparent sm:w-[12%] lg:w-[18%]" />

        {/* prev / next — visible on mobile with < > */}
        <button
          aria-label="Previous service"
          onClick={() => goTo(active - 1)}
          className="absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/15 bg-white/95 text-navy-900 shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-300 hover:bg-white hover:border-navy-900/25 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:scale-95 sm:h-10 sm:w-10 sm:left-2 lg:left-6"
        >
          <span className="text-[1.1rem] font-bold leading-none">&lt;</span>
        </button>
        <button
          aria-label="Next service"
          onClick={() => goTo(active + 1)}
          className="absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/15 bg-white/95 text-navy-900 shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-300 hover:bg-white hover:border-navy-900/25 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:scale-95 sm:h-10 sm:w-10 sm:right-2 lg:right-6"
        >
          <span className="text-[1.1rem] font-bold leading-none">&gt;</span>
        </button>

        <div
          ref={containerRef}
          className="relative mx-auto max-w-7xl cursor-grab select-none overflow-hidden px-0 py-16 active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={() => setIsTouching(true)}
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="flex items-stretch"
            style={{
              gap: `${metrics.gap}px`,
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: isDragging ? "none" : `transform ${DURATION}ms ${EASE}`,
              willChange: "transform",
            }}
          >
            {SERVICES.map((s, i) => {
              const isActive = i === active;
              const distance = Math.abs(i - active);
              // Center bigger: active 1.12 desktop / 1.06 mobile, sides smaller
              const scale = isActive ? (metrics.isMobile ? 1.06 : 1.12) : distance === 1 ? 0.88 : 0.8;
              const opacity = isActive ? 1 : distance === 1 ? 0.78 : 0.55;
              const y = isActive ? (metrics.isMobile ? -6 : -10) : distance === 1 ? 10 : 20;

              return (
                <div
                  key={s.title}
                  onClick={() => goTo(i)}
                  className="relative shrink-0"
                  style={{
                    width: `${metrics.cardW}px`,
                    transform: `scale(${scale}) translate3d(0, ${y}px, 0)`,
                    opacity,
                    transition: isDragging
                      ? "none"
                      : `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}`,
                    transformOrigin: "center bottom",
                    willChange: "transform, opacity",
                    zIndex: isActive ? 5 : 3 - distance,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* active glow */}
                  <div
                    className="pointer-events-none absolute -inset-2 rounded-[1.2rem] bg-gold-500/10 blur-[20px]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: `opacity ${DURATION}ms ${EASE}`,
                    }}
                  />
                  <div className="relative h-full">
                    <Card service={s} isActive={isActive} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* dots */}
        <div className="mt-2 flex items-center justify-center gap-2.5">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to service ${i + 1}`}
              onClick={() => goTo(i)}
              className="group relative py-2"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-700
                  ${i === active ? "w-7 bg-navy-900" : "w-1.5 bg-navy-900/25 group-hover:bg-navy-900/50"}
                `}
                style={{ transitionTimingFunction: EASE }}
              />
            </button>
          ))}
        </div>

        {/* status hint */}
        <p className="mt-4 text-center text-[0.72rem] font-medium tracking-wide text-navy-900/40">
          {shouldPause ? (
            isScrolling ? "Paused while scrolling • will resume" : "Paused • drag or tap to explore"
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="sm:hidden flex items-center gap-1"><span className="font-bold">&lt;</span> swipe or tap arrows <span className="font-bold">&gt;</span></span>
              <span className="hidden sm:inline">Drag or tap to explore • Auto-playing</span>
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
