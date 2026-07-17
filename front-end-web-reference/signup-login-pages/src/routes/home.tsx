import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

type Status = "present" | "absent" | "cancelled" | "holiday" | "upcoming" | "ongoing";

type ClassItem = {
  id: string;
  subject: string;
  time: string;
  room: string;
  status: Status;
};

const TODAY: ClassItem[] = [
  { id: "1", subject: "Discrete Math", time: "8:30 AM – 9:30 AM", room: "Room B-204", status: "present" },
  { id: "2", subject: "Data Structures", time: "9:30 AM – 10:30 AM", room: "Room A-101", status: "ongoing" },
  { id: "3", subject: "Physics Lab", time: "11:00 AM – 1:00 PM", room: "Lab 3, Block C", status: "upcoming" },
  { id: "4", subject: "English Literature", time: "2:00 PM – 3:00 PM", room: "Room D-12", status: "absent" },
  { id: "5", subject: "Sports Hour", time: "4:00 PM – 5:00 PM", room: "Ground", status: "holiday" },
];

const GREETING = "Good morning, Aryan";
const TODAY_DATE = "Friday, 13 June";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — Auto-Attend" }] }),
  component: HomeScreen,
});

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string }> = {
    present: { label: "Present", className: "bg-[#EEF3FC] text-primary" },
    absent: { label: "Absent", className: "bg-[#FFE5E5] text-[#FF6B6B]" },
    cancelled: { label: "Cancelled", className: "bg-[#EFEFEC] text-muted-foreground" },
    holiday: { label: "Holiday", className: "bg-[#FBF5D0] text-[#8A7420]" },
    upcoming: { label: "Upcoming", className: "bg-[#EFEFEC] text-muted-foreground" },
    ongoing: { label: "Ongoing", className: "bg-primary text-primary-foreground" },
  };
  const { label, className } = map[status];
  return (
    <span className={"px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap " + className}>
      {label}
    </span>
  );
}

function ClassCard({ item }: { item: ClassItem }) {
  const bg =
    item.status === "ongoing"
      ? "bg-[#EEF3FC] border-l-4 border-l-primary"
      : item.status === "present"
      ? "bg-[#F0FFF4]"
      : item.status === "absent"
      ? "bg-[#FFF5F5]"
      : "bg-card";

  return (
    <div
      className={
        "rounded-2xl p-4 shadow-[0_2px_10px_rgba(44,44,42,0.04)] flex items-center justify-between gap-3 " +
        bg
      }
    >
      <div className="min-w-0">
        <p className="font-bold text-foreground truncate">{item.subject}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.room}</p>
      </div>
      <StatusBadge status={item.status} />
    </div>
  );
}

function HomeScreen() {
  return (
    <AppShell>
      <header>
        <h1 className="text-3xl font-extrabold text-foreground leading-tight">{GREETING}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{TODAY_DATE}</p>
      </header>

      <section className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Today's Classes
        </p>

        {TODAY.length === 0 ? (
          <div className="rounded-2xl bg-card p-8 text-center shadow-[0_2px_10px_rgba(44,44,42,0.04)]">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#FBF5D0] flex items-center justify-center text-3xl">
              ☕
            </div>
            <p className="mt-4 font-semibold text-foreground">No classes today</p>
            <p className="mt-1 text-sm text-muted-foreground">Enjoy your day!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {TODAY.map((c) => (
              <ClassCard key={c.id} item={c} />
            ))}
          </div>
        )}
      </section>

      <div className="mt-6 text-center">
        <Link to="/report" className="text-sm font-semibold text-primary">
          View full report →
        </Link>
      </div>
    </AppShell>
  );
}
