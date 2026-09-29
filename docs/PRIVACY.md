# Privacy notes for hosts

This is what you, as the person hosting ProfilePolish, should be able to tell students truthfully.

## What the server sees

- **With a student's own key:** nothing. The browser calls the AI provider directly. Vercel only serves static files and the trending feed.
- **With the shared key:** the prompt (which contains the student's profile or resume text) passes through `/api/generate` once, is forwarded to Google Gemini, and the response is streamed back. The route sets `Cache-Control: no-store`, never writes the body to logs, and never stores anything. Vercel's own request logs contain URL, status and timing — not request bodies.
- **Banner maker (only if you set `BANNER_ENABLED=true`):** the student's target role, an optional one-line tagline and a style choice go through `/api/banner` to Google Gemini. The generated image goes straight back to the browser. Nothing is stored or logged. The profile and photos are never sent, because the app never generates or edits photos of people.
- **Always:** an anonymous per-browser id (a random UUID) and the requester IP, used only to count requests against the shared key's and the banner maker's daily limits. With Upstash configured these counters live in Redis and expire after ~26 hours.

## What the browser stores

See the table in the README → Privacy model. Everything has a 48-hour TTL enforced on app load, plus a "Clear all my data" button.

## What you should tell students

> Your profile, resume and drafts stay in your browser. Your API key is never sent to us. If you use the shared key, your text is sent to Google Gemini once and not kept by us. Everything auto-clears after 48 hours.

## What you should NOT do

- Don't add analytics that capture page content or inputs.
- Don't log request bodies in `/api/generate` or `/api/banner`.
- Don't turn on the banner maker with a key whose Gemini terms you haven't checked. On an unpaid key, Google may use prompts to improve its products; tell students if that applies.
- Don't move keys or drafts to a server without adding real authentication first.
