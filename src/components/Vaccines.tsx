import { useMemo, useState } from "react";
import { Shield, Search, Grid, Plane, Refresh, SearchX } from "./Icons";

type Category = "travel" | "routine";
type BadgeTone = "navy" | "gold";

type Vaccine = {
  name: string;
  body: string;
  category: Category;
  badge?: string;
};

const VACCINES: Vaccine[] = [
  { name: "BCG", body: "TB protection for infants", category: "routine" },
  { name: "Cholera", body: "For areas with limited clean water access", category: "travel" },
  { name: "Hepatitis A & B", body: "Two-dose liver protection series", category: "routine" },
  { name: "HPV", body: "Cervical & cancer prevention", category: "routine" },
  { name: "Influenza (Flu vaccine)", body: "Yearly flu protection for all ages", category: "routine" },
  { name: "Influenza (Flu vaccine)", body: "Yearly flu protection for travelers", category: "travel", badge: "Seasonal" },
  { name: "Japanese Encephalitis", body: "For rural Asia & long stays", category: "travel" },
  { name: "Meningococcal", body: "Required for Hajj & sub-Saharan Africa", category: "travel", badge: "Required for Hajj" },
  { name: "MMR (Measles, Mumps, Rubella)", body: "Measles, mumps, rubella in one shot", category: "routine" },
  { name: "Pneumococcal", body: "Pneumonia protection for adults", category: "routine", badge: "Recommended" },
  { name: "Polio", body: "Childhood & catch-up protection", category: "routine" },
  { name: "Rabies", body: "Pre-exposure series for vets & adventurers", category: "travel", badge: "Pre-exposure" },
  { name: "Typhoid", body: "Enteric fever protection", category: "travel" },
  { name: "Varicella (Chicken Pox)", body: "Chicken pox protection", category: "routine" },
  { name: "Tetanus, Diphtheria & Pertussis (Tdap)", body: "Decennial booster & pregnancy protection", category: "routine" },
  { name: "COVID-19", body: "Current-strain protection & updated boosters", category: "routine", badge: "Seasonal" },
  { name: "Shingles (Herpes Zoster)", body: "Two-dose protection for adults 50+", category: "routine", badge: "Recommended" },
];

const FILTERS = [
  { id: "all" as const, label: "All", icon: Grid },
  { id: "travel" as const, label: "Travel", icon: Plane },
  { id: "routine" as const, label: "Routine & Adult", icon: Refresh },
];

function badgeTone(badge?: string): BadgeTone {
  if (!badge) return "navy";
  return /required|recommended/i.test(badge) ? "gold" : "navy";
}

export default function Vaccines() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Category>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VACCINES.filter((v) => {
      const matchCat = filter === "all" || v.category === filter;
      const matchQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.body.toLowerCase().includes(q) ||
        (v.badge ?? "").toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, filter]);

  return (
    <section id="vaccines" className="relative overflow-hidden bg-paper-deep/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 dotted-divider opacity-50" />
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Vaccines available
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]" data-reveal-delay="80">
            Protection for every itinerary
          </h2>
          <p className="reveal mt-4 text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            6 travel vaccines · 11 routine &amp; adult vaccines — administered
            in-clinic after a quick medical screen.
          </p>
        </div>

        {/* Controls */}
        <div className="reveal mx-auto mt-9 max-w-2xl" data-reveal-delay="200">
          <label className="flex items-center gap-3 rounded-full border border-navy-900/12 bg-white px-5 py-3.5 shadow-soft transition-colors focus-within:border-gold-500/70">
            <Search className="h-4.5 w-4.5 shrink-0 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vaccines — try rabies or HPV"
              className="w-full bg-transparent text-sm text-navy-900 outline-none placeholder:text-muted/80"
              aria-label="Search vaccines"
            />
          </label>

          <div className="mt-3 grid grid-cols-3 gap-1 rounded-full border border-navy-900/10 bg-white p-1 shadow-soft">
            {FILTERS.map((f) => {
              const Icon = f.icon;
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[0.68rem] font-semibold transition-all duration-300 sm:gap-2 sm:px-3 sm:text-[0.78rem] ${
                    active
                      ? "bg-navy-900 text-white shadow-soft"
                      : "text-ink-soft hover:bg-paper hover:text-navy-900"
                  }`}
                  aria-pressed={active}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-gold-300" : ""}`} />
                  <span className="whitespace-nowrap">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v, i) => {
            const isTravel = v.category === "travel";
            const tone = badgeTone(v.badge);
            return (
              <article
                key={`${v.name}-${v.category}-${i}-${filter}-${query}`}
                style={{ animationDelay: `${(i % 6) * 55}ms` }}
                className="card-in group flex items-start gap-4 rounded-2xl border border-navy-900/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-card"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                    isTravel
                      ? "bg-navy-900 text-gold-300"
                      : "bg-gold-500 text-navy-950"
                  }`}
                  title={isTravel ? "Travel vaccine" : "Routine & adult vaccine"}
                >
                  <Shield className="h-5.5 w-5.5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.92rem] font-bold leading-snug text-navy-900">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
                    {v.body}
                  </p>
                  {v.badge && (
                    <span
                      className={`mt-2.5 inline-block rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] ${
                        tone === "gold"
                          ? "border border-gold-500/45 bg-gold-50 text-gold-600"
                          : "bg-navy-900/90 text-white/90"
                      }`}
                    >
                      {v.badge}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-navy-900/20 bg-white/60 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-deep text-muted">
              <SearchX className="h-6 w-6" />
            </span>
            <p className="font-display font-bold text-navy-900">No vaccines match “{query}”</p>
            <p className="text-sm text-muted">Try another search or browse all vaccines.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-1 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[0.78rem] text-muted">
          Showing{" "}
          <span className="font-bold text-navy-900">{filtered.length}</span> of{" "}
          {VACCINES.length} vaccines · Final recommendation after your consult
        </p>
      </div>
    </section>
  );
}
