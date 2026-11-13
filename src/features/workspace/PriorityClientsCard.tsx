import type { Key, Selection } from "@heroui/react";
import type { Client } from "../../data/workspace";

import { ListBox, Select, Table } from "@heroui/react";
import { useState } from "react";

import { InitialsAvatar } from "../../components/InitialsAvatar";
import { Panel } from "../../components/Panel";
import { StatusChip } from "../../components/StatusChip";
import { assignedClientCount, clientDeposits, formatCurrency, formatMillions } from "../../data/workspace";

const filters = [
  { id: "mine", label: "Assigned to me" },
  { id: "review", label: "Review due" },
  { id: "active", label: "Active" },
];

interface PriorityClientsCardProps {
  clients: Client[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PriorityClientsCard({ clients, selectedId, onSelect }: PriorityClientsCardProps) {
  const [filter, setFilter] = useState<Key>("mine");

  const visible = clients.filter((client) => {
    if (filter === "review") return client.status === "Review due";
    if (filter === "active") return client.status === "Active";
    return true;
  });
  const combined = visible.reduce((sum, client) => sum + clientDeposits(client), 0);

  return (
    <Panel
      action={
        <Select
          aria-label="Client filter"
          className="w-[166px]"
          selectedKey={filter}
          onSelectionChange={(key) => key && setFilter(key)}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {filters.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
                  {item.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      }
      description={`${visible.length} of ${assignedClientCount} assigned clients · ${formatMillions(combined)} combined deposits`}
      title="Your priority clients"
    >
      <Table className="rounded-none bg-transparent p-0">
        <Table.ScrollContainer>
          <Table.Content
            disallowEmptySelection
            aria-label="Priority clients"
            className="min-w-[640px]"
            selectedKeys={new Set([selectedId])}
            selectionBehavior="replace"
            selectionMode="single"
            onSelectionChange={(keys: Selection) => {
              const [next] = keys as Set<Key>;
              if (next !== undefined) onSelect(String(next));
            }}
          >
            <Table.Header className="[&_th]:h-10 [&_th]:bg-background [&_th]:text-xs [&_th]:font-medium [&_th]:text-muted [&_th:first-child]:rounded-s-md [&_th:last-child]:rounded-e-md [&_th]:after:hidden">
              <Table.Column isRowHeader>Client / entity</Table.Column>
              <Table.Column className="w-[100px]">Accounts</Table.Column>
              <Table.Column className="w-[136px]">Deposit balance</Table.Column>
              <Table.Column className="w-[108px]">Status</Table.Column>
            </Table.Header>
            <Table.Body>
              {visible.map((client) => (
                <Table.Row
                  key={client.id}
                  className="cursor-pointer [&>td]:h-[66px] [&>td]:rounded-none [&>td]:border-b [&>td]:border-border [&>td]:bg-transparent data-[selected=true]:[&>td]:bg-selection"
                  id={client.id}
                >
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <InitialsAvatar initials={client.initials} name={client.name} />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm leading-6 font-medium text-black">{client.name}</span>
                        <span className="text-xs leading-5 text-muted">
                          {client.number} · {client.industry}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-xs text-muted">{client.accounts.length} accounts</Table.Cell>
                  <Table.Cell className="text-sm leading-6 font-medium text-black">
                    {formatCurrency(clientDeposits(client))}
                  </Table.Cell>
                  <Table.Cell>
                    <StatusChip status={client.status} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Panel>
  );
}
