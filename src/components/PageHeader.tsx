import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl leading-10 font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="text-sm leading-6 text-muted">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3 sm:gap-4">{actions}</div> : null}
    </div>
  );
}
