import { Bars, Bell } from "@gravity-ui/icons";
import { Avatar, Breadcrumbs, Button, Drawer, SearchField } from "@heroui/react";
import { useState } from "react";
import { useLocation } from "react-router";

import { currentUser, platformNav, teamNav } from "../data/navigation";
import { Sidebar } from "./Sidebar";

function useCurrentCrumb() {
  const { pathname } = useLocation();
  const match = [...platformNav, ...teamNav].find((item) => pathname.startsWith(item.to));

  return match?.crumb ?? "Not found";
}

export function AppBar() {
  const crumb = useCurrentCrumb();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-19 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <Drawer isOpen={isMenuOpen} onOpenChange={setMenuOpen}>
          <Button
            isIconOnly
            aria-label="Open navigation"
            className="lg:hidden"
            size="sm"
            variant="ghost"
          >
            <Bars className="size-4" />
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content className="w-64 max-w-[80vw]" placement="left">
              <Drawer.Dialog aria-label="Navigation" className="h-full bg-sidebar p-0">
                <Sidebar onNavigate={() => setMenuOpen(false)} />
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        <Breadcrumbs className="min-w-0 overflow-hidden text-sm font-medium whitespace-nowrap">
          <Breadcrumbs.Item className="max-sm:hidden" href="/dashboard">Meridian</Breadcrumbs.Item>
          <Breadcrumbs.Item>{crumb}</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <SearchField aria-label="Search" className="hidden md:flex" name="search">
          <SearchField.Group className="w-64 xl:w-80">
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search clients, accounts, tasks..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <Button isIconOnly aria-label="Notifications" className="rounded-full" variant="ghost">
          <Bell className="size-4" />
        </Button>

        <span aria-hidden className="hidden h-6 w-px bg-border sm:block" />

        <Avatar aria-label={currentUser.name} className="size-9">
          <Avatar.Fallback className="text-xs font-medium">{currentUser.initials}</Avatar.Fallback>
        </Avatar>
      </div>
    </header>
  );
}
