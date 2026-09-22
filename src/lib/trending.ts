/**
 * Trending topics from free public sources. Fetched server-side with Next's
 * fetch cache (revalidate hourly) so we never hit these on every page view.
 */

export interface Trend {
  id: string;
  title: string;
  url?: string;
  source: "Google Trends" | "Hacker News" | "Dev.to";
  meta?: string;
  category: "Tech" | "Career" | "General";
}

const REVALIDATE = { next: { revalidate: 3600 } } as const;

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

async function googleTrends(geo: string): Promise<Trend[]> {
  try {
    const res = await fetch(`https://trends.google.com/trending/rss?geo=${geo}`, { ...REVALIDATE, headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.slice(0, 15).map((item, i) => {
      const title = decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
      const traffic = decode(item.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/)?.[1] ?? "");
      const news = decode(item.match(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/)?.[1] ?? "");
      const url = decode(item.match(/<ht:news_item_url>([\s\S]*?)<\/ht:news_item_url>/)?.[1] ?? "");
      return { id: `gt-${i}`, title, url: url || undefined, source: "Google Trends" as const, meta: [traffic && `${traffic} searches`, news].filter(Boolean).join(" · "), category: "General" as const };
    });
  } catch {
    return [];
  }
}

async function hackerNews(): Promise<Trend[]> {
  try {
    const res = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=15", REVALIDATE);
    if (!res.ok) return [];
    const data = (await res.json()) as { hits: { objectID: string; title: string; url?: string; points: number; num_comments: number }[] };
    return data.hits.map((h) => ({
      id: `hn-${h.objectID}`,
      title: h.title,
      url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
      source: "Hacker News" as const,
      meta: `${h.points} points · ${h.num_comments} comments`,
      category: "Tech" as const,
    }));
  } catch {
    return [];
  }
}

async function devTo(): Promise<Trend[]> {
  try {
    const res = await fetch("https://dev.to/api/articles?top=2&per_page=15", REVALIDATE);
    if (!res.ok) return [];
    const data = (await res.json()) as { id: number; title: string; url: string; positive_reactions_count: number; tag_list: string[] }[];
    return data.map((a) => ({
      id: `dev-${a.id}`,
      title: a.title,
      url: a.url,
      source: "Dev.to" as const,
      meta: `${a.positive_reactions_count} reactions · ${a.tag_list.slice(0, 3).join(", ")}`,
      category: a.tag_list.some((t) => /career|productivity|beginners|learning/.test(t)) ? ("Career" as const) : ("Tech" as const),
    }));
  } catch {
    return [];
  }
}

export async function fetchTrends(geo = "IN"): Promise<Trend[]> {
  const [gt, hn, dev] = await Promise.all([googleTrends(geo), hackerNews(), devTo()]);
  // Google Trends for India mixes scripts; English topics are the useful ones for LinkedIn, so surface them first.
  const latin = (t: Trend) => /^[\x00-\x7F]+$/.test(t.title);
  const gtSorted = [...gt.filter(latin), ...gt.filter((t) => !latin(t))];
  return [...gtSorted, ...hn, ...dev].filter((t) => t.title);
}

/** Always-available prompts so the page is useful even if every feed is down. */
export const EVERGREEN_TOPICS: Trend[] = [
  "What I learned from my first hackathon",
  "A mistake I made in my first internship interview",
  "Why I chose my branch — and what I'd tell a first-year",
  "One tool that changed how I study",
  "Lessons from building my first project end-to-end",
  "How I'm preparing for placements this semester",
  "The one skill college didn't teach me",
  "What a week of learning looks like for me",
].map((t, i) => ({ id: `ev-${i}`, title: t, source: "Dev.to" as const, category: "Career" as const, meta: "Evergreen student topic" }));
