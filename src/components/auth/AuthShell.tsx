import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col px-6 pt-10 pb-8">
        {children}
      </div>
    </div>
  );
}
