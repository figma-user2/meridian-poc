import type { ComponentType, SVGProps } from "react";

import {
  ArrowRightArrowLeft,
  Briefcase,
  ChartLine,
  LayoutColumns3,
  ObjectsAlignJustifyVertical,
  Persons,
  ShieldCheck,
} from "@gravity-ui/icons";

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Breadcrumb label shown in the application bar. */
  crumb: string;
}

export const platformNav: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutColumns3, crumb: "Institution overview" },
  { label: "Workspace", to: "/workspace", icon: LayoutColumns3, crumb: "Business banking" },
  { label: "Clients", to: "/clients", icon: Persons, crumb: "Clients" },
  { label: "Accounts", to: "/accounts", icon: ObjectsAlignJustifyVertical, crumb: "Accounts" },
  { label: "Payments", to: "/payments", icon: ArrowRightArrowLeft, crumb: "Payments" },
  { label: "Reports", to: "/reports", icon: ChartLine, crumb: "Reports" },
];

export const teamNav: NavItem[] = [
  { label: "Commercial banking", to: "/teams/commercial-banking", icon: Briefcase, crumb: "Commercial banking" },
  { label: "Compliance & risk", to: "/teams/compliance-risk", icon: ShieldCheck, crumb: "Compliance & risk" },
];

export const currentUser = {
  name: "Jordan Lee",
  initials: "JL",
  role: "Relationship manager",
};

export const organization = {
  name: "Meridian Financial",
  environment: "Business banking",
};
