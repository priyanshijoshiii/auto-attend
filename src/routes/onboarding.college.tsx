import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Check } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { PillButton } from "@/components/auth/PillButton";

export const Route = createFileRoute("/onboarding/college")({
  head: () => ({ meta: [{ title: "Where do you study? — Auto-Attend" }] }),
  component: CollegeScreen,
});

interface College {
  name: string;
  city: string;
}
const COLLEGES: College[] = [
  { name: "Indian Institute of Technology, Bombay", city: "Mumbai, Maharashtra" },
  { name: "Indian Institute of Technology, Delhi", city: "New Delhi, Delhi" },
  { name: "Indian Institute of Science", city: "Bengaluru, Karnataka" },
  { name: "Delhi University", city: "New Delhi, Delhi" },
  { name: "Jadavpur University", city: "Kolkata, West Bengal" },
  { name: "BITS Pilani", city: "Pilani, Rajasthan" },
  { name: "NIT Trichy", city: "Tiruchirappalli, Tamil Nadu" },
  { name: "Anna University", city: "Chennai, Tamil Nadu" },
];

function CollegeScreen() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<College | null>(null);
  const navigate = useNavigate();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || selected) return [];
    return COLLEGES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query, selected]);

  return (
    <OnboardingShell>
      <OnboardingHeader step={1} backTo="/" />

      <h1 className="text-3xl font-extrabold text-foreground leading-tight">
        Where do you study?
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        We'll use this to find your classrooms automatically
      </p>

      <div className="mt-8 relative">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            placeholder="Search your college or university"
            className="w-full h-14 pl-14 pr-5 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition"
          />
        </div>

        {matches.length > 0 && (
          <div className="mt-3 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {matches.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setSelected(c);
                  setQuery(c.name);
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted text-left border-b border-border last:border-b-0"
              >
                <MapPin size={18} className="text-primary shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.city}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div className="mt-5 bg-card rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-border">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                  <Check size={12} />
                </span>
                <div className="text-base font-bold text-foreground truncate">
                  {selected.name}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-1 ml-7">
                {selected.city}
              </div>
            </div>
            <div
              className="w-16 h-16 rounded-2xl bg-[#EEF3FC] shrink-0 flex items-center justify-center relative overflow-hidden"
              aria-hidden
            >
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <rect width="64" height="64" fill="#EEF3FC" />
                <path d="M0 40 L20 30 L36 38 L64 24 L64 64 L0 64 Z" fill="#D9E4F5" />
                <path d="M0 28 L18 22 L34 28 L64 16" stroke="#5B8FD4" strokeWidth="1" fill="none" opacity="0.4" />
              </svg>
              <MapPin size={22} className="absolute text-primary fill-primary/20" />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" />

      <PillButton
        variant="primary"
        disabled={!selected}
        className="disabled:opacity-40"
        onClick={() => navigate({ to: "/onboarding/subjects" })}
      >
        That's my college →
      </PillButton>
    </OnboardingShell>
  );
}
