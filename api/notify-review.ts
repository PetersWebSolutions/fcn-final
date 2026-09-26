import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, stars, review_text } = req.body || {};

  if (!name || !stars || !review_text) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const notifyEmail =
    process.env.CLINIC_EMAIL ||
    process.env.REVIEW_NOTIFY_EMAIL ||
    "fcnmedical.vaccination@gmail.com";
  const resendKey = process.env.RESEND_API_KEY;

  // Try Resend if key exists
  if (resendKey) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FCN Reviews <bookings@fcnvaccination.com>",
          to: [notifyEmail],
          subject: `New Review Pending Approval — ${name} (${stars}★)`,
          html: `
            <h2>New Review for FCN Medical</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Stars:</strong> ${stars} / 5</p>
            <p><strong>Review:</strong></p>
            <blockquote style="border-left:3px solid #c69a35;padding-left:12px;margin:12px 0;">${review_text}</blockquote>
            <p>Go to Supabase Dashboard → Table Editor → reviews → set status to <strong>approved</strong> to show on website.</p>
            <p>Auto-adds to carousel after approval.</p>
          `,
        }),
      });
      const data = await emailRes.json();
      return res.status(200).json({ ok: true, email: data });
    } catch (e: any) {
      console.error("Resend error", e);
      return res.status(500).json({ error: "Email failed", details: e.message });
    }
  }

  // Fallback: log and return ok (so frontend doesn't fail) — you can check Vercel logs
  console.log(`[REVIEW PENDING] To: ${notifyEmail} | ${name} (${stars}★): ${review_text}`);
  return res.status(200).json({ ok: true, logged: true, to: notifyEmail });
}
