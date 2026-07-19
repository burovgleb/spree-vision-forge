export type FeedbackPayload = {
  submissionId: string;
  formType: "general" | "product";
  name: string;
  contact: string;
  interests: string[];
  comment: string;
  pageUrl: string;
  website: string;
  product?: {
    id: string;
    collection: string;
    color: string;
    size: string;
    price: string;
  };
};

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim();

function isGoogleAppsScriptUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/(?:a\/[^/]+\/)?macros\/s\/[^/]+\/exec$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export async function submitFeedback(payload: FeedbackPayload) {
  if (!GOOGLE_SCRIPT_URL || !isGoogleAppsScriptUrl(GOOGLE_SCRIPT_URL)) {
    throw new Error("FORM_NOT_CONFIGURED");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);

  try {
    // Apps Script does not expose configurable CORS headers. A text/plain request is
    // a browser "simple request", and no-cors lets a static site deliver it without
    // exposing the private Apps Script response to the browser.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    });
  } finally {
    window.clearTimeout(timeout);
  }
}
