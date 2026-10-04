export type AuditRating = "Clean Audit" | "Unqualified" | "Qualified";
export type Municipality = { id: string; name: string; province: string; population: number; unemploymentRate: number; unemploymentTrend: number; auditRating: AuditRating; governanceRank: number; ratesIndex: number; monthlyUtilities: string; services: { water: number; electricity: number; sanitation: number; waste: number }; updates: { date: string; type: string; title: string; detail: string }[] };

export const municipalities: Municipality[] = [
  { id:"ekurhuleni", name:"City of Ekurhuleni", province:"Gauteng", population:4118000, unemploymentRate:37.1, unemploymentTrend:0.8, auditRating:"Unqualified", governanceRank:4, ratesIndex:104, monthlyUtilities:"R1,950–R3,200", services:{water:94,electricity:91,sanitation:92,waste:90}, updates:[{date:"18 Aug 2026",type:"Infrastructure",title:"Tembisa water network renewal",detail:"Phased pipe replacement and pressure management work is underway."},{date:"04 Aug 2026",type:"Ward notice",title:"Ward committee public meetings",detail:"Quarterly service-delivery consultations are open across regional offices."},{date:"22 Jul 2026",type:"Project",title:"Solar high-mast lighting programme",detail:"New installations are prioritised around transport interchanges."}]},
  { id:"johannesburg", name:"City of Johannesburg", province:"Gauteng", population:5866000, unemploymentRate:35.7, unemploymentTrend:-0.4, auditRating:"Qualified", governanceRank:6, ratesIndex:112, monthlyUtilities:"R2,100–R3,550", services:{water:95,electricity:89,sanitation:94,waste:91}, updates:[{date:"25 Aug 2026",type:"Service alert",title:"Water resilience maintenance",detail:"Reservoir and tower maintenance is scheduled across priority systems."},{date:"12 Aug 2026",type:"Ward notice",title:"Integrated development plan review",detail:"Residents can submit local priorities through regional consultations."},{date:"29 Jul 2026",type:"Project",title:"Inner-city road rehabilitation",detail:"Road resurfacing and stormwater repairs continue in selected precincts."}]},
  { id:"cape-town", name:"City of Cape Town", province:"Western Cape", population:4772000, unemploymentRate:29.2, unemploymentTrend:-1.1, auditRating:"Clean Audit", governanceRank:1, ratesIndex:118, monthlyUtilities:"R2,250–R3,800", services:{water:98,electricity:96,sanitation:96,waste:97}, updates:[{date:"27 Aug 2026",type:"Infrastructure",title:"Cape Flats aquifer programme",detail:"Additional groundwater capacity is being integrated into the supply network."},{date:"15 Aug 2026",type:"Project",title:"MyCiTi expansion works",detail:"Construction packages are active along approved corridor extensions."},{date:"01 Aug 2026",type:"Ward notice",title:"Rates relief applications",detail:"Qualifying households may submit updated applications at civic centres."}]},
  { id:"ethekwini", name:"eThekwini Metropolitan Municipality", province:"KwaZulu-Natal", population:4240000, unemploymentRate:39.6, unemploymentTrend:1.2, auditRating:"Qualified", governanceRank:5, ratesIndex:101, monthlyUtilities:"R1,850–R3,100", services:{water:91,electricity:92,sanitation:89,waste:88}, updates:[{date:"21 Aug 2026",type:"Infrastructure",title:"Northern aqueduct upgrades",detail:"Capacity and resilience improvements continue across affected supply zones."},{date:"09 Aug 2026",type:"Service alert",title:"Waste collection recovery plan",detail:"Additional shifts are clearing backlogs in selected communities."},{date:"24 Jul 2026",type:"Project",title:"Coastal stormwater rehabilitation",detail:"Repairs focus on damaged culverts and high-risk drainage channels."}]},
  { id:"tshwane", name:"City of Tshwane", province:"Gauteng", population:4040000, unemploymentRate:34.4, unemploymentTrend:0.3, auditRating:"Qualified", governanceRank:3, ratesIndex:108, monthlyUtilities:"R2,000–R3,400", services:{water:94,electricity:90,sanitation:93,waste:92}, updates:[{date:"23 Aug 2026",type:"Service alert",title:"Electricity network maintenance",detail:"Planned substation maintenance is scheduled by regional service teams."},{date:"07 Aug 2026",type:"Project",title:"Bus rapid transit extension",detail:"Station and lane works continue along the next implementation phase."},{date:"18 Jul 2026",type:"Ward notice",title:"Community budget hearings",detail:"Ward-level hearings are receiving public infrastructure submissions."}]},
  { id:"nelson-mandela-bay", name:"Nelson Mandela Bay", province:"Eastern Cape", population:1296000, unemploymentRate:40.7, unemploymentTrend:0.6, auditRating:"Unqualified", governanceRank:2, ratesIndex:96, monthlyUtilities:"R1,650–R2,850", services:{water:93,electricity:94,sanitation:91,waste:89}, updates:[{date:"19 Aug 2026",type:"Infrastructure",title:"Nooitgedagt water augmentation",detail:"Operational upgrades are improving water transfer reliability."},{date:"05 Aug 2026",type:"Project",title:"Township road resealing",detail:"Road preservation work is progressing across designated wards."},{date:"20 Jul 2026",type:"Ward notice",title:"Public participation calendar",detail:"Municipal planning sessions are open for resident submissions."}]},
];

