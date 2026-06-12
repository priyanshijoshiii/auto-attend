export type ClassType = "Lecture" | "Lab" | "Tutorial";
const TYPES: ClassType[] = ["Lecture", "Lab", "Tutorial"];

export function TypeToggle({
  value,
  onChange,
}: {
  value: ClassType;
  onChange: (t: ClassType) => void;
}) {
  return (
    <div className="inline-flex w-full p-1 bg-muted rounded-full">
      {TYPES.map((t) => {
        const active = value === t;
        return (
          <button
            type="button"
            key={t}
            onClick={() => onChange(t)}
            className={
              "flex-1 h-10 rounded-full text-sm font-semibold transition " +
              (active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground")
            }
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
