import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "./layout/AppLayout";
import { ClientWorkspacePage } from "./pages/ClientWorkspacePage";
import { FinancialOverviewPage } from "./pages/FinancialOverviewPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route element={<FinancialOverviewPage />} path="dashboard" />
        <Route element={<ClientWorkspacePage />} path="workspace" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}
