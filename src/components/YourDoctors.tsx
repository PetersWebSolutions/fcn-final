import { useState } from "react";
import {
  Stethoscope,
  ShieldCheck,
  Check,
  Globe,
  Heart,
  ChevronDown,
  Pin,
} from "./Icons";

type Doctor = {
  id: string;
  initials: string;
  name: string;
  title: string;
  role: string;
  roleDetail: string;
  badges: { label: string; tone: "navy" | "gold" | "paper" }[];
  preview: string[]; // what shows before expand
  education: string[];
  training: string[];
  memberships: string[];
  personal: string[];
  licenses: string[]; // PRC, ISTM etc
  image?: string; // future real photo
};

const DOCTORS: Doctor[] = [
  {
    id: "frederick",
    initials: "FN",
    name: "Dr. Frederick C. Nastor",
    title: "MD",
    role: "Pathologist",
    roleDetail: "Travel Medicine Consultant",
    licenses: ["PRC License 90632", "ISTM ID No. 12412"],
    image: "/images/reviewers/fred.jpg",
    badges: [
      { label: "PRC 90632", tone: "navy" },
      { label: "ISTM 12412", tone: "gold" },
      { label: "ISTM Member", tone: "paper" },
    ],
    preview: [
      "Pathologist • Travel Medicine Consultant",
      "Member, International Society of Travel Medicine",
      "Residency Training in Pathology — Philippine Orthopedic Center",
    ],
    education: [
      "Bachelor of Science in Medical Technology — Far Eastern University, 1987",
      "Doctor of Medicine — Fatima College of Medicine, 1997",
    ],
    training: [
      "Medical Internship — Delos Santos Medical Center",
      "Residency Training in Pathology — Philippine Orthopedic Center, 2005",
    ],
    memberships: [
      "Member, Philippine Medical Association",
      "Member, Filipino-Chinese Medical Society",
      "Member of International Society of Travel Medicine since 2013",
    ],
    personal: ["Married to Dr. Hazel Nastor", "Proud father of 3 children"],
  },
  {
    id: "hazel",
    initials: "HN",
    name: "Dr. Hazel Nastor",
    title: "MD",
    role: "Family Medicine Practitioner",
    roleDetail: "Co-owner, FCN Medical & Vaccination Center",
    licenses: [],
    image: "/images/reviewers/hazel.jpg",
    badges: [
      { label: "Family Medicine", tone: "gold" },
      { label: "ISTM Member", tone: "paper" },
      { label: "PMS since 2000", tone: "navy" },
    ],
    preview: [
      "Family Medicine Practitioner",
      "Co-owner of FCN Medical and Vaccination Center",
      "Member, Philippine Medical Society since 2000",
    ],
    education: [
      "B.S. Zoology — pre-med",
      "Doctor of Medicine",
    ],
    training: ["Medical Internship — East Avenue Medical Center"],
    memberships: [
      "Member, Philippine Medical Society since 2000",
      "Member, Society of Occupational Medicine",
      "Member, Filipino-Chinese Medical Society",
      "Member, International Society of Travel Medicine",
    ],
    personal: [
      "Family Medicine Practitioner",
      "Co-owner of FCN Medical and Vaccination Center",
      "Married to Dr. Frederick Nastor",
    ],
  },
];

