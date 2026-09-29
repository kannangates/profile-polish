/**
 * The host's Gemini key doubles as a free demo for students who haven't added
 * their own. SHARED_KEY_ENABLED=false ends the demo without removing the key,
 * which the banner maker also uses. Unset means on, so existing deployments
 * behave as before. Server-only: it reads server env vars.
 */
export type SharedKeyState = "on" | "off" | "missing";

export function sharedKeyState(env: Record<string, string | undefined> = process.env): SharedKeyState {
  if (!env.GEMINI_API_KEY) return "missing";
  return env.SHARED_KEY_ENABLED?.trim().toLowerCase() === "false" ? "off" : "on";
}

export const SHARED_KEY_MESSAGES: Record<Exclude<SharedKeyState, "on">, string> = {
  off: "The free demo has ended. Add your own free API key in Settings to keep going. It takes about a minute.",
  missing: "The shared free key isn't set up on this deployment. Add your own free API key in Settings.",
};
