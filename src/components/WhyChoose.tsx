import { useState } from "react";
import {
  Clock,
  Globe,
  ShieldCheck,
  Pin,
  Stethoscope,
  Heart,
  Check,
  Compass,
} from "./Icons";
import { Plus, Close } from "./Icons";

function QrCode(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="3" height="3" rx="0.6" />
      <rect x="18" y="14" width="3" height="3" rx="0.6" />
      <rect x="14" y="18" width="3" height="3" rx="0.6" />
      <path d="M7 7h.01M17 7h.01M7 17h.01" strokeWidth={2.4} />
    </svg>
  );
}
function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h2M12 7h2M16 7h.01M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01" />
      <path d="M9 21v-3h6v3" />
    </svg>
  );
}
function AwardShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 5 5.5v5.6c0 4.5 3 8 7 9.9 4-1.9 7-5.4 7-9.9V5.5L12 3Z" />
      <circle cx="12" cy="11.5" r="2.8" />
      <path d="M9.5 15.5 12 18l2.5-2.5" />
    </svg>
  );
}

type WhyItem = {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const WHY_ITEMS: WhyItem[] = [
  {
    id: "est2013",
    title: "Established since 2013",
    desc: "Over a decade of trusted travel-health service in Manila.",
    longDesc: "FCN Medical and Vaccination Center has been serving travelers, seafarers, and families since 2013 — over a decade of physician-led, unhurried care in Ermita, Manila. Trusted by 40+ companies and thousands of patients.",
    icon: Clock,
  },
  {
    id: "istm",
    title: "ISTM (International Society of Travel Medicine) member",
    desc: "Global standards in travel medicine.",
    longDesc: "Members of the International Society of Travel Medicine (ISTM) — we follow global protocols for vaccines, malaria prophylaxis, and destination risk assessment. Your itinerary is reviewed against WHO and CDC guidance.",
    icon: Globe,
  },
  {
    id: "emr",
    title: "Electronic medical records with QR-coded vaccination records",
    desc: "Secure, scannable QR records — no more lost cards.",
    longDesc: "All consultations and vaccinations are stored in secure electronic medical records with QR-coded vaccination certificates. Scannable, verifiable, and always accessible — no more lost yellow cards.",
    icon: QrCode,
  },
  {
    id: "privacy",
    title: "Data Privacy Act compliant",
    desc: "Your health data is protected and handled with care.",
    longDesc: "We are fully compliant with the Philippines Data Privacy Act. Your medical history, vaccination records, and personal information are handled with strict confidentiality and secure storage.",
    icon: ShieldCheck,
  },
  {
    id: "companies",
    title: "Serving 40+ shipping and corporate companies",
    desc: "Trusted by seafarers, OFWs, and corporate clients nationwide.",
    longDesc: "Trusted by over 40 shipping, manning, and corporate companies for seafarer medicals, OFW clearances, and corporate vaccination programs. We understand deployment timelines and urgent travel needs.",
    icon: Building,
  },
  {
    id: "experience",
    title: "Experiences in travel medicine and adult immunization",
    desc: "From pre-travel consults to adult boosters — physician-led.",
    longDesc: "Led by Dr. Frederick and Dr. Hazel Nastor — combining pathology, family medicine, and travel medicine expertise. From pre-travel risk consults to adult immunization, post-travel checkups, and certificates.",
    icon: AwardShield,
  },
  {
    id: "ermita",
    title: "Convenient Ermita Manila location",
    desc: "Room 601 — easy access, elevator, walk-in ready.",
    longDesc: "Located at Room 601, 6/F San Luis Terraces, 638 T.M. Kalaw Ave, Ermita Manila 1000 — near BOQ, with elevator access, walk-in ready, and clear wayfinding. Mon–Fri 8–5, Sat 8–4.",
    icon: Pin,
  },
  {
    id: "personalized",
    title: "Personalized service by Physician-led healthcare professionals",
    desc: "Unhurried consults — your itinerary, your health, our priority.",
    longDesc: "Every visit is physician-led, unhurried, and tailored to your itinerary. We take time to explain vaccines, side effects, and packing lists — your health, your journey, our priority.",
    icon: Stethoscope,
  },
];

export default function WhyChoose() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="why-choose" className="relative bg-paper py-12 lg:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 dotted-divider opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-gold-100/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-navy-700/6 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Why choose us
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-3 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.55rem]" data-reveal-delay="80">
            Why choose <span className="font-playfair text-[1.25em] font-bold italic leading-[0.9] text-gold-500">FCN Medical and Vaccination Center?</span>
          </h2>
          <p className="reveal mt-3 text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            Tap a headline to see details — navy when closed, cream when opened, just like Questions, Answered.
          </p>
        </div>

        {/* Accordion like FAQ — navy closed, cream open */}
        <div className="mt-8 space-y-3">
          {WHY_ITEMS.map((item, i) => {
            const isOpen = open === i;
            const Icon = item.icon;
            return (
              <div key={item.id} className="reveal" data-reveal-delay={`${i * 50}`}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-gold-500/40 bg-[#fdf8ec] shadow-soft" // cream when opened
                      : "border-navy-900 bg-navy-900 hover:bg-navy-800 shadow-soft" // navy when closed
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-4.5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isOpen
                          ? "bg-navy-900 text-gold-300"
                          : "bg-white/10 text-gold-300 ring-1 ring-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`flex-1 font-display text-[0.95rem] font-bold leading-snug sm:text-[1.02rem] ${isOpen ? "text-navy-900" : "text-white"}`}>
                      {item.title}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-navy-900 text-gold-300"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {isOpen ? <Close className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <div className={`acc-panel ${isOpen ? "open" : ""}`}>
                    <div>
                      <div className="px-5 pb-5 pl-[4.25rem] pr-8 sm:px-6 sm:pl-[4.6rem]">
                        <p className="text-[0.86rem] font-semibold leading-relaxed text-navy-900/70">{item.desc}</p>
                        <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-soft">{item.longDesc}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="h-px w-6 bg-gold-500/40" />
                          <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold text-gold-600">
                            <Check className="h-3.5 w-3.5" /> Verified • Physician-led
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-navy-900/8 bg-white/80 px-4 py-2.5 text-[0.7rem] font-medium text-muted shadow-soft backdrop-blur" data-reveal-delay="200">
          <span className="inline-flex items-center gap-1.5 font-semibold text-navy-900">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
            Data Privacy
          </span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span className="inline-flex items-center gap-1.5">
            <Compass className="h-3 w-3 text-gold-500" />
            Ermita Manila
          </span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span>ISTM Member</span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span>QR Records</span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span className="inline-flex items-center gap-1.5 font-semibold text-navy-900">
            <Heart className="h-3 w-3 text-gold-500" />
            Physician-led
          </span>
        </div>
      </div>
    </section>
  );
}
