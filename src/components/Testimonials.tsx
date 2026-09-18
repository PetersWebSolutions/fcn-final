import { useEffect, useState, useRef } from "react";
import { Star, Check, Quote, ChevronLeft, ChevronRight } from "./Icons";

type Story = {
  name: string;
  fullName: string;
  initials: string;
  quote: string;
  stars: number;
  profilePhoto: string;
  reviewPhoto?: string;
  reviewPhotos?: string[];
  verified: boolean;
  tone: "navy" | "gold";
};

const STORIES: Story[] = [
  {
    name: "Kevin H.",
    fullName: "Kevin Holden",
    initials: "KH",
    quote:
      "Fast service, staffs are accomodating. Got my polio vaxx here at a reasonable price (PHP 1200). Located at 6th floor, elevator available. Best to go during morning",
    stars: 5,
    profilePhoto: "/images/reviewers/kevin-holden.jpg",
    reviewPhoto: "/images/review-photos/reception1.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Vic R.",
    fullName: "Vic Rolfe",
    initials: "VR",
    quote:
      "Excellent and friendly service. I went there without an appointment - and got my Polio vaccine, (with a proper vaccine certificate), within minutes.",
    stars: 5,
    profilePhoto: "/images/reviewers/vic-rolfe.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Jerome A.",
    fullName: "Jerome Adorable",
    initials: "JA",
    quote: "fast transaction. clean and hygienic",
    stars: 5,
    profilePhoto: "/images/reviewers/jerome-adorable.jpg",
    reviewPhotos: [
      "/images/review-photos/reception2.jpg",
      "/images/review-photos/reception3.jpg",
      "/images/review-photos/reception4.jpg",
    ],
    verified: true,
    tone: "navy",
  },
  {
    name: "Richard B.",
    fullName: "Richard Bujda",
    initials: "RB",
    quote:
      "Great stuff , very professional. Whole process took 15 min after I walked in without an appointment scheduled. 10/10",
    stars: 5,
    profilePhoto: "/images/reviewers/richard-bujda.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "S L.",
    fullName: "S L",
    initials: "SL",
    quote: "Good place for flu shot",
    stars: 5,
    profilePhoto: "/images/reviewers/s-l.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "John E.",
    fullName: "John Estrella",
    initials: "JE",
    quote:
      "We called first in the morning simply to inquire, but they invited us to drop-in that same afternoon. The doctor took his time to review my wife's vaccination needs. Shortly thereafter, another doctor administered the vaccines. It was a pleasant, efficient, and professional experience overall.",
    stars: 5,
    profilePhoto: "/images/reviewers/john-estrella.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "WeNeedJesus",
    fullName: "WeNeedJesus",
    initials: "WJ",
    quote: "Service was great and easy. They were helpful till the end. Thank you God bless",
    stars: 5,
    profilePhoto: "/images/reviewers/weneedjesus.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Lydia T.",
    fullName: "Lydia Tarcowan",
    initials: "LT",
    quote: "Very accomdating staff and nurses. Clean clinic.. thank you...",
    stars: 5,
    profilePhoto: "/images/reviewers/lydia-tarcowan.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Keth J.",
    fullName: "Keth Jolly Vier Omongos",
    initials: "KO",
    quote: "Very quick and fast. They will assist and cater to all your vaccine needs.",
    stars: 5,
    profilePhoto: "/images/reviewers/keth-jolly.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Ben T.",
    fullName: "Ben Turner",
    initials: "BT",
    quote: "Super helpful, quick and painless inoculations! Great service & staff. Highly recommended!",
    stars: 5,
    profilePhoto: "/images/reviewers/ben-turner.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Charlene M.",
    fullName: "Charlene McGhee",
    initials: "CM",
    quote: "Dr. Nastor and his team are very kind and accommodating. Clear and informative about the vaccine I was getting. Thank you for your care!",
    stars: 5,
    profilePhoto: "/images/reviewers/charlene-mcghee.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Lester D.",
    fullName: "Lester Diaz",
    initials: "LD",
    quote: "Amazing staff. Got my varicella vaccine here",
    stars: 5,
    profilePhoto: "/images/reviewers/lester-diaz.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Joel B.",
    fullName: "Joel Banaglorioso",
    initials: "JB",
    quote: "Well entertained",
    stars: 5,
    profilePhoto: "/images/reviewers/joel-banaglorioso.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Kevine G.",
    fullName: "Kevine steeve Gandjeto",
    initials: "KG",
    quote: "The employees are really welcoming",
    stars: 5,
    profilePhoto: "/images/reviewers/kevine-gandjeto.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Sandy B.",
    fullName: "sandy booc",
    initials: "SB",
    quote: "Very friendly, staff and informative about the vaccine itself, customer service oriented",
    stars: 5,
    profilePhoto: "/images/reviewers/sandy-booc.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Kannan S.",
    fullName: "Kannan Sreedharan",
    initials: "KS",
    quote: "Best service I got in the Philippines in any business.",
    stars: 5,
    profilePhoto: "/images/reviewers/kannan-sreedharan.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Chuck L.",
    fullName: "Chuck Latter",
    initials: "CL",
    quote: "Excellent service . Only place I will go for shots and information .",
    stars: 5,
    profilePhoto: "/images/reviewers/chuck-latter.jpg",
    verified: true,
    tone: "navy",
  },
  {
    name: "Clayton P.",
    fullName: "Clayton Parayno",
    initials: "CP",
    quote: "Very accommodating Doctor and staff!! Highly recommendable.",
    stars: 5,
    profilePhoto: "/images/reviewers/clayton-parayno.jpg",
    verified: true,
    tone: "gold",
  },
  {
    name: "Von Kevin E.",
    fullName: "Von Kevin Evangelista",
    initials: "VE",
    quote:
      "It's fast and good, I think they're 400 above the price on BOQ, but there's no appointment, there's not much of a line, the service is good.",
    stars: 5,
    profilePhoto: "/images/reviewers/von-kevin-evangelista.jpg",
    reviewPhotos: ["/images/review-photos/reception5.jpg", "/images/review-photos/reception6.jpg"],
    verified: true,
    tone: "navy",
  },
];

