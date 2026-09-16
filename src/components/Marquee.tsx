import { Sparkle } from "./Icons";

const WORDS = [
  "Yellow Fever",
  "Travel Vaccines",
  "Fit-to-Travel",
  "Certificates",
  "Seafarer Ready",
  "PPD Testing",
  "Travel Consults",
  "Same-Visit Documents",
];

function Track() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-sm font-extrabold uppercase tracking-[0.28em] text-gold-600/45 sm:text-base">
            {w}
          </span>
          <Sparkle className="h-4 w-4 shrink-0 text-gold-500/50" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-navy-900/8 bg-paper-deep pb-6 pt-24 lg:pt-28"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max">
        <Track />
        <Track />
      </div>
    </div>
  );
}
