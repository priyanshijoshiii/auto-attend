import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PillInput, PillPasswordInput } from "@/components/auth/PillInput";
import { PillButton } from "@/components/auth/PillButton";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Welcome back — Auto-Attend" },
      { name: "description", content: "Log in to Auto-Attend to keep your attendance on autopilot." },
    ],
  }),
  component: Login,
});

function Login() {
  const router = useRouter();
  return (
    <AuthShell>
      <button
        type="button"
        onClick={() => router.history.back()}
        aria-label="Go back"
        className="h-11 w-11 -ml-2 inline-flex items-center justify-center rounded-full text-foreground hover:bg-muted transition"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Log in to keep your streak going.
        </p>
      </div>

      <form
        className="mt-8 flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <PillInput type="email" placeholder="Email" autoComplete="email" />
        <PillPasswordInput placeholder="Password" autoComplete="current-password" />

        <div className="flex justify-end -mt-1 pr-2">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
            Forgot password?
          </a>
        </div>

        <PillButton type="submit" className="mt-4">
          Log In
        </PillButton>
      </form>

      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-semibold">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
