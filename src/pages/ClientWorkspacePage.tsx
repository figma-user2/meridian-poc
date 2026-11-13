import type { Key } from "@heroui/react";
import type { ActivityNote } from "../data/workspace";

import { Plus } from "@gravity-ui/icons";
import { Avatar, AvatarGroup, Button } from "@heroui/react";
import { useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { SectionTabs } from "../components/SectionTabs";
import { activity, clients, tasks, team } from "../data/workspace";
import { ActivityCard } from "../features/workspace/ActivityCard";
import { PriorityClientsCard } from "../features/workspace/PriorityClientsCard";
import { SelectedClientCard } from "../features/workspace/SelectedClientCard";
import { TeamTaskBoard } from "../features/workspace/TeamTaskBoard";

const tabs = [
  { id: "workspace", label: "My workspace" },
  { id: "clients", label: "All clients" },
  { id: "documents", label: "Documents" },
  { id: "activity", label: "Team activity" },
];

export function ClientWorkspacePage() {
  const [tab, setTab] = useState<Key>("workspace");
  const [selectedId, setSelectedId] = useState(clients[0].id);
  const [notes, setNotes] = useState<ActivityNote[]>(activity);

  const selectedClient = clients.find((client) => client.id === selectedId) ?? clients[0];
  const clientNotes = notes.filter((note) => note.clientId === selectedClient.id);

  const postNote = (text: string) => {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setNotes((current) => [
      { id: crypto.randomUUID(), clientId: selectedClient.id, author: "me", note: text, timestamp },
      ...current,
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <PageHeader
          actions={
            <>
              <AvatarGroup aria-label="Workspace collaborators">
                {team.map((member) => (
                  <Avatar key={member.id} aria-label={member.name} className="size-9 ring-2 ring-background">
                    <Avatar.Fallback className="text-xs font-medium">{member.initials}</Avatar.Fallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <Button className="rounded-lg">
                <Plus />
                New task
              </Button>
            </>
          }
          description="Commercial banking · Your clients, accounts, and team priorities in one place."
          title="Client workspace"
        />
        <SectionTabs items={tabs} label="Workspace sections" selectedKey={tab} onSelectionChange={setTab} />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_324px]">
        <div className="flex min-w-0 flex-col gap-6">
          <PriorityClientsCard clients={clients} selectedId={selectedClient.id} onSelect={setSelectedId} />
          <TeamTaskBoard tasks={tasks} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
          <SelectedClientCard client={selectedClient} />
          <ActivityCard client={selectedClient} notes={clientNotes} onPost={postNote} />
        </div>
      </div>
    </div>
  );
}
