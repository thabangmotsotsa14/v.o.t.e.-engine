const BASE = "https://municipaldata.org.za/api/cubes/";

export interface MunicipalOverview {
  demarcationCode: string;
  operatingBudget: number | null;
  capitalExpenditure: number | null;
  cashCoverageMonths: number | null;
  auditOutcome: string | null;
  source: "live" | "unavailable";
}

type Cell = Record<string, unknown>;

async function aggregate(cube: string, params: Record<string, string>): Promise<Cell[]> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}${cube}/aggregate?${qs}`);
  if (!res.ok) throw new Error(`${cube} ${res.status}`);
  const json = (await res.json()) as { cells?: Cell[] };
  return json.cells ?? [];
}

async function facts(cube: string, cut: string): Promise<Cell[]> {
  const res = await fetch(`${BASE}${cube}/facts?cut=${encodeURIComponent(cut)}&pagesize=5`);
  if (!res.ok) throw new Error(`${cube} ${res.status}`);
  const json = (await res.json()) as { data?: Cell[] };
  return json.data ?? [];
}

const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : null);

/** Fetch key financial health indicators from National Treasury's Municipal Money API. Never throws. */
export async function fetchMunicipalOverview(demarcationCode: string): Promise<MunicipalOverview> {
  const code = demarcationCode.toUpperCase();
  const base: MunicipalOverview = { demarcationCode: code, operatingBudget: null, capitalExpenditure: null, cashCoverageMonths: null, auditOutcome: null, source: "unavailable" };
  const results = await Promise.allSettled([
    aggregate("incexp_v2", { aggregates: "amount.sum", cut: `demarcation.code:"${code}"|amount_type.code:"ORGB"|financial_year_end.year:2025|period_length.length:"year"` }),
    aggregate("capital_v2", { aggregates: "total_assets.sum", cut: `demarcation.code:"${code}"|amount_type.code:"ORGB"|financial_year_end.year:2025` }),
    facts("audit_opinions", `demarcation.code:"${code}"`),
    aggregate("cflow_v2", { aggregates: "amount.sum", cut: `demarcation.code:"${code}"|amount_type.code:"AUDA"|financial_year_end.year:2024|item.code:"4200"` }),
  ]);
  const [opex, capex, audit, cash] = results;
  if (opex.status === "fulfilled") base.operatingBudget = num(opex.value[0]?.["amount.sum"]);
  if (capex.status === "fulfilled") base.capitalExpenditure = num(capex.value[0]?.["total_assets.sum"]);
  if (audit.status === "fulfilled") {
    const latest = [...audit.value].sort((a, b) => Number(b["financial_year_end.year"]) - Number(a["financial_year_end.year"]))[0];
    base.auditOutcome = (latest?.["opinion.label"] as string) ?? null;
  }
  if (cash.status === "fulfilled" && base.operatingBudget) {
    const c = num(cash.value[0]?.["amount.sum"]);
    if (c !== null) base.cashCoverageMonths = Math.round((c / (base.operatingBudget / 12)) * 10) / 10;
  }
  if (base.operatingBudget || base.capitalExpenditure || base.auditOutcome) base.source = "live";
  return base;
}

export const formatRand = (v: number | null) =>
  v === null ? "—" : `R${(v / 1e9).toFixed(1)}bn`;
