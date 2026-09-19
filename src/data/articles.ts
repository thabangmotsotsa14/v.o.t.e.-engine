export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  url: string;
}

export const STATS_CATEGORIES = [
  "Announcements",
  "Articles",
  "Birth and Death",
  "Causes of Death",
  "Crime",
  "Debt, liquidation and insolvencies",
  "Disability",
  "Economic growth",
  "Economy Data Stories",
  "Education",
  "Energy",
  "Expenditure and Income",
  "Fieldworker",
  "Fishery accounts",
  "Food Security and hunger",
  "Government",
  "Health",
  "Housing",
  "Inflation",
  "Labour market",
  "Manufacturing",
  "Migration",
  "Mining",
  "Population",
  "Poverty",
  "Retail",
  "Tourism",
  "Trade",
  "Transport",
  "Water and sanitation",
] as const;

export const ARTICLES: Article[] = [
  {
    id: "sa-businesses-employment-1996-2022",
    title: "How has employment in South African businesses changed since 1996?",
    date: "September 4, 2026",
    category: "Economy Data Stories",
    summary:
      "A data story tracking shifts in South African employment across labour force, agriculture, and formal business from 1996 to 2022.",
    url: "https://www.statssa.gov.za/?p=19879",
  },
  {
    id: "economic-wrapup-aug-2026",
    title: "Economic wrap-up for August 2026",
    date: "September 2, 2026",
    category: "Economy Data Stories",
    summary:
      "Unemployment rose to 33.6% in Q2 2026 while CPI inflation cooled to 4.3% in July, driven down by fuel and food price drops.",
    url: "https://www.statssa.gov.za/?p=19874",
  },
  {
    id: "qlfs-q2-2026",
    title: "Quarterly Labour Force Survey — Q2 2026",
    date: "August 12, 2026",
    category: "Labour market",
    summary:
      "The official unemployment rate increased to 33.6% in the second quarter of 2026, with youth unemployment remaining above 45%.",
    url: "https://www.statssa.gov.za/?p=19860",
  },
  {
    id: "cpi-july-2026",
    title: "Consumer Price Index — July 2026",
    date: "August 19, 2026",
    category: "Inflation",
    summary:
      "Annual consumer price inflation cooled to 4.3% in July 2026, down from 4.8% in June, on the back of lower fuel and food prices.",
    url: "https://www.statssa.gov.za/?p=19862",
  },
  {
    id: "gdp-q2-2026",
    title: "Gross Domestic Product — Second quarter 2026",
    date: "September 8, 2026",
    category: "Economic growth",
    summary:
      "Real GDP grew by 0.4% in Q2 2026, led by finance, trade and transport industries, while mining and manufacturing contracted.",
    url: "https://www.statssa.gov.za/?p=19885",
  },
  {
    id: "midyear-population-2026",
    title: "Mid-year population estimates 2026",
    date: "July 30, 2026",
    category: "Population",
    summary:
      "South Africa's population is estimated at 63.9 million in 2026, with Gauteng remaining the most populous province.",
    url: "https://www.statssa.gov.za/?p=19840",
  },
  {
    id: "general-household-survey-2025",
    title: "General Household Survey 2025",
    date: "June 24, 2026",
    category: "Housing",
    summary:
      "The latest GHS covers access to housing, water, sanitation, energy and education services across all nine provinces.",
    url: "https://www.statssa.gov.za/?p=19810",
  },
  {
    id: "victims-of-crime-2025-26",
    title: "Governance, Public Safety and Justice Survey 2025/26",
    date: "May 28, 2026",
    category: "Crime",
    summary:
      "Household experiences of crime, perceptions of safety, and trust in police and the justice system for 2025/26.",
    url: "https://www.statssa.gov.za/?p=19790",
  },
  {
    id: "mining-production-june-2026",
    title: "Mining: Production and sales — June 2026",
    date: "August 13, 2026",
    category: "Mining",
    summary:
      "Mining production decreased year-on-year in June 2026, with platinum group metals and iron ore the largest negative contributors.",
    url: "https://www.statssa.gov.za/?p=19858",
  },
  {
    id: "retail-trade-june-2026",
    title: "Retail trade sales — June 2026",
    date: "August 12, 2026",
    category: "Retail",
    summary:
      "Retail trade sales rose modestly in June 2026, supported by general dealers and clothing retailers.",
    url: "https://www.statssa.gov.za/?p=19856",
  },
  {
    id: "electricity-june-2026",
    title: "Electricity generated and available for distribution — June 2026",
    date: "August 6, 2026",
    category: "Energy",
    summary:
      "Electricity generation and distribution statistics for June 2026, tracking supply stability across the national grid.",
    url: "https://www.statssa.gov.za/?p=19850",
  },
  {
    id: "tourism-migration-june-2026",
    title: "Tourism and migration — June 2026",
    date: "August 25, 2026",
    category: "Tourism",
    summary:
      "International arrivals and departures through South African ports of entry, with visitor profiles by country of residence.",
    url: "https://www.statssa.gov.za/?p=19866",
  },
  {
    id: "mortality-causes-2023",
    title: "Mortality and causes of death in South Africa",
    date: "April 15, 2026",
    category: "Causes of Death",
    summary:
      "Registered deaths and underlying causes, including leading natural causes of death by age group and province.",
    url: "https://www.statssa.gov.za/?p=19760",
  },
  {
    id: "recorded-live-births-2025",
    title: "Recorded live births 2025",
    date: "March 31, 2026",
    category: "Birth and Death",
    summary:
      "Birth registrations for 2025, including timely registration rates and provincial distribution.",
    url: "https://www.statssa.gov.za/?p=19745",
  },
  {
    id: "quarterly-employment-statistics-june-2026",
    title: "Quarterly Employment Statistics — June 2026",
    date: "September 15, 2026",
    category: "Labour market",
    summary:
      "Formal non-agricultural employment and earnings for the quarter ended June 2026.",
    url: "https://www.statssa.gov.za/?p=19890",
  },
  {
    id: "manufacturing-june-2026",
    title: "Manufacturing: Production and sales — June 2026",
    date: "August 11, 2026",
    category: "Manufacturing",
    summary:
      "Manufacturing production results for June 2026, with divisional breakdowns and seasonal adjustments.",
    url: "https://www.statssa.gov.za/?p=19854",
  },
];
