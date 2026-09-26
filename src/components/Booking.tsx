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

const TIME_GROUPS = [
  { label: "Morning", slots: ["8am-9am", "9am-10am", "10am-11am", "11am-12pm"] },
  { label: "Afternoon", slots: ["1pm-2pm", "2pm-3pm", "3pm-4pm"] },
];
// 4pm-5pm is only offered when the selected date is Mon-Fri
const LAST_SLOT = "4pm-5pm";

function isLastSlotDay(date: string) {
  if (!date) return false;
  const d = new Date(date + "T00:00:00");
  return !isNaN(d.getTime()) && d.getDay() >= 1 && d.getDay() <= 5;
}

function timeGroupsForDate(date: string) {
  const groups = TIME_GROUPS.map((g) => ({ label: g.label, slots: [...g.slots] }));
  if (isLastSlotDay(date)) {
    groups[1].slots.push(LAST_SLOT);
  }
  return groups;
}

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
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

  const todayISO = new Date().toISOString().split("T")[0];
  const timeGroups = timeGroupsForDate(form.date);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setForm((f) => ({
      ...f,
      date,
      time: !isLastSlotDay(date) && f.time === LAST_SLOT ? "" : f.time,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/notify-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your request. Please try again, or call us at Tel. 87429179."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="book" className="relative overflow-hidden bg-paper-deep/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-gold-100/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-10">
        {/* Left — now centered */}
        <div className="text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600 text-center">
            <span className="h-px w-7 bg-gold-500/50" />
            Book a visit
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mx-auto mt-4 max-w-xl text-center font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]" data-reveal-delay="80">
            Reserve your slot in <span className="font-playfair text-[1.25em] font-bold italic leading-[0.9] text-gold-500">under a minute</span>
          </h2>
          <p className="reveal mx-auto mt-4 max-w-md text-center text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
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
                      min={todayISO}
                      onChange={onDateChange}
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
                      {timeGroups.map((g) => (
                        <optgroup key={g.label} label={g.label}>
                          {g.slots.map((t) => (
                            <option key={t} value={t} className="text-navy-900">
                              {t}
                            </option>
                          ))}
                        </optgroup>
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
                  disabled={sending}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-navy-900 py-4 text-sm font-bold text-white shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  <Send className="h-4.5 w-4.5 text-gold-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  {sending ? "Sending…" : "Request appointment"}
                </button>
                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-[0.75rem] font-medium text-red-600">
                    {error}
                  </p>
                )}
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
