import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { PillButton } from "@/components/auth/PillButton";
import { BottomSheet } from "@/components/onboarding/BottomSheet";
import { TypeToggle, type ClassType } from "@/components/onboarding/TypeToggle";

export const Route = createFileRoute("/onboarding/subjects")({
  head: () => ({ meta: [{ title: "Add subjects — Auto-Attend" }] }),
  component: SubjectsScreen,
});

const COLORS = [
  "#5B8FD4", "#F0D44A", "#FF6B6B", "#7BC47F",
  "#B57EDC", "#F39C6B", "#5BC0BE", "#E66FA5",
];

interface Subject {
  id: string;
  name: string;
  color: string;
  type: ClassType;
}

const SEED: Subject[] = [
  { id: "1", name: "Data Structures", color: "#5B8FD4", type: "Lecture" },
  { id: "2", name: "Operating Systems Lab", color: "#7BC47F", type: "Lab" },
  { id: "3", name: "Discrete Mathematics", color: "#F0D44A", type: "Tutorial" },
];

function SubjectsScreen() {
  const [subjects, setSubjects] = useState<Subject[]>(SEED);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [type, setType] = useState<ClassType>("Lecture");
  const navigate = useNavigate();

  const save = () => {
    if (!name.trim()) return;
    setSubjects((s) => [
      ...s,
      { id: crypto.randomUUID(), name: name.trim(), color, type },
    ]);
    setName("");
    setColor(COLORS[0]);
    setType("Lecture");
    setOpen(false);
  };

  return (
    <OnboardingShell>
      <OnboardingHeader step={2} backTo="/onboarding/college" />

      <h1 className="text-3xl font-extrabold text-foreground leading-tight">
        What are you studying?
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Add all your subjects for this semester
      </p>

      <div className="mt-7 flex-1 flex flex-col gap-3 overflow-y-auto">
        {subjects.map((s) => (
          <div
            key={s.id}
            className="bg-card rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-border"
          >
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <div className="flex-1 font-semibold text-foreground truncate">
              {s.name}
            </div>
            <span className="px-3 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              {s.type}
            </span>
            <button className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
              <Pencil size={15} />
            </button>
            <button
              onClick={() => setSubjects((cur) => cur.filter((x) => x.id !== s.id))}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}

        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl border-2 border-dashed border-border p-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary transition"
        >
          <Plus size={18} />
          <span className="font-semibold">Add a subject</span>
        </button>
      </div>

      <PillButton
        variant="primary"
        className="mt-6"
        onClick={() => navigate({ to: "/onboarding/timetable" })}
      >
        Done, build my timetable →
      </PillButton>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="New Subject">
        <div className="flex flex-col gap-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Subject name"
            className="w-full h-14 px-6 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Color
            </div>
            <div className="flex gap-3 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                  className={
                    "w-9 h-9 rounded-full transition " +
                    (color === c
                      ? "ring-2 ring-offset-2 ring-foreground/40 scale-110"
                      : "")
                  }
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Type
            </div>
            <TypeToggle value={type} onChange={setType} />
          </div>

          <PillButton variant="primary" onClick={save}>
            Save
          </PillButton>
        </div>
      </BottomSheet>
    </OnboardingShell>
  );
}
