import type { Client } from "../../data/workspace";

import { Button, Card, Separator } from "@heroui/react";

import { InitialsAvatar } from "../../components/InitialsAvatar";
import { StatusChip } from "../../components/StatusChip";
import { clientDeposits, formatCurrency } from "../../data/workspace";

export function SelectedClientCard({ client }: { client: Client }) {
  return (
    <Card className="gap-5 rounded-xl border border-border p-6 shadow-none">
      <div className="flex items-center justify-between">
        <span className="text-xs leading-5 font-medium text-muted uppercase">Selected client</span>
        <StatusChip status={client.status} />
      </div>

      <div className="flex items-center gap-3">
        <InitialsAvatar initials={client.initials} name={client.name} />
        <div className="flex flex-col gap-0.5">
          <Card.Title className="text-base leading-6 font-semibold text-black">{client.name}</Card.Title>
          <span className="text-xs leading-5 text-muted">
            {client.number} · Since {client.since}
          </span>
        </div>
      </div>

      <dl className="flex flex-col gap-3">
        {client.accounts.map((account) => (
          <div key={account.last4} className="flex items-center justify-between text-xs leading-5">
            <dt className="text-muted">
              {account.name} · •• {account.last4}
            </dt>
            <dd className="font-medium text-black">{formatCurrency(account.balance)}</dd>
          </div>
        ))}
        <Separator />
        <div className="flex items-center justify-between">
          <dt className="text-xs leading-5 font-medium text-black">Total deposits</dt>
          <dd className="text-sm leading-6 font-medium text-black">{formatCurrency(clientDeposits(client))}</dd>
        </div>
      </dl>

      <Button fullWidth className="rounded-lg" variant="outline">
        Open client profile
      </Button>
    </Card>
  );
}
