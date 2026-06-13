import type { ReactNode } from "react";

export function OnboardingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col px-6 pt-6 pb-6 min-h-screen">
        {children}
      </div>
    </div>
  );
}
