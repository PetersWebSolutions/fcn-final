import { useState } from "react";
import { Plus, Close } from "./Icons";

const FAQS = [
  {
    q: "How far ahead should I visit before my trip?",
    a: "Ideally 4–6 weeks before departure so multi-dose series (like rabies or Japanese encephalitis) can be completed. Flying soon? Come anyway — many vaccines still protect on short notice, and we'll prioritize what matters most for your route.",
  },
  {
    q: "Do you give the Yellow Fever vaccine in-clinic?",
    a: "The Yellow Fever vaccine is administered by the Bureau of Quarantine (BOQ) under WHO guidelines. We screen you to confirm it's required for your route, help you book the BOQ appointment online, and make sure your Yellow Card paperwork is complete.",
  },
  {
    q: "What should I bring to my appointment?",
    a: "Bring your passport or valid ID, any previous vaccination records, your travel itinerary (digital is fine), a list of current medications, and any employer, school or visa medical forms that need completing.",
  },
  {
    q: "How long does a visit take? Do I need a booking?",
    a: "A consult plus vaccination typically takes around 30 minutes. Walk-ins are welcome and seen between scheduled appointments, but booking ahead reserves your slot and minimizes waiting.",
  },
  {
    q: "Can I get medical and travel certificates?",
    a: "Yes. Fit-to-travel letters, vaccination certificates and seafarer-ready medical documentation are generally prepared during the same visit — just tell us the format your employer or embassy requires.",
  },
  {
    q: "How does Tuberculin / PPD testing work?",
    a: "We place a small injection under the skin on day one, then read the result 48–72 hours later. Both visits are quick, and we provide stamped documentation for work, school or travel files.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-6">
        <div className="text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Good to know
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl" data-reveal-delay="80">
            Questions, answered
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`reveal rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-gold-500/45 bg-gold-50/70 shadow-soft"
                    : "border-navy-900/10 bg-white hover:border-navy-900/25"
                }`}
                data-reveal-delay={`${i * 60}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4.5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-navy-900 text-gold-300"
                        : "bg-paper-deep text-navy-900"
                    }`}
                  >
                    {isOpen ? (
                      <Close className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                  <span className="flex-1 font-display text-[0.92rem] font-bold text-navy-900 sm:text-[0.98rem]">
                    {item.q}
                  </span>
                </button>
                <div className={`acc-panel ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="px-5 pb-5 pl-[4.25rem] pr-8 text-[0.85rem] leading-relaxed text-ink-soft sm:px-6 sm:pl-[4.6rem]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
