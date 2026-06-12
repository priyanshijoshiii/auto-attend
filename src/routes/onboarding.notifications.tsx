import { createFileRoute } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { PillButton } from "@/components/auth/PillButton";

export const Route = createFileRoute("/onboarding/notifications")({
  head: () => ({ meta: [{ title: "Allow notifications — Auto-Attend" }] }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  return (
    <OnboardingShell>
      <OnboardingHeader step={4} showBack={false} />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#EEF3FC]" />
          <div className="absolute inset-6 rounded-[44px] bg-card border border-border shadow-sm flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#FBF5D0] flex items-center justify-center">
              <BellRing size={32} className="text-primary" />
            </div>
          </div>
          <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#F0D44A]" />
          <span className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-primary/50" />
        </div>

        <h1 className="mt-8 text-3xl font-extrabold text-foreground leading-tight px-2">
          Just for the first few days
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed px-2">
          We'll nudge you to confirm your location while Auto-Attend learns your classrooms.
          Once it knows where you study, we'll go quiet. No spam, ever.
        </p>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <PillButton variant="primary" className="w-full">
          Allow Notifications
        </PillButton>
        <button className="text-sm font-semibold text-muted-foreground hover:text-foreground py-1">
          Skip for now
        </button>
        <p className="text-xs text-muted-foreground text-center px-6 -mt-1">
          Auto-Attend may take longer to learn your schedule
        </p>
      </div>
    </OnboardingShell>
  );
}
