import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import illustration from "@/assets/welcome-illustration.png";
import { AuthShell } from "@/components/auth/AuthShell";
import { PillButton } from "@/components/auth/PillButton";
import { GoogleIcon, AppleIcon } from "@/components/auth/BrandIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auto-Attend — Your attendance, on autopilot" },
      { name: "description", content: "Smart student attendance tracker that checks you in automatically." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <AuthShell>
      <div className="flex-1 flex flex-col items-center justify-center text-center pt-4">
        <img
          src={illustration}
          alt="Student with a location pin and calendar"
          width={1024}
          height={1024}
          className="w-56 h-56 object-contain"
        />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground">
          Auto-Attend
        </h1>
        <p className="mt-3 text-base font-medium text-muted-foreground">
          Your attendance, on autopilot
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <PillButton variant="outline" icon={<GoogleIcon />}>
          Continue with Google
        </PillButton>
        <PillButton variant="outline" icon={<AppleIcon />}>
          Continue with Apple
        </PillButton>
        <Link to="/signup" className="contents">
          <PillButton variant="primary" icon={<Mail size={20} />}>
            Continue with Email
          </PillButton>
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground px-6 leading-relaxed">
        By continuing you agree to our{" "}
        <a href="#" className="underline">Terms</a> &{" "}
        <a href="#" className="underline">Privacy Policy</a>
      </p>
    </AuthShell>
  );
}
