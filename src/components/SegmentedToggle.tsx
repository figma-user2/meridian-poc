import type { Key } from "@heroui/react";

import { ToggleButton, ToggleButtonGroup } from "@heroui/react";

interface SegmentedToggleProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

/** Single-select segmented control (e.g. 6M / 1Y, Board / List). */
export function SegmentedToggle<T extends string>({ label, options, value, onChange }: SegmentedToggleProps<T>) {
  return (
    <ToggleButtonGroup
      disallowEmptySelection
      aria-label={label}
      selectedKeys={new Set<Key>([value])}
      selectionMode="single"
      size="sm"
      onSelectionChange={(keys) => {
        const [next] = keys as Set<Key>;
        if (next !== undefined) onChange(next as T);
      }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option}
          className="h-8 rounded-none bg-transparent px-3 first:rounded-s-2xl last:rounded-e-2xl data-[selected=true]:bg-default data-[selected=true]:text-accent-strong"
          id={option}
        >
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
