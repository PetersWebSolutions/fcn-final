import { useEffect, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "./Icons";

type Story = {
  initials: string;
  name: string;
  meta: string;
  quote: string;
  tone: "navy" | "gold";
};

const STORIES: Story[] = [
  {
    initials: "MC",
    name: "Capt. Miguel R.",
    meta: "Seafarer · South America",
    quote:
      "Processed my pre-departure vaccines and certificates in one visit. They even helped me schedule my BOQ Yellow Fever slot. Sailed on time.",
    tone: "navy",
  },
  {
    initials: "JA",
    name: "Jessa A.",
    meta: "First-time traveler to Thailand",
    quote:
      "The pre-travel consult was so thorough — destination risks, food safety, even packing checklist. Felt genuinely cared for.",
    tone: "gold",
  },
  {
    initials: "DK",
    name: "Daniel K.",
    meta: "Frequent flyer",
    quote:
      "In and out for my flu and Tdap boosters in 30 minutes. Bright, calm clinic and zero waiting around. Booking ahead works.",
    tone: "navy",
  },
  {
    initials: "RP",
    name: "Rosa P.",
    meta: "Nurse · Hajj pilgrim group",
    quote:
      "Meningococcal certificates for our whole group were organized without a hitch. The team understood every visa requirement.",
    tone: "gold",
  },
  {
    initials: "TS",
    name: "Tom S.",
    meta: "Backpacker · Southeast Asia",
    quote:
      "Rabies and Japanese encephalitis planned around my departure date. Clear pricing, zero pressure, and the room is easy to find.",
    tone: "navy",
  },
];

function Card({ story }: { story: Story }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-navy-900/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Quote className="h-7 w-7 text-gold-500/80" />
      <div className="mt-3 flex gap-0.5 text-gold-500" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5" />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-[0.85rem] italic leading-relaxed text-ink-soft">
        “{story.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-900/8 pt-4">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-[0.72rem] font-extrabold ${
            story.tone === "navy"
              ? "bg-navy-900 text-gold-300"
              : "bg-gold-500 text-navy-950"
          }`}
        >
          {story.initials}
        </span>
        <span>
          <span className="block font-display text-sm font-bold text-navy-900">
            {story.name}
          </span>
          <span className="block text-[0.72rem] text-muted">{story.meta}</span>
        </span>
      </figcaption>
    </article>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = card ? card.getBoundingClientRect().width + 20 : 320;

    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 24) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir === -1 && el.scrollLeft <= 4) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) scroll(1);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper-deep/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="reveal eyebrow flex items-center gap-3 text-gold-600">
              <span className="h-px w-7 bg-gold-500/50" />
              Patient stories
            </p>
            <h2 className="reveal mt-4 max-w-md font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]" data-reveal-delay="80">
              Travelers who flew protected
            </h2>
          </div>
          <div className="hidden shrink-0 gap-2.5 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous stories"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-all duration-300 hover:border-navy-900 hover:bg-navy-900 hover:text-gold-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next stories"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-300 transition-all duration-300 hover:-translate-x-0 hover:bg-navy-800"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onTouchStart={() => (pausedRef.current = true)}
          onTouchEnd={() =>
            window.setTimeout(() => (pausedRef.current = false), 4000)
          }
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
        >
          {STORIES.map((s, i) => (
            <div
              key={s.name}
              className="reveal w-[85%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-2.5rem)/3)]"
              data-reveal-delay={`${i * 90}`}
            >
              <Card story={s} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2.5 sm:hidden">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous stories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next stories"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-gold-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
