import type { ReactNode } from "react";

import { RouterProvider } from "@heroui/react";
import { useHref, useNavigate } from "react-router";

/** Lets HeroUI (React Aria) links and buttons with `href` navigate client-side. */
export function RouterBridge({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <RouterProvider navigate={(to) => navigate(to)} useHref={useHref}>
      {children}
    </RouterProvider>
  );
}