export interface MunicipalMetric {
  id: string; code: string; name: string; province: string; category: string;
  localUnemployment: number; waterAccessRate: number; electricityAccessRate: number;
  auditRating: string; operatingBudget: string; cashCoverageMonths: number;
  nationalUnemploymentBenchmark: number; nationalGdpImpactNote: string;
}

const NATIONAL_UNEMPLOYMENT = 32.1;

/** National Treasury aggregated 2025/26 MTREF benchmarks (as supplied by V.O.T.E.). */
export const NATIONAL_BENCHMARKS = {
  unemployment: 32.1,
  waterAccess: 88.7,
  electricityAccess: 84.7,
  totalMunicipalBudget: "R698.1bn",
  bulkPurchasesShare: 35.0,
  employeeCostsShare: 27.0,
  capitalExpenditure: "R78.9bn",
  tradingInfrastructureShare: 52.1,
} as const;

export const municipalMetrics: MunicipalMetric[] = [
  { id: "ekurhuleni", code: "EKU", name: "City of Ekurhuleni", province: "Gauteng", category: "A", localUnemployment: 37.1, waterAccessRate: 94, electricityAccessRate: 91, auditRating: "Unqualified", operatingBudget: "R62.4bn", cashCoverageMonths: 1.8, nationalUnemploymentBenchmark: NATIONAL_UNEMPLOYMENT, nationalGdpImpactNote: "Manufacturing and logistics hub (OR Tambo); ~7% of national GDP." },
  // Audit outcome and access rates verified: AGSA MFMA 2023-24 (Stats SA Census 2022 access data).
  { id: "cape-town", code: "CPT", name: "City of Cape Town", province: "Western Cape", category: "A", localUnemployment: 29.2, waterAccessRate: 92.7, electricityAccessRate: 96.7, auditRating: "Clean Audit", operatingBudget: "R68.3bn", cashCoverageMonths: 3.4, nationalUnemploymentBenchmark: NATIONAL_UNEMPLOYMENT, nationalGdpImpactNote: "Finance, tourism and tech services; ~10% of national GDP." },
  { id: "johannesburg", code: "JHB", name: "City of Johannesburg", province: "Gauteng", category: "A", localUnemployment: 35.7, waterAccessRate: 95, electricityAccessRate: 89, auditRating: "Qualified", operatingBudget: "R86.7bn", cashCoverageMonths: 0.9, nationalUnemploymentBenchmark: NATIONAL_UNEMPLOYMENT, nationalGdpImpactNote: "Largest metro economy; finance and trade; ~15% of national GDP." },
  { id: "ethekwini", code: "ETH", name: "eThekwini", province: "KwaZulu-Natal", category: "A", localUnemployment: 39.6, waterAccessRate: 91, electricityAccessRate: 92, auditRating: "Qualified", operatingBudget: "R59.1bn", cashCoverageMonths: 1.2, nationalUnemploymentBenchmark: NATIONAL_UNEMPLOYMENT, nationalGdpImpactNote: "Durban port anchors import/export trade; ~9% of national GDP." },
  { id: "tshwane", code: "TSH", name: "City of Tshwane", province: "Gauteng", category: "A", localUnemployment: 34.4, waterAccessRate: 94, electricityAccessRate: 90, auditRating: "Qualified", operatingBudget: "R48.6bn", cashCoverageMonths: 0.6, nationalUnemploymentBenchmark: NATIONAL_UNEMPLOYMENT, nationalGdpImpactNote: "Administrative capital; government and automotive sectors; ~8% of national GDP." },
];
