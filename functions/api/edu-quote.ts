/**
 * Thin wrapper — institutional quote form submission. See edu-form.ts.
 */
import { onRequestPost as edu } from "./edu-form";

export const onRequestPost: PagesFunction = async (context) => {
  const original = await context.request.formData();
  const fd = new FormData();
  for (const [k, v] of original.entries()) fd.append(k, v as string);
  fd.set("form", "quote");

  const newRequest = new Request(context.request.url, {
    method: "POST",
    headers: context.request.headers,
    body: fd,
  });

  return edu({ ...context, request: newRequest });
};
