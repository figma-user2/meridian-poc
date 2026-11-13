import type { ActivityNote, Client } from "../../data/workspace";

import { Button, TextArea } from "@heroui/react";
import { useState } from "react";

import { InitialsAvatar } from "../../components/InitialsAvatar";
import { Panel } from "../../components/Panel";
import { memberById } from "../../data/workspace";
import { currentUser } from "../../data/navigation";

interface ActivityCardProps {
  client: Client;
  notes: ActivityNote[];
  onPost: (note: string) => void;
}

export function ActivityCard({ client, notes, onPost }: ActivityCardProps) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onPost(text);
    setDraft("");
  };

  return (
    <Panel description={`${client.name} · Shared with your team`} title="Activity & notes">
      <ol className="flex flex-col gap-[18px]">
        {notes.map((note) => {
          const author = note.author === "me" ? currentUser : memberById(note.author);

          return (
            <li key={note.id} className="flex gap-2.5">
              <InitialsAvatar initials={author.initials} name={author.name} />
              <div className="flex flex-col gap-1 text-xs leading-5">
                <span className="font-medium text-black">{author.name}</span>
                <p className="text-muted">{note.note}</p>
                <time className="text-muted">{note.timestamp}</time>
              </div>
            </li>
          );
        })}
      </ol>

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <TextArea
          fullWidth
          aria-label="Add a note"
          className="h-24"
          placeholder="Add a note..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs leading-5 text-muted">Internal only</span>
          <Button className="rounded-lg" type="submit">
            Post note
          </Button>
        </div>
      </form>
    </Panel>
  );
}
