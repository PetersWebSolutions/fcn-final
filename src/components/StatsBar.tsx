import CountUp from "./CountUp";

const STATS = [
  { to: 5, suffix: "", label: "Core travel-health services" },
  { to: 17, suffix: "+", label: "Vaccines available in-clinic" },
  { to: 6, suffix: " days", label: "Open every week, Mon–Sat" },
  { to: 601, suffix: "", label: "Find us in Room 601" },
];

export default function StatsBar() {
  return (
    <section className="relative bg-navy-900 text-white">
      <div className="bg-blueprint absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-9 px-6 py-11 md:grid-cols-4 lg:px-10 lg:py-12">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="reveal text-center md:text-left"
            data-reveal-delay={`${i * 90}`}
          >
            <CountUp
              to={s.to}
              suffix={s.suffix}
              duration={1300}
              className="block font-display text-4xl font-extrabold tracking-tight text-gold-400 lg:text-[2.6rem]"
            />
            <p className="mt-1.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/55">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="dotted-divider-light relative opacity-70" />
    </section>
  );
}