const NO_SEE_MORE_NAMES = ["Vic R.", "Richard B.", "Charlene M.", "Von Kevin E."];

function Card({ story, index }: { story: Story; index: number }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const photos = story.reviewPhotos || (story.reviewPhoto ? [story.reviewPhoto] : []);
  const hasPhotos = photos.length > 0;
  const isExcludedFromSeeMore = NO_SEE_MORE_NAMES.includes(story.name);
  // Consider long if more than ~120 chars or 18 words — enough to exceed 5 lines, but excluded names never show toggle
  const isLong = !isExcludedFromSeeMore && (story.quote.length > 120 || story.quote.split(" ").length > 18);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const showClamp = !isExcludedFromSeeMore && !isExpanded;

  return (
    <>
      <article
        className={`group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${hasPhotos ? "border-gold-500/30 ring-1 ring-gold-500/10" : "border-navy-900/10"} ${isExcludedFromSeeMore || isExpanded ? "min-h-[300px] h-auto sm:min-h-[320px] lg:min-h-[340px]" : "h-[300px] sm:h-[320px] lg:h-[340px]"}`}
        data-reveal-delay={`${index * 60}`}
      >
        <div className={`h-1 w-full shrink-0 ${hasPhotos ? "bg-gradient-to-r from-gold-500 via-gold-400 to-navy-900" : "bg-gradient-to-r from-navy-900 via-navy-800 to-gold-500"}`} />

        {hasPhotos && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-gold-500 px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-wide text-navy-900 shadow-sm">
            📸 Clinic photos
          </div>
        )}

        <div className="flex h-full flex-col p-4 sm:p-5">
          <div className="flex shrink-0 items-center gap-3">
            <img
              src={story.profilePhoto}
              alt={story.fullName}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-navy-900/10 sm:h-11 sm:w-11"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 font-display text-[0.85rem] font-bold leading-tight text-navy-900 sm:text-[0.9rem]">
                <span className="truncate">{story.name}</span>
                {story.verified && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                    VERIFIED
                  </span>
                )}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <div className="flex gap-0.5 text-gold-500">
                  {Array.from({ length: story.stars }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold-500" />
                  ))}
                </div>
                <span className="text-[0.65rem] font-bold text-navy-900/50">{story.stars}.0</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-1 flex-col overflow-hidden">
            <blockquote
              className={`text-[0.82rem] leading-relaxed text-ink-soft sm:text-[0.84rem] ${showClamp ? "line-clamp-5" : ""}`}
              style={showClamp ? { display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}}
            >
              “{story.quote}”
            </blockquote>

            {isLong && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 self-start text-[0.75rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-600 hover:decoration-gold-500"
              >
                {isExpanded ? "Show less" : "See full review"}
              </button>
            )}
          </div>

          {photos.length > 0 && (
            <div className="mt-2.5 shrink-0">
              <div className="flex flex-wrap gap-2">
                {photos.map((photo, i) => (
                  <button
                    key={photo + i}
                    type="button"
                    onClick={() => setLightbox(photo)}
                    className="group/photo relative overflow-hidden rounded-xl border border-navy-900/10 bg-paper transition-all hover:border-navy-900/20 hover:shadow-soft"
                    title="Click to pop up — stays on site"
                  >
                    <img
                      src={photo}
                      alt={`Review photo ${i + 1} by ${story.name}`}
                      className="h-10 w-10 object-cover transition-transform duration-300 group-hover/photo:scale-105 sm:h-11 sm:w-11"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy-900/0 opacity-0 transition-all group-hover/photo:bg-navy-900/30 group-hover/photo:opacity-100">
                      <span className="rounded-full bg-white/90 px-2 py-1 text-[0.6rem] font-bold text-navy-900 shadow-soft">View</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2.5 flex shrink-0 items-center gap-1.5 border-t border-dashed border-navy-900/10 pt-2.5 text-[0.6rem] text-muted">
            <Quote className="h-3 w-3 shrink-0 text-gold-500/60" />
            <span className="truncate">Real Google review{hasPhotos ? ` • ${photos.length} photo${photos.length > 1 ? "s" : ""}` : ""}</span>
          </div>
        </div>
      </article>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/85 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-[1.5rem] bg-white shadow-pop" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt={`Enlarged by ${story.name}`} className="max-h-[80vh] w-auto max-w-[90vw] object-contain sm:max-w-3xl" />
            <div className="flex items-center justify-between bg-white px-4 py-3">
              <p className="text-[0.72rem] font-medium text-muted">Photo by {story.name} — click outside to close</p>
              <button type="button" onClick={() => setLightbox(null)} className="rounded-full bg-navy-900 px-4 py-1.5 text-[0.75rem] font-semibold text-white hover:bg-navy-800">
                Close
              </button>
            </div>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900/80 text-white backdrop-blur hover:bg-navy-900"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CarouselRow({
  stories,
}: {
  stories: Story[];
  title: string;
  subtitle: string;
  countLabel: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 12);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 12);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [stories]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // mobile shows 2 cards, desktop 3 — scroll by ~1 card
    const isMobile = window.innerWidth < 640;
    const amount = el.clientWidth * (isMobile ? 0.48 : 0.33);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="reveal relative">
      <div
        ref={scrollRef}
        className="flex items-start gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 snap-x snap-mandatory [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((story, i) => (
          <div
            key={story.name + i}
            className="flex h-auto min-h-[300px] w-[46%] min-w-[46%] max-w-[46%] flex-shrink-0 snap-start flex-col sm:min-h-[320px] sm:w-[44%] sm:min-w-[44%] sm:max-w-[44%] md:w-[32%] md:min-w-[32%] md:max-w-[32%] lg:min-h-[340px] lg:w-[31.5%] lg:min-w-[31.5%] lg:max-w-[31.5%] xl:w-[30.5%] xl:min-w-[30.5%] xl:max-w-[30.5%]"
          >
            <div className="h-auto w-full">
              <Card story={story} index={i} />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll arrows under boxes */}
      <div className="mt-1 flex justify-end gap-2 sm:justify-center">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canLeft}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 shadow-soft transition-all hover:border-navy-900/30 hover:bg-paper disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canRight}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white shadow-soft transition-all hover:bg-navy-800 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-14 left-0 top-1 w-6 bg-gradient-to-r from-[#faf8f3] to-transparent sm:w-8 lg:hidden" />
      <div className="pointer-events-none absolute bottom-14 right-0 top-1 w-6 bg-gradient-to-l from-[#faf8f3] to-transparent sm:w-8 lg:hidden" />
    </div>
  );
}

