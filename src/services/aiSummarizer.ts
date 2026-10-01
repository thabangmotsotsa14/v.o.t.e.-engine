import { supabase } from "@/integrations/supabase/client";

export interface ArticleSummary {
  summary: string;
  takeaways: string[];
}

export async function summarizeArticle({ url, text }: { url?: string; text?: string }): Promise<ArticleSummary> {
  const { data, error } = await supabase.functions.invoke("summarize-article", { body: { url, text } });
  if (error) {
    let message = "Could not generate a summary.";
    try {
      const ctx = (error as { context?: Response }).context;
      const body = ctx ? await ctx.json() : null;
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  if (data?.error) throw new Error(data.error);
  return { summary: String(data?.summary ?? ""), takeaways: Array.isArray(data?.takeaways) ? data.takeaways : [] };
}
