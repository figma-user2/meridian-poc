import { Panel } from "../../components/Panel";
import { portfolio } from "../../data/dashboard";

export function PortfolioCompositionCard() {
  return (
    <Panel description="Loan portfolio by product" title="Portfolio composition">
      <p className="flex items-baseline gap-2">
        <span className="text-3xl leading-9 font-semibold tracking-tight">{portfolio.total}</span>
        <span className="text-xs leading-5 text-muted">outstanding</span>
      </p>

      <div aria-label="Loan portfolio allocation" className="flex h-4 gap-[3px] overflow-hidden rounded-[4px]" role="img">
        {portfolio.segments.map((segment) => (
          <span key={segment.id} style={{ flexGrow: segment.share, backgroundColor: segment.color }} />
        ))}
      </div>

      <ul className="flex flex-col gap-4">
        {portfolio.segments.map((segment) => (
          <li key={segment.id} className="flex items-center gap-2 text-xs leading-5">
            <span aria-hidden className="size-2 shrink-0 rounded-[2px]" style={{ backgroundColor: segment.color }} />
            <span className="flex-1 text-muted">{segment.label}</span>
            <span className="font-medium text-foreground">{segment.amount}</span>
            <span className="w-8 text-end text-muted">{segment.share}%</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
