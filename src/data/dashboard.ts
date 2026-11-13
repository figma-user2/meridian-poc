export interface Kpi {
  id: string;
  label: string;
  value: string;
  change: string;
  comparison: string;
  /** Show the trend arrow before the change value. */
  trend?: "up";
}

export const kpis: Kpi[] = [
  { id: "deposits", label: "Total deposits", value: "$248.6M", change: "8.2%", comparison: "vs. previous month", trend: "up" },
  { id: "loans", label: "Loan portfolio", value: "$182.4M", change: "5.4%", comparison: "vs. previous month", trend: "up" },
  { id: "nii", label: "Net interest income", value: "$2.84M", change: "6.7%", comparison: "vs. previous month", trend: "up" },
  { id: "accounts", label: "Active client accounts", value: "12,486", change: "+324 accounts", comparison: "this month" },
];

export interface BalancePoint {
  month: string;
  deposits: number;
  lending: number;
}

/** Month-end balances in USD millions. */
export const balanceTrend: Record<"6M" | "1Y", BalancePoint[]> = {
  "6M": [
    { month: "Apr", deposits: 196, lending: 150 },
    { month: "May", deposits: 207, lending: 158 },
    { month: "Jun", deposits: 215, lending: 161 },
    { month: "Jul", deposits: 222, lending: 167 },
    { month: "Aug", deposits: 227, lending: 172 },
    { month: "Sep", deposits: 257, lending: 182 },
  ],
  "1Y": [
    { month: "Oct", deposits: 171, lending: 141 },
    { month: "Nov", deposits: 175, lending: 142 },
    { month: "Dec", deposits: 180, lending: 144 },
    { month: "Jan", deposits: 184, lending: 145 },
    { month: "Feb", deposits: 188, lending: 147 },
    { month: "Mar", deposits: 192, lending: 148 },
    { month: "Apr", deposits: 196, lending: 150 },
    { month: "May", deposits: 207, lending: 158 },
    { month: "Jun", deposits: 215, lending: 161 },
    { month: "Jul", deposits: 222, lending: 167 },
    { month: "Aug", deposits: 227, lending: 172 },
    { month: "Sep", deposits: 257, lending: 182 },
  ],
};

export interface PortfolioSegment {
  id: string;
  label: string;
  amount: string;
  share: number;
  color: string;
}

export const portfolio = {
  total: "$182.4M",
  segments: [
    { id: "commercial", label: "Commercial lending", amount: "$94.8M", share: 52, color: "var(--chart-1)" },
    { id: "residential", label: "Residential mortgages", amount: "$56.5M", share: 31, color: "var(--chart-2)" },
    { id: "consumer", label: "Consumer lending", amount: "$31.1M", share: 17, color: "var(--chart-3)" },
  ] satisfies PortfolioSegment[],
};

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  workerType: "Employee" | "Contractor";
  avatar: string;
}

const seedMembers: Omit<Member, "id">[] = [
  { name: "Kate Moore", email: "kate@acme.com", role: "Chief Executive Officer", workerType: "Employee", avatar: "/avatars/blue.png" },
  { name: "John Smith", email: "john@acme.com", role: "Chief Technology Officer", workerType: "Employee", avatar: "/avatars/gray.png" },
  { name: "Sara Johnson", email: "sara@acme.com", role: "Chief Marketing Officer", workerType: "Employee", avatar: "/avatars/green.png" },
  { name: "Michael Brown", email: "michael@acme.com", role: "Chief Financial Officer", workerType: "Employee", avatar: "/avatars/orange.png" },
  { name: "Emily Davis", email: "emily@acme.com", role: "Product Manager", workerType: "Employee", avatar: "/avatars/red.png" },
  { name: "Davis Wilson", email: "david@acme.com", role: "Lead Designer", workerType: "Employee", avatar: "/avatars/purple.png" },
  { name: "Laura Taylor", email: "laura@acme.com", role: "Software Engineer", workerType: "Employee", avatar: "/avatars/blue.png" },
  { name: "James Anderson", email: "james@acme.com", role: "Data Analyst", workerType: "Contractor", avatar: "/avatars/gray.png" },
  { name: "Sophia Martinez", email: "sophia@acme.com", role: "UX Researcher", workerType: "Contractor", avatar: "/avatars/orange.png" },
  { name: "Daniel Lee", email: "daniel@acme.com", role: "Sales Manager", workerType: "Employee", avatar: "/avatars/green.png" },
];

/** 120 demo members; the first page matches the design. */
export const members: Member[] = Array.from({ length: 120 }, (_, index) => ({
  ...seedMembers[index % seedMembers.length],
  id: 4586932 + index,
}));

export const attentionQueue = {
  openItems: 5,
  summary: "Open items across approvals and compliance reviews",
  items: [
    { id: "payments", title: "3 payments awaiting approval", description: "$214,750 total · dual authorization" },
    { id: "kyc", title: "2 KYC reviews due today", description: "Northstar Group, Harborview Logistics" },
  ],
  liquidity: { metric: "LCR 142%", context: "Above the 100% regulatory minimum" },
};