function DoctorCard({ doctor, index, isExpanded, onToggle }: {
  doctor: Doctor;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="reveal group relative flex flex-col overflow-hidden rounded-[2rem] border border-navy-900/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
      data-reveal-delay={`${index * 120}`}
    >
      {/* Top gold/navy accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-navy-900 via-navy-800 to-gold-500" />

      {/* Photo area — fixed size, no zoom/responsive adjust */}
      <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-paper-deep">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            width={320}
            height={360}
            className="h-[360px] w-[300px] shrink-0 rounded-[1.5rem] object-cover object-top shadow-card ring-1 ring-navy-900/10"
            loading="eager"
          />
        ) : (
          <div className="flex h-[360px] w-[300px] shrink-0 flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-paper-deep via-white to-gold-50 p-6 shadow-card ring-1 ring-navy-900/10">
            <div className="relative">
              <div className={`flex h-28 w-28 items-center justify-center rounded-[1.5rem] font-display text-3xl font-extrabold shadow-card ring-1 ring-navy-900/10 ${
                index === 0 ? "bg-navy-900 text-gold-300" : "bg-gold-500 text-navy-950"
              }`}>
                {doctor.initials}
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-navy-900/10">
                <Stethoscope className="h-5 w-5 text-navy-900" />
              </span>
            </div>
            <p className="mt-5 text-center">
              <span className="block font-display text-[0.95rem] font-bold text-navy-900">{doctor.name}</span>
              <span className="mt-1 block text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
                Photo coming soon
              </span>
            </p>
            <p className="mt-3 max-w-[18rem] text-center text-[0.7rem] leading-relaxed text-muted">
              Professional portrait will be supplied later — placeholder initials shown.
            </p>
          </div>
        )}

        {/* Floating role badge */}
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-navy-900/90 px-3.5 py-1.5 text-[0.68rem] font-bold text-white shadow-soft backdrop-blur">
          {doctor.role} {doctor.roleDetail ? `· ${doctor.roleDetail}` : ""}
        </div>

        {/* License pill for Frederick */}
        {doctor.licenses.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {doctor.licenses.map((l) => (
              <span key={l} className="rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-semibold text-navy-900 shadow-soft backdrop-blur">
                {l}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content — profile info blue */}
      <div className="relative flex flex-1 flex-col bg-[#EAF2FF] p-7 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#EFF6FF]/80 via-[#EAF2FF] to-[#E0EBFF]/90" />
        <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.35rem] font-extrabold leading-tight text-navy-900 sm:text-[1.45rem]">
              {doctor.name}
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.8rem] font-semibold text-gold-600">
              <span>{doctor.role}</span>
              {doctor.roleDetail && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gold-500/60" />
                  <span className="font-medium text-ink-soft">{doctor.roleDetail}</span>
                </>
              )}
            </p>
          </div>
          <span className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full sm:flex ${
            index === 0 ? "bg-navy-900 text-gold-300" : "bg-gold-500 text-navy-950"
          }`}>
            <Award className="h-5 w-5" />
          </span>
        </div>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {doctor.badges.map((b) => (
            <span
              key={b.label}
              className={`rounded-full px-3 py-1 text-[0.66rem] font-bold tracking-wide ${
                b.tone === "navy"
                  ? "bg-navy-900 text-white"
                  : b.tone === "gold"
                  ? "bg-gold-500 text-navy-950"
                  : "border border-navy-900/10 bg-paper-deep text-navy-900"
              }`}
            >
              {b.label}
            </span>
          ))}
        </div>

        {/* Preview — elegant, not resume */}
        <div className="mt-6 space-y-3">
          {doctor.preview.map((line, i) => (
            <div key={line} className="flex gap-2.5">
              <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                i === 0 ? "bg-gold-500 text-navy-950" : "bg-navy-900/8 text-navy-700"
              }`}>
                <Check className="h-3 w-3" />
              </span>
              <p className="text-[0.85rem] leading-relaxed text-ink-soft">{line}</p>
            </div>
          ))}
        </div>

        {/* Expandable full profile */}
        <div className={`acc-panel mt-2 ${isExpanded ? "open" : ""}`}>
          <div>
            <div className="pt-6">
              {/* Divider */}
              <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-navy-900/10 to-transparent" />

              <div className="grid gap-6">
                {/* Education */}
                {doctor.education.length > 0 && (
                  <div className="rounded-2xl bg-paper/60 p-4">
                    <p className="eyebrow flex items-center gap-2 text-[0.62rem] text-navy-900/60">
                      <GraduationCap className="h-4 w-4 text-gold-500" />
                      Education
                    </p>
                    <ul className="mt-3 space-y-2">
                      {doctor.education.map((e) => (
                        <li key={e} className="flex gap-2 text-[0.82rem] leading-snug text-navy-900">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Training */}
                {doctor.training.length > 0 && (
                  <div className="rounded-2xl border border-navy-900/8 bg-white p-4">
                    <p className="eyebrow flex items-center gap-2 text-[0.62rem] text-navy-900/60">
                      <Stethoscope className="h-4 w-4 text-navy-700" />
                      Training
                    </p>
                    <ul className="mt-3 space-y-2">
                      {doctor.training.map((t) => (
                        <li key={t} className="flex gap-2 text-[0.82rem] leading-snug text-ink-soft">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Memberships */}
                {doctor.memberships.length > 0 && (
                  <div className="rounded-2xl bg-navy-900/[0.03] p-4">
                    <p className="eyebrow flex items-center gap-2 text-[0.62rem] text-navy-900/60">
                      <Globe className="h-4 w-4 text-gold-500" />
                      Professional Memberships
                    </p>
                    <ul className="mt-3 space-y-2">
                      {doctor.memberships.map((m) => (
                        <li key={m} className="flex gap-2 text-[0.82rem] leading-snug text-ink-soft">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-700/50" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Personal / Additional */}
                {doctor.personal.length > 0 && (
                  <div className="flex items-start gap-3 rounded-2xl bg-gold-50/70 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gold-600 shadow-soft">
                      <Heart className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="eyebrow text-[0.62rem] text-gold-700/70">Beyond the clinic</p>
                      <ul className="mt-2 space-y-1">
                        {doctor.personal.map((p) => (
                          <li key={p} className="text-[0.82rem] leading-relaxed text-navy-800">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Credentials note */}
              <p className="mt-6 text-center text-[0.7rem] text-muted">
                Full credentials as provided — no additional credentials added.
              </p>
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            className={`group flex w-full items-center justify-between rounded-full border px-5 py-3 text-[0.84rem] font-semibold transition-all duration-300 ${
              isExpanded
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/30 hover:bg-paper"
            }`}
          >
            <span className="flex items-center gap-2">
              {isExpanded ? "Show less" : "Show full profile"}
              <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                isExpanded ? "bg-white/15 text-gold-300" : "bg-navy-900 text-gold-300"
              }`}>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
              </span>
            </span>
            <span className="text-[0.7rem] font-medium opacity-60">
              {isExpanded ? "Hide credentials" : `${doctor.education.length + doctor.memberships.length + doctor.training.length} credentials`}
            </span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

// Add missing icons to Icons.tsx if needed — inline fallbacks
function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 12.5 9 18l-1.5-1.5 1-1 1.5 1 5-6 1 1Z" />
    </svg>
  );
}
function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5 12 21l9-4.5" />
    </svg>
  );
}

export default function YourDoctors() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="doctors" className="relative bg-paper py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 dotted-divider opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-gold-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-navy-700/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-gold-600">
            <span className="h-px w-7 bg-gold-500/50" />
            Meet our doctors
            <span className="h-px w-7 bg-gold-500/50" />
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-[2.8rem]" data-reveal-delay="80">
            Expert care, <span className="font-playfair text-[1.25em] font-bold italic leading-[0.9] text-gold-500">family-owned practice</span>
          </h2>
          <p className="reveal mt-4 text-[0.92rem] leading-relaxed text-ink-soft" data-reveal-delay="160">
            FCN Medical & Vaccination Center is led by Dr. Frederick and Dr. Hazel Nastor — a husband-and-wife
            team combining pathology, family medicine, and travel medicine expertise in Room 601.
          </p>
        </div>

        {/* Trust bar */}
        <div className="reveal mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-navy-900/8 bg-white/80 px-4 py-3 text-[0.72rem] font-medium text-muted shadow-soft backdrop-blur" data-reveal-delay="200">
          <span className="inline-flex items-center gap-1.5 font-semibold text-navy-900">
            <ShieldCheck className="h-4 w-4 text-gold-500" />
            ISTM Members
          </span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span>PRC Licensed</span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span>Family-Owned</span>
          <span className="h-3 w-px bg-navy-900/10" />
          <span className="inline-flex items-center gap-1.5">
            <Pin className="h-3.5 w-3.5 text-gold-500" />
            Room 601
          </span>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-7 lg:grid-cols-2 lg:gap-8">
          {DOCTORS.map((doc, i) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              index={i}
              isExpanded={expanded === doc.id}
              onToggle={() => setExpanded(expanded === doc.id ? null : doc.id)}
            />
          ))}
        </div>

        <p className="reveal mx-auto mt-10 max-w-2xl text-center text-[0.72rem] leading-relaxed text-muted" data-reveal-delay="300">
          Real photos of Dr. Frederick and Dr. Hazel Nastor — family-owned practice in Room 601.
        </p>
      </div>
    </section>
  );
}
