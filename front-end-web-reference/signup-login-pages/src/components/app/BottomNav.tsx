import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, Calendar, Settings } from "lucide-react";
import type { ComponentType } from "react";

type Tab = {
  to: "/home" | "/report" | "/schedule" | "/settings";
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const TABS: Tab[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/report", label: "Report", icon: BarChart3 },
  { to: "/schedule", label: "Schedule", icon: Calendar },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-border/50">
      <div className="flex items-center justify-around px-2 pt-3 pb-6">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 px-3 py-1 flex-1"
            >
              <Icon
                size={22}
                className={active ? "text-primary" : "text-muted-foreground"}
              />
              <span
                className={
                  "text-[11px] font-semibold " +
                  (active ? "text-primary" : "text-muted-foreground")
                }
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
