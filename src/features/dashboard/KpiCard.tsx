import type { Kpi } from "../../data/dashboard";

import { ArrowUpRight } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card className="gap-3 rounded-xl p-4">
      <Card.Header className="gap-4">
        <Card.Description className="text-sm leading-6">{kpi.label}</Card.Description>
        <Card.Title className="text-[32px] leading-[38px] font-semibold tracking-tight">{kpi.value}</Card.Title>
        <p className="flex items-center gap-1.5 text-xs leading-5 text-success-strong">
          {kpi.trend === "up" ? <ArrowUpRight aria-hidden className="size-3" /> : null}
          <span>{kpi.change}</span>
          <span aria-hidden>·</span>
          <span>{kpi.comparison}</span>
        </p>
      </Card.Header>
    </Card>
  );
}
