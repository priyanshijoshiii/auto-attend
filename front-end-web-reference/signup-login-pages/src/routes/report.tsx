import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";

type Subject = {
  id: string;
  name: string;
  type: "Lecture" | "Lab" | "Tutorial";
  color: string;
  percentage: number;
};

export const SUBJECTS: Subject[] = [
  { id: "ds", name: "Data Structures", type: "Lecture", color: "#5B8FD4", percentage: 82 },
  { id: "dm", name: "Discrete Math", type: "Lecture", color: "#F0D44A", percentage: 76 },
  { id: "phy", name: "Physics", type: "Lab", color: "#FF6B6B", percentage: 68 },
  { id: "eng", name: "English Literature", type: "Tutorial", color: "#22C55E", percentage: 91 },
  { id: "os", name: "Operating Systems", type: "Lecture", color: "#A78BFA", percentage: 73 },
];

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report — Auto-Attend" }] }),
  component: ReportScreen,
});

function ReportScreen() {
  return (
    <AppShell>
      <header>
        <h1 className="text-3xl font-extrabold text-foreground">Report</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap a subject to see attendance details
        </p>
      </header>

      <section className="mt-8 flex flex-col gap-3">
        {SUBJECTS.map((s) => {
          const good = s.percentage >= 75;
          return (
            <Link
              key={s.id}
              to="/report/$subjectId"
              params={{ subjectId: s.id }}
              className="rounded-2xl bg-card p-4 shadow-[0_2px_10px_rgba(44,44,42,0.04)] flex items-center gap-3 active:scale-[0.99] transition-transform"
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground truncate">{s.name}</p>
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#EFEFEC] text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.type}
                </span>
              </div>
              <p
                className="text-2xl font-extrabold tabular-nums"
                style={{ color: good ? "#22C55E" : "#FF6B6B" }}
              >
                {s.percentage}%
              </p>
              <ChevronRight size={18} className="text-muted-foreground shrink-0" />
            </Link>
          );
        })}
      </section>
    </AppShell>
  );
}
