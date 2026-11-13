import type { NavItem } from "../data/navigation";

import { ChevronDown, Sliders } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react";
import { NavLink } from "react-router";

import { currentUser, organization, platformNav, teamNav } from "../data/navigation";

interface SidebarProps {
  /** Called after a navigation link is pressed (used to close the mobile drawer). */
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto px-4 pt-7 pb-6 text-sidebar-foreground">
      <Brand />

      <button
        className="flex flex-col items-start gap-1 rounded-lg border border-sidebar-border bg-sidebar-surface p-3 text-start outline-none focus-visible:ring-2 focus-visible:ring-accent"
        type="button"
      >
        <span className="text-sm leading-6 font-medium">{organization.name}</span>
        <span className="flex items-center gap-1 text-xs leading-5 text-sidebar-muted">
          {organization.environment}
          <ChevronDown aria-hidden className="size-2.5 translate-y-px" />
        </span>
      </button>

      <NavSection items={platformNav} label="Banking platform" onNavigate={onNavigate} />
      <NavSection compact items={teamNav} label="Your team" onNavigate={onNavigate} />

      <div className="flex-1" />

      <div className="flex flex-col gap-1.5 rounded-lg border border-sidebar-border bg-sidebar-surface p-3">
        <span className="flex items-center gap-2 text-xs leading-5 font-medium text-success">
          <span aria-hidden className="size-2 rounded-full bg-success" />
          All systems operational
        </span>
        <span className="text-xs leading-5 text-sidebar-muted">Last sync today, 09:41 AM</span>
      </div>

      <NavLink
        className="-my-3 flex h-9 items-center gap-3 rounded-lg px-3 text-sm leading-6 font-medium text-sidebar-foreground outline-none hover:bg-sidebar-active focus-visible:ring-2 focus-visible:ring-accent"
        to="/settings"
        onClick={onNavigate}
      >
        <Sliders aria-hidden className="size-4 text-sidebar-muted" />
        Settings &amp; support
      </NavLink>

      <div className="flex items-center gap-2.5">
        <Avatar className="size-9 bg-[#2a2a2a]">
          <Avatar.Fallback className="bg-[#2a2a2a] text-xs font-medium text-sidebar-foreground">
            {currentUser.initials}
          </Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm leading-6 font-medium">{currentUser.name}</span>
          <span className="text-xs leading-5 text-sidebar-muted">{currentUser.role}</span>
        </div>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <NavLink className="flex items-center gap-2.5 px-2 outline-none" to="/dashboard">
      <span className="flex size-7.5 items-center justify-center rounded-lg bg-accent text-xl leading-6 font-semibold text-white">
        M
      </span>
      <span className="text-[22px] leading-[27px] font-semibold text-sidebar-foreground">meridian</span>
    </NavLink>
  );
}

interface NavSectionProps {
  label: string;
  items: NavItem[];
  compact?: boolean;
  onNavigate?: () => void;
}

function NavSection({ label, items, compact = false, onNavigate }: NavSectionProps) {
  return (
    <nav aria-label={label} className={compact ? "flex flex-col gap-2" : "flex flex-col gap-1.5"}>
      <span className="text-xs leading-5 font-medium text-sidebar-muted uppercase">{label}</span>
      {items.map(({ icon: Icon, label: itemLabel, to }) => (
        <NavLink
          key={to}
          className={({ isActive }) =>
            [
              "group flex items-center gap-3 whitespace-nowrap rounded-lg border px-3 text-sm leading-6 font-medium text-sidebar-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent",
              compact ? "h-9" : "h-10",
              isActive
                ? "border-accent bg-sidebar-active"
                : "border-transparent hover:bg-sidebar-active",
            ].join(" ")
          }
          to={to}
          onClick={onNavigate}
        >
          <Icon
            aria-hidden
            className="size-4 text-sidebar-muted group-aria-[current=page]:text-sidebar-foreground"
          />
          {itemLabel}
        </NavLink>
      ))}
    </nav>
  );
}
