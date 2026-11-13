import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-2xl font-semibold">This section isn&apos;t available yet</h1>
      <p className="text-sm text-muted">Head back to the dashboard to continue.</p>
      <Button className="mt-2" onPress={() => navigate("/dashboard")}>
        Go to dashboard
      </Button>
    </div>
  );
}
