import { Chip } from "@heroui/react";

export type ClientStatus = "Review due" | "Active";

const statusColor: Record<ClientStatus, "warning" | "success"> = {
  "Review due": "warning",
  Active: "success",
};

export function StatusChip({ status }: { status: ClientStatus }) {
  return (
    <Chip className="h-4 rounded px-0.5 text-[10px] leading-[1.34]" color={statusColor[status]} size="sm" variant="soft">
      {status}
    </Chip>
  );
}
