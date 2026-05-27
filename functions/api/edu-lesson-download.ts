/**
 * Thin wrapper — accepts the lead-magnet POST from /education/, dispatches to
 * edu-form with form=lesson-download, then redirects the user to the PDF
 * download URL on the thank-you page.
 *
 * See functions/api/edu-form.ts for the shared handler logic.
 */
import { onRequestPost as edu } from "./edu-form";

export const onRequestPost: PagesFunction = async (context) => {
  // Re-parse the form body, inject form-type, hand off to shared handler.
  const original = await context.request.formData();
  const fd = new FormData();
  for (const [k, v] of original.entries()) fd.append(k, v as string);
  fd.set("form", "lesson-download");

  const newRequest = new Request(context.request.url, {
    method: "POST",
    headers: context.request.headers,
    body: fd,
  });

  return edu({ ...context, request: newRequest });
};
