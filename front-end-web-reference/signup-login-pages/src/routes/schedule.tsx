import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Schedule — Auto-Attend" }] }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-extrabold text-foreground">Schedule</h1>
      <p className="mt-2 text-sm text-muted-foreground">Coming soon.</p>
    </AppShell>
  );
}
