import { useState } from "react";
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Panel } from "../../components/Panel";
import { SegmentedToggle } from "../../components/SegmentedToggle";
import { chartColors } from "../../data/chartColors";
import { balanceTrend } from "../../data/dashboard";

const periods = ["6M", "1Y"] as const;
type Period = (typeof periods)[number];

const axisTick = { fill: chartColors.axis, fontSize: 11 };

export function BalanceTrendCard() {
  const [period, setPeriod] = useState<Period>("6M");
  const data = balanceTrend[period];

  return (
    <Panel
      action={<SegmentedToggle label="Chart period" options={periods} value={period} onChange={setPeriod} />}
      description={period === "6M" ? "Six-month balance trend · USD millions" : "Twelve-month balance trend · USD millions"}
      title="Deposits & lending"
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs leading-5">
        <LegendItem color={chartColors.deposits} label="Deposits" />
        <LegendItem color={chartColors.lending} label="Loan portfolio" />
        <span className="text-muted">Deposit growth outpaces lending</span>
      </div>

      <div className="h-[190px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id="deposit-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={chartColors.deposits} stopOpacity={0.2} />
                <stop offset="100%" stopColor={chartColors.deposits} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={chartColors.grid} vertical={false} />
            <XAxis axisLine={false} dataKey="month" dy={10} tick={axisTick} tickLine={false} />
            <YAxis
              axisLine={false}
              domain={[140, 260]}
              tick={axisTick}
              tickLine={false}
              ticks={[140, 180, 220, 260]}
              width={44}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                boxShadow: "var(--surface-shadow)",
                fontSize: 12,
              }}
              formatter={(value, name) => [`$${value}M`, name === "deposits" ? "Deposits" : "Loan portfolio"]}
            />
            <Area
              activeDot={{ r: 4, fill: chartColors.deposits, stroke: "#fff", strokeWidth: 2 }}
              dataKey="deposits"
              fill="url(#deposit-area)"
              stroke={chartColors.deposits}
              strokeWidth={3}
              type="monotone"
            />
            <Line
              activeDot={{ r: 4, fill: chartColors.lending, stroke: "#fff", strokeWidth: 2 }}
              dataKey="lending"
              dot={false}
              stroke={chartColors.lending}
              strokeWidth={2.5}
              type="monotone"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-foreground">
      <span aria-hidden className="h-[3px] w-3.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
