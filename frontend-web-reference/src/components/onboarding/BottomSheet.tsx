import type { ReactNode } from "react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={
        "fixed inset-0 z-50 transition-opacity " +
        (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
      }
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40"
      />
      <div
        className={
          "absolute inset-x-0 bottom-0 mx-auto max-w-md bg-card rounded-t-[28px] px-6 pt-3 pb-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.25)] transition-transform duration-300 " +
          (open ? "translate-y-0" : "translate-y-full")
        }
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-border mb-5" />
        <h2 className="text-xl font-bold text-foreground mb-5">{title}</h2>
        {children}
      </div>
    </div>
  );
}
