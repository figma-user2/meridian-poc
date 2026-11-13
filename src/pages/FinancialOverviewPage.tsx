import type { Key } from "@heroui/react";

import { ArrowDownToLine } from "@gravity-ui/icons";
import { Button, ListBox, Select } from "@heroui/react";
import { useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { SectionTabs } from "../components/SectionTabs";
import { kpis } from "../data/dashboard";
import { AttentionQueueCard } from "../features/dashboard/AttentionQueueCard";
import { BalanceTrendCard } from "../features/dashboard/BalanceTrendCard";
import { KpiCard } from "../features/dashboard/KpiCard";
import { MembersTable } from "../features/dashboard/MembersTable";
import { PortfolioCompositionCard } from "../features/dashboard/PortfolioCompositionCard";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "portfolio", label: "Portfolio" },
  { id: "liquidity", label: "Liquidity" },
  { id: "risk", label: "Risk & compliance" },
];

const reportingPeriods = [
  { id: "2026-09", label: "Sep 1 – Sep 30, 2026" },
  { id: "2026-08", label: "Aug 1 – Aug 31, 2026" },
  { id: "2026-07", label: "Jul 1 – Jul 31, 2026" },
  { id: "2026-q3", label: "Jul 1 – Sep 30, 2026" },
];

export function FinancialOverviewPage() {
  const [tab, setTab] = useState<Key>("overview");
  const [periodKey, setPeriodKey] = useState<Key>("2026-09");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <PageHeader
          actions={
            <>
              <Select
                aria-label="Reporting period"
                className="w-[204px]"
                selectedKey={periodKey}
                onSelectionChange={(key) => key && setPeriodKey(key)}
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {reportingPeriods.map((period) => (
                      <ListBox.Item key={period.id} id={period.id} textValue={period.label}>
                        {period.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              <Button className="rounded-lg" variant="outline">
                <ArrowDownToLine />
                Export report
              </Button>
            </>
          }
          description="A clear view of performance, liquidity, and what needs your attention."
          title="Financial overview"
        />
        <SectionTabs items={tabs} label="Dashboard sections" selectedKey={tab} onSelectionChange={setTab} />
      </div>

      <section aria-label="Key performance indicators" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <BalanceTrendCard />
        <PortfolioCompositionCard />
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_385px]">
        <MembersTable />
        <AttentionQueueCard />
      </section>

      <footer className="flex flex-wrap justify-between gap-2 text-xs leading-5 text-muted">
        <span>USD · Consolidated institution view · Demo data</span>
        <span>Updated Oct 7, 2026 at 09:41 AM</span>
      </footer>
    </div>
  );
}
