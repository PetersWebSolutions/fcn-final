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

function Card({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <article
      className="reveal group relative flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900/20 hover:shadow-card"
      data-reveal-delay={`${(index % 3) * 100}`}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-300 shadow-soft transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]">
          <Icon className="h-6 w-6" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-900/12 text-navy-900/50 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-gold-300">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <span className="mt-5 inline-flex w-fit items-center rounded-full border border-gold-500/35 bg-gold-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-600">
        {service.tag}
      </span>

      <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-snug text-navy-900">
        {service.title}
      </h3>
      <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">{service.body}</p>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Our services
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.65rem]" data-reveal-delay="80">
            Complete care, before and after{" "}
            <span className="text-gold-500">you fly</span>
          </h2>
          <p className="reveal mt-4 text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            From pre-travel risk consults to post-travel checkups and the
            certificates you need to board — everything in one calm, unhurried
            visit.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Card key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
