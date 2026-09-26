import type { VercelRequest, VercelResponse } from "@vercel/node";

const FROM = "FCN Bookings <bookings@fcnvaccination.com>";
const SITE = "https://fcn-final.vercel.app";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// "2026-09-30" -> "Wednesday, Sept. 30, 2026"
function formatDateLong(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:7px 14px 7px 0;color:#64748b;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:7px 0;color:#0f172a;font-weight:600;">${value}</td>
  </tr>`;

type BookingDetails = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  date?: string;
  time?: string;
  notes?: string;
};

function detailRows(d: BookingDetails) {
  return [
    row("Name", esc(d.name)),
    row("Phone", esc(d.phone)),
    d.email ? row("Email", esc(d.email)) : "",
    row("Service", esc(d.service)),
    d.date ? row("Preferred date", esc(d.date)) : "",
    d.time ? row("Preferred time", esc(d.time)) : "",
    d.notes ? row("Notes", esc(d.notes)) : "",
  ]
    .filter(Boolean)
    .join("");
}

// Client email details — name, phone, email, service, preferred date, preferred time
function clientDetailRows(d: BookingDetails) {
  return [
    row("Name", esc(d.name)),
    row("Phone", esc(d.phone)),
    d.email ? row("Email", esc(d.email)) : "",
    row("Service", esc(d.service)),
    d.date ? row("Preferred date", esc(d.date)) : "",
    d.time ? row("Preferred time", esc(d.time)) : "",
  ]
    .filter(Boolean)
    .join("");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, service, date, time, notes } = req.body || {};

  if (!name || !phone || !service) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const clinic = process.env.CLINIC_EMAIL || "fcnmedical.vaccination@gmail.com";
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.log(`[BOOKING - NO RESEND KEY] ${name} | ${phone} | ${service}`);
    return res.status(200).json({ ok: true, logged: true });
  }

  const rows = detailRows({ name, phone, email, service, date, time, notes });

  const clinicHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">
      <div style="background:#0b1b3a;padding:16px 20px;border-radius:10px 10px 0 0;">
        <span style="color:#d8b24d;font-size:15px;font-weight:bold;">FCN Medical &amp; Vaccination Center</span>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:20px;border-radius:0 0 10px 10px;">
        <h2 style="margin:0 0 8px;color:#0b1b3a;font-size:18px;">New appointment request</h2>
        <p style="margin:0 0 16px;color:#475569;font-size:14px;">
          A new booking was just submitted on the website. Please confirm by phone.
        </p>
        <table style="border-collapse:collapse;font-size:14px;width:100%;">${rows}</table>
        <p style="margin:18px 0 0;color:#94a3b8;font-size:12px;">
          Submitted via ${SITE}/#book
        </p>
      </div>
    </div>`;

  const clientRows = clientDetailRows({ name, phone, email, service, date, time, notes });
  const datePhrase = date ? ` on ${esc(formatDateLong(date))}` : "";

  const clientHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">
      <div style="background:#0b1b3a;padding:16px 20px;border-radius:10px 10px 0 0;">
        <span style="color:#d8b24d;font-size:15px;font-weight:bold;">FCN Medical &amp; Vaccination Center</span>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:20px;border-radius:0 0 10px 10px;">
        <h2 style="margin:0 0 14px;color:#0b1b3a;font-size:18px;">We Received Your Appointment Request</h2>
        <p style="margin:0 0 10px;color:#475569;font-size:14px;">
          Dear ${esc(name.split(" ")[0] || "traveler")},
        </p>
        <p style="margin:0 0 16px;color:#475569;font-size:14px;">
          Thank you for booking with FCN. Our team will contact you on
          <strong>${esc(phone)}</strong> to confirm your appointment at Room 601, 6/F San
          Luis Terraces, 638 T.M. Kalaw Ave, Ermita, Manila 1000${datePhrase}.
        </p>
        <table style="border-collapse:collapse;font-size:14px;width:100%;">${clientRows}</table>
        <p style="margin:18px 0 0;color:#94a3b8;font-size:12px;">
          Room 601, 6/F San Luis Terraces, 638 T.M. Kalaw Ave, Ermita, Manila 1000 · Tel. 87429179
        </p>
      </div>
    </div>`;

  const headers = {
    Authorization: `Bearer ${resendKey}`,
    "Content-Type": "application/json",
  };

  const sends: Promise<Response>[] = [
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: FROM,
        to: [clinic],
        subject: `New appointment request — ${name} — ${service}`,
        html: clinicHtml,
      }),
    }),
  ];

  if (email) {
    sends.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "We received your appointment request — FCN Medical & Vaccination Center",
        html: clientHtml,
        }),
      })
    );
  }

  const results = await Promise.allSettled(sends);

  for (const r of results) {
    if (r.status === "fulfilled") {
      const data = await r.value.json().catch(() => ({}));
      console.log("[BOOKING EMAIL]", data.id ? `queued ${data.id}` : JSON.stringify(data));
    } else {
      console.error("[BOOKING EMAIL FAILED]", r.reason);
    }
  }

  const anyFailed = results.some(
    (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok)
  );

  if (anyFailed) {
    return res.status(500).json({ error: "Email failed" });
  }

  return res.status(200).json({ ok: true });
}
