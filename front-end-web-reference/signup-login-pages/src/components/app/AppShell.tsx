import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col px-6 pt-10 pb-32 relative">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
