import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Auto-Attend" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-extrabold text-foreground">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Coming soon.</p>
    </AppShell>
  );
}
