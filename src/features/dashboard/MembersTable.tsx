import type { Selection } from "@heroui/react";

import { Copy, Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { Avatar, Button, Checkbox, ListBox, Pagination, Select, Table } from "@heroui/react";
import { useMemo, useState } from "react";

import { members } from "../../data/dashboard";

const PAGE_SIZE = 10;
const totalPages = Math.ceil(members.length / PAGE_SIZE);

const ranges = Array.from({ length: totalPages }, (_, i) => ({
  id: String(i + 1),
  label: `${i * PAGE_SIZE + 1}-${Math.min((i + 1) * PAGE_SIZE, members.length)}`,
}));

/** Page numbers with ellipsis gaps, e.g. 1 2 3 … 10 11 12 */
function getPageItems(page: number): (number | "ellipsis")[] {
  const edges = new Set([1, 2, 3, totalPages - 2, totalPages - 1, totalPages, page - 1, page, page + 1]);
  const pages = [...edges].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const items: (number | "ellipsis")[] = [];

  pages.forEach((p, index) => {
    if (index > 0 && p - pages[index - 1] > 1) items.push("ellipsis");
    items.push(p);
  });

  return items;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function SelectionCheckbox({ label }: { label: string }) {
  return (
    <Checkbox aria-label={label} slot="selection">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox.Content>
    </Checkbox>
  );
}

export function MembersTable() {
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const rows = useMemo(() => members.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [page]);

  return (
    <Table className="min-w-0">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Team members"
          className="min-w-[820px]"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
        >
          <Table.Header>
            <Table.Column className="w-10 pe-0">
              <SelectionCheckbox label="Select all" />
            </Table.Column>
            <Table.Column isRowHeader className="w-36">
              Worker ID
            </Table.Column>
            <Table.Column>Member</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Worker Type</Table.Column>
            <Table.Column className="w-32 text-end after:hidden">
              <span className="sr-only">Actions</span>
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {rows.map((member) => (
              <Table.Row key={member.id} id={member.id}>
                <Table.Cell className="pe-0">
                  <SelectionCheckbox label={`Select ${member.name}`} />
                </Table.Cell>
                <Table.Cell className="font-medium">
                  <div className="flex items-center gap-2 text-base">
                    #{member.id}
                    <Button
                      isIconOnly
                      aria-label={`Copy ID #${member.id}`}
                      size="sm"
                      variant="ghost"
                      onPress={() => void navigator.clipboard?.writeText(`#${member.id}`)}
                    >
                      <Copy className="size-4 text-foreground" />
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <Avatar.Image alt={member.name} src={member.avatar} />
                      <Avatar.Fallback>{initials(member.name)}</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs leading-5">{member.name}</span>
                      <span className="text-xs leading-5 text-muted">{member.email}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-base">{member.role}</Table.Cell>
                <Table.Cell className="text-base">{member.workerType}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-end gap-3">
                    <Button isIconOnly aria-label={`View ${member.name}`} size="sm" variant="tertiary">
                      <Eye className="size-4" />
                    </Button>
                    <Button isIconOnly aria-label={`Edit ${member.name}`} size="sm" variant="tertiary">
                      <Pencil className="size-4" />
                    </Button>
                    <Button isIconOnly aria-label={`Delete ${member.name}`} size="sm" variant="danger-soft">
                      <TrashBin className="size-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <Pagination className="flex-wrap gap-4">
          <Pagination.Summary className="flex items-center gap-4 text-sm text-muted">
            Showing
            <Select
              aria-label="Visible rows"
              className="w-[88px]"
              selectedKey={String(page)}
              onSelectionChange={(key) => key && setPage(Number(key))}
            >
              <Select.Trigger className="bg-surface shadow-field">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {ranges.map((range) => (
                    <ListBox.Item key={range.id} id={range.id} textValue={range.label}>
                      {range.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            of {members.length} results
          </Pagination.Summary>

          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                <Pagination.PreviousIcon />
                Previous
              </Pagination.Previous>
            </Pagination.Item>
            {getPageItems(page).map((item, index) =>
              item === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${index}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={item}>
                  <Pagination.Link isActive={item === page} onPress={() => setPage(item)}>
                    {item}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}
            <Pagination.Item>
              <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}
