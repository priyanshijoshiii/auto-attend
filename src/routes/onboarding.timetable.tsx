import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Mic, CalendarX2, Sparkles } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { PillButton } from "@/components/auth/PillButton";
import { BottomSheet } from "@/components/onboarding/BottomSheet";
import { TypeToggle, type ClassType } from "@/components/onboarding/TypeToggle";

export const Route = createFileRoute("/onboarding/timetable")({
  head: () => ({ meta: [{ title: "Build your timetable — Auto-Attend" }] }),
  component: TimetableScreen,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SUBJECTS = [
  { id: "1", name: "Data Structures", color: "#5B8FD4", type: "Lecture" as ClassType },
  { id: "2", name: "Operating Systems Lab", color: "#7BC47F", type: "Lab" as ClassType },
  { id: "3", name: "Discrete Mathematics", color: "#F0D44A", type: "Tutorial" as ClassType },
];

interface ClassSlot {
  id: string;
  subjectId: string;
  type: ClassType;
  start: string;
  end: string;
  room: string;
  ai?: boolean;
}

const SEED: Record<string, ClassSlot[]> = {
  Mon: [
    { id: "a", subjectId: "1", type: "Lecture", start: "09:30", end: "10:30", room: "Block A, 204" },
    { id: "b", subjectId: "3", type: "Tutorial", start: "11:00", end: "12:00", room: "Block B, 110" },
  ],
  Wed: [
    { id: "c", subjectId: "2", type: "Lab", start: "14:00", end: "16:00", room: "Block A, Lab 3" },
  ],
};

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function TimetableScreen() {
  const [day, setDay] = useState("Mon");
  const [schedule, setSchedule] = useState<Record<string, ClassSlot[]>>(SEED);
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();

  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id);
  const [type, setType] = useState<ClassType>(SUBJECTS[0].type);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [room, setRoom] = useState("");

  const todays = schedule[day] ?? [];

  const save = () => {
    setSchedule((s) => ({
      ...s,
      [day]: [
        ...(s[day] ?? []),
        { id: crypto.randomUUID(), subjectId, type, start, end, room: room || "TBD" },
      ],
    }));
    setRoom("");
    setOpen(false);
  };

  const voice = () => {
    setListening(true);
    setTimeout(() => {
      setSchedule((s) => ({
        ...s,
        [day]: [
          ...(s[day] ?? []),
          { id: crypto.randomUUID(), subjectId: "1", type: "Lecture", start: "13:00", end: "14:00", room: "Block C, 301", ai: true },
          { id: crypto.randomUUID(), subjectId: "3", type: "Tutorial", start: "15:30", end: "16:30", room: "Block B, 205", ai: true },
        ],
      }));
      setListening(false);
    }, 2200);
  };

  return (
    <OnboardingShell>
      <OnboardingHeader step={3} backTo="/onboarding/subjects" />

      <h1 className="text-3xl font-extrabold text-foreground leading-tight">
        Build your timetable
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Add classes for each day. You can always edit later.
      </p>

      <div className="mt-6 -mx-6 px-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {DAYS.map((d) => {
            const active = d === day;
            const has = (schedule[d]?.length ?? 0) > 0;
            return (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={
                  "relative px-5 h-10 rounded-full text-sm font-semibold transition " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted")
                }
              >
                {d}
                {has && !active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F0D44A]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex-1 flex flex-col gap-3 overflow-y-auto">
        {todays.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-3">
              <CalendarX2 size={32} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No classes on this day</p>
          </div>
        ) : (
          todays.map((c) => {
            const subj = SUBJECTS.find((s) => s.id === c.subjectId)!;
            return (
              <div
                key={c.id}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border relative"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: subj.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-bold text-foreground">{subj.name}</div>
                      {c.ai && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FBF5D0] text-[10px] uppercase tracking-wider font-bold text-[#8a7416]">
                          <Sparkles size={10} /> AI filled
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {fmt(c.start)} – {fmt(c.end)}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        {c.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{c.room}</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
                    <Pencil size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <button
          onClick={voice}
          disabled={listening}
          className="w-full h-12 rounded-full bg-[#F0D44A] text-foreground font-semibold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition disabled:opacity-80"
        >
          {listening ? (
            <>
              <span className="flex items-end gap-0.5 h-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-primary animate-pulse"
                    style={{
                      height: `${30 + (i % 3) * 20}%`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </span>
              Listening… speak your schedule
            </>
          ) : (
            <>
              <Mic size={18} />
              Add with voice
            </>
          )}
        </button>

        <button
          onClick={() => setOpen(true)}
          className="w-full h-12 rounded-full bg-[#EEF3FC] text-primary font-semibold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <Plus size={18} />
          Add class
        </button>

        <PillButton
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/notifications" })}
        >
          All done →
        </PillButton>
      </div>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="Add Class">
        <div className="flex flex-col gap-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Subject
            </div>
            <div className="relative">
              <select
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  const s = SUBJECTS.find((x) => x.id === e.target.value);
                  if (s) setType(s.type);
                }}
                className="w-full h-14 px-6 rounded-full bg-background border border-border text-foreground appearance-none outline-none focus:border-primary"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    ● {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Type
            </div>
            <TypeToggle value={type} onChange={setType} />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Start
              </div>
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full h-14 px-5 rounded-full bg-background border border-border text-foreground outline-none focus:border-primary"
              />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                End
              </div>
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full h-14 px-5 rounded-full bg-background border border-border text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Room
            </div>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Block A, Lab 3"
              className="w-full h-14 px-6 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
          </div>

          <PillButton variant="primary" onClick={save}>
            Save
          </PillButton>
        </div>
      </BottomSheet>
    </OnboardingShell>
  );
}
