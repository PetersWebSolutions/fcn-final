import { Temple, Whatsapp, Pin, ChatBadge, CardBadge } from "./Icons";

const STEPS = [
  {
    n: 1,
    icon: Pin,
    title: "Visit FCN first",
    body: "We screen you and confirm Yellow Fever is required for your route.",
  },
  {
    n: 2,
    icon: ChatBadge,
    title: "We help you book BOQ",
    body: "We guide you through the online BOQ appointment — no guesswork.",
  },
  {
    n: 3,
    icon: CardBadge,
    title: "Fly certified",
    body: "Get your WHO-recognized Yellow Card and travel with confidence.",
  },
];

export default function YellowFever() {
  return (
    <section id="yellow-fever" className="relative bg-navy-950 pb-0 pt-20 text-white lg:pt-24">
      <div className="bg-blueprint absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Left copy */}
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-gold-300">
            <Temple className="h-3.5 w-3.5" />
            Bureau of Quarantine · WHO
          </div>

          <h2 className="reveal mt-5 font-display text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.75rem]" data-reveal-delay="80">
            Need a{" "}
            <span className="text-gold-400">Yellow Fever certificate</span>?
          </h2>

          <p className="reveal mt-5 max-w-lg text-[0.92rem] leading-relaxed text-white/65" data-reveal-delay="160">
            The Yellow Fever vaccine is administered by the Bureau of
            Quarantine (BOQ) under the WHO. We assist our seafarers and
            travelers in scheduling their appointment online — so nothing
            delays your deployment or departure.
          </p>

          <a
            href="#book"
            className="reveal group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            data-reveal-delay="220"
          >
            <Whatsapp className="h-4.5 w-4.5" />
            Get BOQ assistance
          </a>
        </div>

        {/* Right steps */}
        <ol className="space-y-3.5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="reveal group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition-all duration-300 hover:border-gold-400/35 hover:bg-white/[0.08]"
                data-reveal-delay={`${i * 120}`}
              >
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 font-display text-sm font-extrabold text-navy-950">
                  {s.n}
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 ring-2 ring-navy-950">
                    <Icon className="h-3 w-3 text-gold-300" />
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-[0.98rem] font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[0.83rem] leading-relaxed text-white/60">
                    {s.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Travel image divider — floats over the marquee band */}
      <div className="relative z-10 mx-auto mt-14 max-w-7xl px-5 md:px-6 lg:px-10">
        <div
          className="reveal mx-auto -mb-16 max-w-xl overflow-hidden rounded-[1.75rem] shadow-pop ring-1 ring-white/10 lg:-mb-20"
          data-reveal-delay="120"
        >
          <img
            src="/images/travel-window.jpg"
            alt="Golden hour view through an airplane window"
            className="h-40 w-full object-cover sm:h-48"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
