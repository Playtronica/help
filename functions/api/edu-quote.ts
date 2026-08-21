/**
 * Thin wrapper — institutional quote form submission. See edu-form.ts.
 */
import { onRequestPost as edu } from "./edu-form";

export const onRequestPost: PagesFunction = async (context) => {
  const original = await context.request.formData();
  const fd = new FormData();
  for (const [k, v] of original.entries()) fd.append(k, v as string);
  fd.set("form", "quote");

  // 🔴 Do NOT reuse the original Content-Type here. The incoming body is
  // application/x-www-form-urlencoded (a plain HTML form with no enctype), but `fd`
  // is multipart. Copying the old header made edu-form's request.formData() parse
  // multipart bytes as urlencoded, yielding an empty map and a 400 "Email is required"
  // on every real submission. Dropping content-type/content-length lets Request derive
  // the correct multipart header and boundary from the new body.
  const headers = new Headers(context.request.headers);
  headers.delete("content-type");
  headers.delete("content-length");

  const newRequest = new Request(context.request.url, {
    method: "POST",
    headers,
    body: fd,
  });

  return edu({ ...context, request: newRequest });
};
