import type { ClientStatus } from "../components/StatusChip";

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
}

export const team: TeamMember[] = [
  { id: "jl", name: "Jordan Lee", initials: "JL" },
  { id: "sk", name: "Sarah Kim", initials: "SK" },
  { id: "mr", name: "Marcus Reed", initials: "MR" },
];

export interface ClientAccount {
  name: string;
  last4: string;
  balance: number;
}

export interface Client {
  id: string;
  name: string;
  initials: string;
  number: string;
  industry: string;
  since: string;
  status: ClientStatus;
  assignedTo: string;
  accounts: ClientAccount[];
}

export const clients: Client[] = [
  {
    id: "C-10428",
    name: "Northstar Group",
    initials: "NG",
    number: "C-10428",
    industry: "Manufacturing",
    since: "May 2019",
    status: "Review due",
    assignedTo: "jl",
    accounts: [
      { name: "Operating", last4: "4821", balance: 1_425_000 },
      { name: "Treasury", last4: "7306", balance: 3_100_000 },
      { name: "Reserve", last4: "9124", balance: 300_000 },
    ],
  },
  {
    id: "C-10316",
    name: "Atlas Construction",
    initials: "AC",
    number: "C-10316",
    industry: "Real estate",
    since: "Feb 2021",
    status: "Active",
    assignedTo: "jl",
    accounts: [
      { name: "Operating", last4: "2219", balance: 1_640_500 },
      { name: "Payroll", last4: "5530", balance: 500_000 },
    ],
  },
  {
    id: "C-10294",
    name: "Harborview Logistics",
    initials: "HV",
    number: "C-10294",
    industry: "Transportation",
    since: "Aug 2018",
    status: "Review due",
    assignedTo: "jl",
    accounts: [
      { name: "Operating", last4: "1187", balance: 1_920_200 },
      { name: "Treasury", last4: "6402", balance: 1_200_000 },
      { name: "Payroll", last4: "3391", balance: 410_000 },
      { name: "Reserve", last4: "8075", balance: 150_000 },
    ],
  },
];

/** Total portfolio for the relationship manager (shown in the table summary). */
export const assignedClientCount = 24;

export const clientDeposits = (client: Client) => client.accounts.reduce((sum, account) => sum + account.balance, 0);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export const formatMillions = (value: number) => `$${(value / 1_000_000).toFixed(2)}M`;

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  category: string;
  title: string;
  client: string;
  detail: string;
  assignee: string;
  status: TaskStatus;
  dueToday?: boolean;
}

export const lanes: { id: TaskStatus; title: string; color: string }[] = [
  { id: "todo", title: "To do", color: "var(--lane-todo)" },
  { id: "in-progress", title: "In progress", color: "var(--lane-progress)" },
  { id: "completed", title: "Completed", color: "var(--lane-done)" },
];

export const tasks: Task[] = [
  {
    id: "t1",
    category: "High priority",
    title: "Complete annual KYC review",
    client: "Northstar Group",
    detail: "Due today · 2 documents missing",
    assignee: "jl",
    status: "todo",
    dueToday: true,
  },
  {
    id: "t2",
    category: "Approval",
    title: "Approve treasury transfer",
    client: "Northstar Group",
    detail: "$75,000 · Due today",
    assignee: "sk",
    status: "todo",
    dueToday: true,
  },
  {
    id: "t3",
    category: "Credit review",
    title: "Renew working capital line",
    client: "Atlas Construction",
    detail: "$1.2M facility · Due Oct 9",
    assignee: "mr",
    status: "in-progress",
  },
  {
    id: "t4",
    category: "KYC review",
    title: "Verify beneficial owners",
    client: "Harborview Logistics",
    detail: "3 of 4 verified · Due today",
    assignee: "jl",
    status: "in-progress",
    dueToday: true,
  },
  {
    id: "t5",
    category: "Payment",
    title: "Release loan disbursement",
    client: "Atlas Construction",
    detail: "$180,000 · Completed 09:18",
    assignee: "sk",
    status: "completed",
  },
  {
    id: "t6",
    category: "Account service",
    title: "Update authorized signers",
    client: "Evergreen Partners",
    detail: "Signed mandate filed · Oct 6",
    assignee: "mr",
    status: "completed",
  },
];

export interface ActivityNote {
  id: string;
  clientId: string;
  author: string;
  note: string;
  timestamp: string;
}

export const activity: ActivityNote[] = [
  {
    id: "n1",
    clientId: "C-10428",
    author: "sk",
    note: "Received the updated ownership chart. Ready for your review.",
    timestamp: "09:28 AM",
  },
  {
    id: "n2",
    clientId: "C-10428",
    author: "jl",
    note: "Requested two outstanding KYC documents from the client.",
    timestamp: "08:50 AM",
  },
  {
    id: "n3",
    clientId: "C-10428",
    author: "mr",
    note: "Added the treasury transfer for dual approval.",
    timestamp: "Yesterday, 4:12 PM",
  },
];

export const memberById = (id: string) => team.find((member) => member.id === id)!;
