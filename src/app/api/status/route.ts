import { sharedKeyState } from "@/lib/shared-key";

export const dynamic = "force-dynamic";

/**
 * Tells the browser whether this deployment has a shared free key configured.
 * Without it, a student must add their own key before anything will generate —
 * the UI uses this to say so up front instead of failing at the last step.
 */
export function GET() {
  return Response.json(
    { sharedKey: sharedKeyState() === "on", demoEnded: sharedKeyState() === "off" },
    // Short, so turning the demo off shows up for students within a minute of the redeploy.
    { headers: { "cache-control": "public, max-age=60" } },
  );
}
