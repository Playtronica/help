/**
 * Education-platform form handler — single endpoint for all 3 forms.
 *
 * Routes: POST /api/edu-form
 *
 * Handles:
 *   - lead-magnet form (`form=lesson-download`)  → emails Andrey + redirects to thank-you page
 *                                                  with a signed PDF download link
 *   - pilot application (`form=pilot`)            → emails Andrey + redirects to thank-you
 *   - institutional quote (`form=quote`)          → emails Andrey + redirects to thank-you
 *
 * Email delivery is via Resend (https://resend.com) — free tier covers 3,000 emails/month,
 * well over what Phase 0 needs. The API key is stored as a Cloudflare Pages secret
 * `RESEND_API_KEY`. If the key is absent, the function still accepts submissions and
 * redirects, but only logs to the console — useful for local dev or when the key is
 * not yet set.
 *
 * Note: the three forms in the React layer (page.tsx, pilot/page.tsx, quote/page.tsx)
 * currently POST to /api/edu-lesson-download, /api/edu-pilot-apply, /api/edu-quote.
 * Either change those actions to /api/edu-form and add a hidden <input name="form"> field,
 * OR create thin wrapper functions in functions/api/edu-lesson-download.ts etc. that
 * re-export this handler with a fixed form-type. Phase 1: write the thin wrappers
 * (see Phase 1 notes in docs/EDUCATION-PLATFORM-PLAN.md).
 */

type FormType = "lesson-download" | "pilot" | "quote";

interface Env {
  RESEND_API_KEY?: string;
  NOTIFY_TO?: string;
}

const NOTIFY_DEFAULT = "manirko@playtronica.com";
const NOTIFY_FROM = "Playtronica Education <noreply@playtronica.com>";

const SUBJECT_PREFIX: Record<FormType, string> = {
  "lesson-download": "[edu] Lesson 1 PDF download",
  pilot: "[edu pilot] New application",
  quote: "[edu quote] New request",
};

const THANK_YOU_PATH: Record<FormType, string> = {
  "lesson-download": "/education/thanks-download/",
  pilot: "/education/thanks-pilot/",
  quote: "/education/thanks-quote/",
};

function buildEmailBody(form: FormType, data: Record<string, string>): string {
  const fields = Object.entries(data)
    .filter(([k]) => k !== "form")
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n");
  const intro =
    form === "lesson-download"
      ? "New free-lesson PDF download. Bulk-tag this address as edu-lead in Klaviyo."
      : form === "pilot"
      ? "New PILOT application. Reply within 1 business day."
      : "New institutional QUOTE request. Reply within 1 business day with quote PDF.";
  return `${intro}\n\n${fields}\n\n— Cloudflare Pages Function`;
}

async function sendEmail(
  env: Env,
  form: FormType,
  data: Record<string, string>,
): Promise<{ ok: boolean; status: number; error?: string }> {
  const apiKey = env.RESEND_API_KEY;
  const to = env.NOTIFY_TO || NOTIFY_DEFAULT;

  if (!apiKey) {
    // No key configured — the submission goes nowhere. Log it so it is at least
    // recoverable from CF logs, but report failure: reporting ok here is what let
    // applications disappear behind a thank-you page.
    console.error(
      `[edu-form] No RESEND_API_KEY set. Submission for "${form}" NOT delivered:`,
      JSON.stringify(data),
    );
    return { ok: false, status: 500, error: "RESEND_API_KEY not configured" };
  }

  const subject = SUBJECT_PREFIX[form] + " — " + (data.school || data.institution || data.email || "");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [to],
      subject,
      text: buildEmailBody(form, data),
      reply_to: data.email,
    }),
  });

  if (!resp.ok) {
    const error = await resp.text();
    console.error(`[edu-form] Resend ${resp.status}: ${error.slice(0, 200)}`);
    return { ok: false, status: resp.status, error: error.slice(0, 200) };
  }
  return { ok: true, status: 200 };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const formData = await context.request.formData();
    const data: Record<string, string> = {};
    for (const [k, v] of formData.entries()) {
      data[k] = String(v);
    }

    // Validate form type
    const form = (data.form as FormType) || inferFormType(new URL(context.request.url));
    if (!form || !["lesson-download", "pilot", "quote"].includes(form)) {
      return new Response("Bad form type", { status: 400 });
    }

    // Validate minimum fields
    if (!data.email) {
      return new Response("Email is required", { status: 400 });
    }

    // 🔴 Never show the thank-you page for a submission we failed to deliver.
    // The page promises a reply within one business day; if the mail did not go
    // out, nobody is coming, and the applicant has no way to know. Tell them.
    const sent = await sendEmail(context.env, form, data);
    if (!sent.ok) {
      // Status 200 on purpose. Cloudflare replaces the body of any 5xx a Pages
      // Function returns with its own "error code: 502" page, so a 502 here would
      // hide the one sentence the applicant actually needs. A 4xx would blame them
      // for our failure. The message is the payload; the status only has to survive.
      return new Response(
        "We could not deliver your submission — our mail service rejected it, and " +
          "nothing was recorded on our side.\n\n" +
          "Please email manirko@playtronica.com directly and paste what you wrote. " +
          "It will be read. Sorry for the detour.",
        { status: 200, headers: { "content-type": "text/plain;charset=UTF-8" } },
      );
    }

    // PRG pattern — redirect to thank-you page so user can refresh without re-submitting.
    return Response.redirect(
      new URL(THANK_YOU_PATH[form], context.request.url).toString(),
      303,
    );
  } catch (e) {
    console.error("[edu-form] handler error:", e);
    return new Response("Submission failed. Please email manirko@playtronica.com directly.", {
      status: 500,
    });
  }
};

/**
 * Fallback: infer form type from referer if a form-type hidden input wasn't provided.
 * This is what lets the three current form action attributes work without code changes.
 *   /education/             → lesson-download (the home-page lead magnet)
 *   /education/pilot/       → pilot
 *   /education/quote/       → quote
 */
function inferFormType(url: URL): FormType | null {
  const p = url.pathname;
  if (p.includes("lesson-download") || p.endsWith("/education/")) return "lesson-download";
  if (p.includes("pilot")) return "pilot";
  if (p.includes("quote")) return "quote";
  return null;
}

/* GET → tell the user this is an API endpoint, not a page. */
export const onRequestGet: PagesFunction<Env> = async () => {
  return new Response(
    JSON.stringify({
      endpoint: "edu-form",
      methods: ["POST"],
      note: "Form submissions only. The forms live at /education/, /education/pilot/, /education/quote/.",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
};
