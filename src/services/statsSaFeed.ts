import type { Article } from "@/data/statsBizData";

const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.statssa.gov.za%2Ffeed%2F";

const stripHtml = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&#8217;/g, "’").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

interface RssItem { guid?: string; title: string; pubDate: string; link: string; description?: string; categories?: string[] }

export async function fetchLiveStatsSaArticles(): Promise<Article[]> {
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`Feed unavailable (${res.status})`);
  const data = (await res.json()) as { status: string; items?: RssItem[] };
  if (data.status !== "ok" || !data.items) throw new Error("Feed returned no items");
  return data.items.map((item, i) => ({
    id: item.guid || `${i}-${item.link}`,
    title: stripHtml(item.title),
    date: new Date(item.pubDate.replace(" ", "T")).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }),
    category: item.categories?.[0] ?? "Stats SA",
    summary: stripHtml(item.description ?? "").slice(0, 260),
    url: item.link,
  }));
}
