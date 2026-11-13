import type { Key } from "@heroui/react";

import { Tabs } from "@heroui/react";

interface SectionTabsProps {
  label: string;
  items: { id: string; label: string }[];
  selectedKey: Key;
  onSelectionChange: (key: Key) => void;
}

export function SectionTabs({ label, items, selectedKey, onSelectionChange }: SectionTabsProps) {
  return (
    <Tabs selectedKey={selectedKey} onSelectionChange={onSelectionChange}>
      <Tabs.ListContainer className="rounded-full px-1">
        <Tabs.List aria-label={label} className="justify-start">
          {items.map((item) => (
            <Tabs.Tab key={item.id} className="h-9 w-auto flex-none px-3 text-sm font-medium" id={item.id}>
              {item.label}
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
