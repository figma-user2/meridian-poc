import type { Key } from "@heroui/react";
import type { Task } from "../../data/workspace";

import { Card, ListBox, Select, Table } from "@heroui/react";
import { useState } from "react";

import { Panel } from "../../components/Panel";
import { SegmentedToggle } from "../../components/SegmentedToggle";
import { lanes, memberById, team } from "../../data/workspace";

const views = ["Board", "List"] as const;
type View = (typeof views)[number];

const assigneeOptions = [{ id: "all", label: "All assignees" }, ...team.map((m) => ({ id: m.id, label: m.name }))];

export function TeamTaskBoard({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState<View>("Board");
  const [assignee, setAssignee] = useState<Key>("all");

  const visible = assignee === "all" ? tasks : tasks.filter((task) => task.assignee === assignee);
  const dueToday = visible.filter((task) => task.dueToday && task.status !== "completed").length;
  const completed = visible.filter((task) => task.status === "completed").length;

  return (
    <Panel
      action={
        <>
          <Select
            aria-label="Filter by assignee"
            className="w-[145px]"
            selectedKey={assignee}
            onSelectionChange={(key) => key && setAssignee(key)}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {assigneeOptions.map((option) => (
                  <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
                    {option.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <SegmentedToggle label="Board view" options={views} value={view} onChange={setView} />
        </>
      }
      description={`${visible.length} tasks · ${dueToday} due today · ${completed} completed`}
      title="Team priorities"
    >
      {view === "Board" ? <BoardView tasks={visible} /> : <ListView tasks={visible} />}

      <p className="text-xs leading-5 text-muted">
        Shared with Commercial Banking · All changes are saved automatically
      </p>
    </Panel>
  );
}

function BoardView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {lanes.map((lane) => {
        const laneTasks = tasks.filter((task) => task.status === lane.id);

        return (
          <section key={lane.id} aria-label={lane.title} className="flex flex-col gap-3 rounded-lg bg-background p-3">
            <header className="flex items-center gap-2">
              <span aria-hidden className="size-[7px] rounded-full" style={{ backgroundColor: lane.color }} />
              <h3 className="flex-1 text-sm leading-6 font-medium text-black">{lane.title}</h3>
              <span className="text-xs leading-5 text-muted">{laneTasks.length}</span>
            </header>
            {laneTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </section>
        );
      })}
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const owner = memberById(task.assignee);

  return (
    <Card className="gap-3 rounded-lg p-4">
      <Card.Header className="gap-2">
        <span className="text-[10px] leading-5 font-medium text-accent-deep uppercase">{task.category}</span>
        <Card.Title className="text-sm leading-6 font-semibold">{task.title}</Card.Title>
        <Card.Description className="text-[11px] leading-[18px]">
          {task.client}
          <br />
          {task.detail}
        </Card.Description>
      </Card.Header>
      <Card.Footer className="text-[11px] leading-5 font-medium">
        {owner.initials} · {owner.name}
      </Card.Footer>
    </Card>
  );
}

function ListView({ tasks }: { tasks: Task[] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team tasks" className="min-w-[640px]">
          <Table.Header>
            <Table.Column isRowHeader>Task</Table.Column>
            <Table.Column>Client</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Assignee</Table.Column>
          </Table.Header>
          <Table.Body>
            {tasks.map((task) => (
              <Table.Row key={task.id} id={task.id}>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-5 font-medium text-accent-deep uppercase">{task.category}</span>
                    <span className="font-medium">{task.title}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-muted">{task.client}</Table.Cell>
                <Table.Cell>{lanes.find((lane) => lane.id === task.status)?.title}</Table.Cell>
                <Table.Cell>{memberById(task.assignee).name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
