import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  step: number;
  total?: number;
  backTo?: string;
  showBack?: boolean;
}

export function OnboardingHeader({ step, total = 4, backTo = "..", showBack = true }: Props) {
  return (
    <div className="flex items-center justify-between h-12 mb-6">
      <div className="w-10 h-10 flex items-center">
        {showBack && (
          <Link
            to={backTo as any}
            className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-muted text-foreground"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={
              "h-2 rounded-full transition-all " +
              (i === step - 1
                ? "w-6 bg-primary"
                : i < step - 1
                ? "w-2 bg-primary/40"
                : "w-2 bg-border")
            }
          />
        ))}
      </div>
      <div className="w-10 h-10" />
    </div>
  );
}
