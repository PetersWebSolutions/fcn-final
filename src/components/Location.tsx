import { Clock, Calendar, Pin, ArrowRight, Sparkle } from "./Icons";

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 5:00 PM", closed: false },
  { day: "Saturday", time: "8:00 AM – 4:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
];

export default function Location() {
  return (
    <section id="visit" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Time and location
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]" data-reveal-delay="80">
            Finding us is the <span className="font-playfair text-[1.25em] font-bold italic leading-[0.9] text-gold-500">easiest part</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* Hours card */}
          <div className="reveal flex flex-col rounded-3xl border border-navy-900/10 bg-white p-7 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-300">
                <Clock className="h-5.5 w-5.5" />
              </span>
              <h3 className="font-display text-lg font-bold text-navy-900">
                Clinic hours
              </h3>
            </div>

            <ul className="mt-6 space-y-0">
              {HOURS.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center gap-3 py-3.5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-dashed [&:not(:last-child)]:border-navy-900/15"
                >
                  <Calendar className="h-4 w-4 shrink-0 text-gold-500" />
                  <span className="text-sm font-semibold text-navy-900">
                    {h.day}
                  </span>
                  <span className="mx-2 flex-1 border-b border-dotted border-navy-900/20" />
                  <span
                    className={`text-sm font-semibold ${
                      h.closed ? "text-muted" : "text-navy-900"
                    }`}
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex gap-2.5 rounded-2xl bg-paper px-4 py-3.5 text-[0.78rem] leading-relaxed text-ink-soft">
              <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              Tip: mornings are quietest. Booking ahead reserves your slot —
              walk-ins are seen between appointments.
            </p>
          </div>

          {/* Room 601 card */}
          <div className="reveal relative overflow-hidden rounded-3xl bg-navy-900 p-7 text-white shadow-pop lg:p-9" data-reveal-delay="120">
            <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-navy-950">
                  <Pin className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  Room 601 — this way
                </h3>
              </div>

              <p className="eyebrow mt-8 text-gold-400">Follow the signs</p>
              <p
                aria-label="Room 601"
                className="mt-1 select-none font-display text-[4.6rem] font-extrabold leading-[0.95] tracking-tight text-gold-400 sm:text-[5.4rem]"
              >
                ROOM
                <br />
                <span className="bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  601
                </span>
              </p>

              <p className="mt-5 max-w-sm text-[0.86rem] leading-relaxed text-white/65">
                Head to the 6th floor and follow the navy wayfinding to Room
                601. Show your booking confirmation at reception — we'll take
                it from there.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-[0.82rem] font-bold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                >
                  Book my visit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5"
                >
                  What to bring?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