export default function Testimonials() {
  const photoStories = STORIES.filter((s) => (s.reviewPhotos && s.reviewPhotos.length > 0) || s.reviewPhoto);
  const nonPhotoStories = STORIES.filter((s) => !(s.reviewPhotos && s.reviewPhotos.length > 0) && !s.reviewPhoto);

  // 7 / 6 / 6 split with photo at front of each
  const group1: Story[] = [photoStories[0], ...nonPhotoStories.slice(0, 6)].filter(Boolean) as Story[]; // 7
  const group2: Story[] = [photoStories[1], ...nonPhotoStories.slice(6, 11)].filter(Boolean) as Story[]; // 6
  const group3: Story[] = [photoStories[2], ...nonPhotoStories.slice(11, 16)].filter(Boolean) as Story[]; // 6

  return (
    <section className="relative overflow-hidden bg-paper-deep/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Patient stories
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]" data-reveal-delay="80">
            Travelers who flew <span className="font-playfair text-[1.25em] font-bold italic leading-[0.9] text-gold-500">protected</span>
          </h2>
          <p className="reveal mt-3 text-[0.9rem] leading-relaxed text-ink-soft" data-reveal-delay="120">
            19 verified reviews — 3 carousels, photo reviews at the front of each. Small photos pop up on-site.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-6 lg:gap-8">
          <CarouselRow
            stories={group1}
            title="7 reviews"
            subtitle="Starts with Kevin H. — 1 clinic photo at front"
            countLabel=""
          />
          <CarouselRow
            stories={group2}
            title="6 more reviews"
            subtitle="Starts with Jerome A. — 3 clinic photos at front"
            countLabel=""
          />
          <CarouselRow
            stories={group3}
            title="6 more reviews"
            subtitle="Starts with Von Kevin E. — 2 clinic photos at front"
            countLabel=""
          />
        </div>

        <div className="reveal mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-center" data-reveal-delay="300">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-navy-900/10 bg-white px-4 py-2 text-[0.7rem] font-medium text-muted shadow-soft">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {STORIES.length} verified reviews • 3 carousels (7 + 6 + 6) • Photo reviews first • Small photos • No fake
          </div>
        </div>
      </div>
    </section>
  );
}
