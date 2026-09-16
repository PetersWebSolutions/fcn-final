import { useState, type FormEvent } from "react";
import {
  User,
  Phone,
  Mail,
  Note,
  Send,
  Calendar,
  Clock,
  ClipboardPlane,
  Check,
} from "./Icons";

const SERVICES = [
  "Pre-Travel Health Consultation",
  "Travel & Routine Vaccination",
  "Yellow Fever / BOQ assistance",
  "Medical or Travel Certificate",
  "Tuberculin / Mantoux / PPD Testing",
  "Post-Travel Consultation",
  "Not sure yet — help me choose",
];

const TIMES = [
  "Morning (8:00 AM – 12:00 PM)",
  "Midday (12:00 PM – 2:00 PM)",
  "Afternoon (2:00 PM – 5:00 PM)",
  "Saturday morning",
];

const inputBase =
  "w-full rounded-xl border border-navy-900/12 bg-paper/60 px-4 py-3 pl-11 text-sm text-navy-900 outline-none transition-all placeholder:text-muted/70 focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/12";

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-700/45">
      {children}
    </span>
  );
}

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="relative overflow-hidden bg-paper-deep/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-gold-100/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-10">
        {/* Left */}
        <div>
          <p className="reveal eyebrow flex items-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Book a visit
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]" data-reveal-delay="80">
            Reserve your slot in under a minute
          </h2>
          <p className="reveal mt-4 max-w-md text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            Tell us what you need and when — our team confirms your appointment
            and prepares your vaccines and paperwork before you arrive at Room
            601.
          </p>

          <div className="reveal mt-8 overflow-hidden rounded-3xl shadow-card ring-1 ring-navy-900/10" data-reveal-delay="220">
            <img
              src="/images/vaccine-prep.jpg"
              alt="Gloved clinician preparing a vaccine syringe on a sterile tray"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="reveal mt-4 grid grid-cols-2 gap-3" data-reveal-delay="280">
            <div className="flex items-start gap-3 rounded-2xl border border-navy-900/10 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-300">
                <Clock className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-navy-900">
                  ~30 min
                </span>
                <span className="block text-[0.72rem] leading-snug text-muted">
                  average consult + vaccination visit
                </span>
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-navy-900/10 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950">
                <Calendar className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-navy-900">
                  Same-week
                </span>
                <span className="block text-[0.72rem] leading-snug text-muted">
                  slots usually available Mon–Sat
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="reveal rounded-3xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-8" data-reveal-delay="160">
          {submitted ? (
            <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                <Check className="h-10 w-10" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold text-navy-900">
                Request received
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                Thank you, {form.name.split(" ")[0] || "traveler"}. Our team
                will call <span className="font-semibold text-navy-900">{form.phone || "your number"}</span> shortly to
                confirm your appointment in Room 601.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-7 rounded-full border border-navy-900/15 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900/40"
              >
                Send another request
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
                  <ClipboardPlane className="h-5.5 w-5.5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy-900">
                    Appointment request
                  </h3>
                  <p className="text-[0.78rem] text-muted">
                    We confirm every request by phone
                  </p>
                </div>
              </div>

              <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                <div className="relative">
                  <FieldIcon>
                    <User className="h-4.5 w-4.5" />
                  </FieldIcon>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Full name *"
                    className={inputBase}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <FieldIcon>
                      <Phone className="h-4.5 w-4.5" />
                    </FieldIcon>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="Phone *"
                      className={inputBase}
                    />
                  </div>
                  <div className="relative">
                    <FieldIcon>
                      <Mail className="h-4.5 w-4.5" />
                    </FieldIcon>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="Email (optional)"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="relative">
                  <FieldIcon>
                    <ClipboardPlane className="h-4.5 w-4.5" />
                  </FieldIcon>
                  <select
                    required
                    value={form.service}
                    onChange={update("service")}
                    className={`${inputBase} ${form.service ? "" : "text-muted/80"}`}
                  >
                    <option value="" disabled>
                      Choose a service *
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="text-navy-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <FieldIcon>
                      <Calendar className="h-4.5 w-4.5" />
                    </FieldIcon>
                    <input
                      type="date"
                      value={form.date}
                      onChange={update("date")}
                      className={inputBase}
                      aria-label="Preferred date"
                    />
                  </div>
                  <div className="relative">
                    <FieldIcon>
                      <Clock className="h-4.5 w-4.5" />
                    </FieldIcon>
                    <select
                      value={form.time}
                      onChange={update("time")}
                      className={`${inputBase} ${form.time ? "" : "text-muted/80"}`}
                      aria-label="Preferred time"
                    >
                      <option value="" disabled>
                        Preferred time
                      </option>
                      {TIMES.map((t) => (
                        <option key={t} value={t} className="text-navy-900">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-3.5 text-navy-700/45">
                    <Note className="h-4.5 w-4.5" />
                  </span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={update("notes")}
                    placeholder="Notes — destination, departure date, symptoms… (optional)"
                    className={`${inputBase} resize-none pl-11 pt-3`}
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-navy-900 py-4 text-sm font-bold text-white shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800"
                >
                  <Send className="h-4.5 w-4.5 text-gold-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Request appointment
                </button>
                <p className="text-center text-[0.72rem] text-muted">
                  No payment needed today · Free confirmation by phone
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
