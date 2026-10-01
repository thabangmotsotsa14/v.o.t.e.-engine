import { useEffect, useState } from "react";
import { Loader2, Copy, Zap, Link2, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { summarizeArticle, type ArticleSummary } from "@/services/aiSummarizer";

export interface SummarizerPreset {
  url?: string;
  text?: string;
  nonce: number;
}

const ArticleSummarizerModal = ({ preset }: { preset?: SummarizerPreset }) => {
  const [tab, setTab] = useState<"text" | "url">("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArticleSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (input: { url?: string; text?: string }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await summarizeArticle(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!preset) return;
    if (preset.text) {
      setTab("text");
      setText(preset.text);
    } else if (preset.url) {
      setTab("url");
      setUrl(preset.url);
    }
    run({ url: preset.url, text: preset.text });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset?.nonce]);

  const submit = () => run(tab === "text" ? { text } : { url });
  const canSubmit = !loading && (tab === "text" ? text.trim().length >= 40 : /^https?:\/\//.test(url.trim()));

  const copy = async () => {
    if (!result) return;
    const out = `${result.summary}\n\n${result.takeaways.map((t) => `• ${t}`).join("\n")}`;
    await navigator.clipboard.writeText(out).catch(() => undefined);
    toast({ title: "Summary copied" });
  };

  return (
    <Card id="summarizer" className="border-primary/40 bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-xl">
          <Zap className="h-5 w-5 text-accent" /> Summarize Any Article with AI
        </CardTitle>
        <CardDescription>Paste article text or a link — get a 2-sentence brief and key takeaways.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "text" | "url")}>
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
            <TabsTrigger value="text"><FileText className="mr-1.5 h-4 w-4" />Paste Article Text</TabsTrigger>
            <TabsTrigger value="url"><Link2 className="mr-1.5 h-4 w-4" />Provide Article URL</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the article text here..." maxLength={30000} />
          </TabsContent>
          <TabsContent value="url">
            <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.statssa.gov.za/?p=..." />
          </TabsContent>
        </Tabs>
        <Button onClick={submit} disabled={!canSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
          {loading ? "Summarizing..." : "Generate AI Summary"}
        </Button>

        {error && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        {result && (
          <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Executive Summary</h3>
              <Button size="sm" variant="outline" onClick={copy}><Copy className="mr-1.5 h-3.5 w-3.5" />Copy Summary</Button>
            </div>
            <p className="text-sm text-foreground">{result.summary}</p>
            {result.takeaways.length > 0 && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Key Takeaways</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                  {result.takeaways.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleSummarizerModal;
