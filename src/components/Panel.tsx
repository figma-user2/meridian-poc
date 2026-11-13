import type { ReactNode } from "react";

import { Card } from "@heroui/react";

interface PanelProps {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Bordered white card used for the main content sections. */
export function Panel({ title, description, action, children, className = "" }: PanelProps) {
  return (
    <Card className={`gap-5 rounded-xl border border-border p-5 shadow-none sm:p-6 ${className}`}>
      {title ? (
        <Card.Header className="flex-row flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <Card.Title className="text-base leading-6 font-semibold">{title}</Card.Title>
            {description ? (
              <Card.Description className="text-xs leading-5">{description}</Card.Description>
            ) : null}
          </div>
          {action ? <div className="flex items-center gap-3">{action}</div> : null}
        </Card.Header>
      ) : null}
      {children}
    </Card>
  );
}
