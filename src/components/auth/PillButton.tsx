import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

export function PillButton({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: PillButtonProps) {
  const base =
    "w-full h-14 rounded-full font-semibold text-base inline-flex items-center justify-center gap-3 transition active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_8px_20px_-8px_oklch(0.65_0.09_252_/_0.5)]"
      : "bg-card text-foreground border border-border hover:bg-muted";

  return (
    <button {...props} className={`${base} ${styles} ${className ?? ""}`}>
      {icon && <span className="inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
