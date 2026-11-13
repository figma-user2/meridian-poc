import { Button } from "@heroui/react";

import { Panel } from "../../components/Panel";
import { attentionQueue } from "../../data/dashboard";

export function AttentionQueueCard() {
  return (
    <Panel
      action={
        <Button size="sm" variant="ghost">
          View queue
        </Button>
      }
      description="Prioritized for your operations team"
      title="Needs attention"
    >
      <div className="flex items-center gap-5">
        <span className="text-3xl leading-9 font-semibold text-black">
          {String(attentionQueue.openItems).padStart(2, "0")}
        </span>
        <p className="text-sm leading-6 text-muted">{attentionQueue.summary}</p>
      </div>

      <ul className="flex flex-col gap-1">
        {attentionQueue.items.map((item) => (
          <li key={item.id}>
            <button
              className="flex w-full flex-col items-start rounded-[20px] px-3 py-1.5 text-start outline-none hover:bg-default/60 focus-visible:ring-2 focus-visible:ring-accent"
              type="button"
            >
              <span className="text-sm leading-6 font-medium">{item.title}</span>
              <span className="text-xs leading-5 text-muted">{item.description}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="flex flex-wrap gap-2 rounded-lg bg-selection p-3 text-xs leading-5">
        <span className="font-medium text-accent-deep">{attentionQueue.liquidity.metric}</span>
        <span className="text-muted">{attentionQueue.liquidity.context}</span>
      </p>
    </Panel>
  );
}
