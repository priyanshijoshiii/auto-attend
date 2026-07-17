import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { SUBJECTS } from "./report";

export const Route = createFileRoute("/report/$subjectId")({
  head: () => ({ meta: [{ title: "Subject — Auto-Attend" }] }),
  component: SubjectDetail,
});

// Deterministic mock attendance for a month
type DayStatus = "attended" | "missed" | null;
function buildMonthAttendance(year: number, month: number, seed: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: DayStatus[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const weekday = new Date(year, month, d).getDay();
    // classes M/W/F only for demo
    const hasClass = weekday === 1 || weekday === 3 || weekday === 5;
    if (!hasClass) {
      days.push(null);
    } else {
      const hash = (d * 9301 + seed * 49297) % 233280;
      days.push(hash / 233280 < 0.78 ? "attended" : "missed");
    }
  }
  return days;
}

function SubjectDetail() {
  const { subjectId } = Route.useParams();
  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0];

  const now = new Date();
  const [viewMonth, setViewMonth] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const attendance = useMemo(
    () => buildMonthAttendance(viewMonth.y, viewMonth.m, subject.name.length),
    [viewMonth, subject.name]
  );

  const attended = attendance.filter((d) => d === "attended").length;
  const missed = attendance.filter((d) => d === "missed").length;
  const totalHeld = attended + missed;
  const percentage = totalHeld ? Math.round((attended / totalHeld) * 100) : 0;
  // required to keep 75%: x = (0.75*T - attended)/0.25 => canMiss = floor(attended/0.75) - totalHeld
  const canMissMore = Math.max(0, Math.floor(attended / 0.75) - totalHeld);

  const [holidays, setHolidays] = useState<string[]>([]);
  const addHoliday = () => {
    const label = `Day ${holidays.length + 1}`;
    setHolidays((prev) => [...prev, label]);
  };
  const removeHoliday = (i: number) =>
    setHolidays((prev) => prev.filter((_, idx) => idx !== i));

  // Assume each holiday would have been a class; recalc
  const projectedHeld = totalHeld + holidays.length;
  const projectedPct = projectedHeld ? Math.round((attended / projectedHeld) * 100) : 0;
  const projectedCanMiss = Math.max(0, Math.floor(attended / 0.75) - projectedHeld);
  const belowThreshold = projectedPct < 75;

  const monthName = new Date(viewMonth.y, viewMonth.m, 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const firstWeekday = new Date(viewMonth.y, viewMonth.m, 1).getDay();
  const daysInMonth = attendance.length;
  const isToday = (d: number) =>
    d === now.getDate() && viewMonth.m === now.getMonth() && viewMonth.y === now.getFullYear();

  const shiftMonth = (delta: number) => {
    setViewMonth((v) => {
      const nm = v.m + delta;
      const y = v.y + Math.floor(nm / 12);
      const m = ((nm % 12) + 12) % 12;
      return { y, m };
    });
  };

  return (
    <AppShell>
      <div className="flex items-center gap-3 -ml-2">
        <Link
          to="/report"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-card"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
      </div>

      <header className="mt-4 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
        <h1 className="text-2xl font-extrabold text-foreground">{subject.name}</h1>
        <span className="px-2 py-0.5 rounded-full bg-[#EFEFEC] text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {subject.type}
        </span>
      </header>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <StatChip label="Attended" value={`${attended}`} sub="classes" />
        <StatChip label="Attendance" value={`${percentage}%`} sub="" />
        <StatChip label="Can miss" value={`${canMissMore}`} sub="more" />
      </div>

      {/* Calendar */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => shiftMonth(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-card"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <p className="font-bold text-foreground">{monthName}</p>
          <button
            onClick={() => shiftMonth(1)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-card"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={"pad" + i} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const status = attendance[i];
            const today = isToday(d);
            const bg =
              status === "attended"
                ? "bg-[#DCFCE7] text-[#166534]"
                : status === "missed"
                ? "bg-[#FFE5E5] text-[#B01B1B]"
                : "text-foreground";
            const ring = today ? "ring-2 ring-primary" : "";
            return (
              <div
                key={d}
                className={`aspect-square flex items-center justify-center rounded-full text-xs font-semibold ${bg} ${ring}`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </section>

      {/* Holiday calculator */}
      <section className="mt-10">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Holiday Calculator
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add upcoming holidays to see how they affect your attendance
        </p>

        <div className="mt-4 flex flex-wrap gap-2 items-center">
          {holidays.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FBF5D0] text-[#8A7420] text-xs font-semibold"
            >
              {h}
              <button
                onClick={() => removeHoliday(i)}
                aria-label={`Remove ${h}`}
                className="hover:opacity-70"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={addHoliday}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/40"
          >
            <Plus size={14} />
            Add date
          </button>
        </div>

        <div
          className={
            "mt-5 p-4 rounded-2xl " +
            (belowThreshold ? "bg-[#FFF5F5]" : "bg-[#EEF3FC]")
          }
        >
          <p
            className={
              "font-bold " + (belowThreshold ? "text-[#FF6B6B]" : "text-foreground")
            }
          >
            After these holidays you can miss {projectedCanMiss} more{" "}
            {projectedCanMiss === 1 ? "class" : "classes"}
          </p>
          {belowThreshold && (
            <p className="mt-1 text-xs text-[#FF6B6B]">
              Warning: attendance would drop to {projectedPct}% (below 75%)
            </p>
          )}
        </div>
      </section>
    </AppShell>
  );
}

function StatChip({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-[#EEF3FC] px-3 py-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-primary/70">
        {label}
      </p>
      <p className="mt-1 text-lg font-extrabold text-foreground leading-none">{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
