import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PillInput, PillPasswordInput } from "@/components/auth/PillInput";
import { PillButton } from "@/components/auth/PillButton";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Auto-Attend" },
      { name: "description", content: "Create your Auto-Attend account to start tracking attendance automatically." },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const router = useRouter();
  const navigate = useNavigate();
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
          Create account
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Join Auto-Attend in under a minute.
        </p>
      </div>

      <form
        className="mt-8 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/onboarding/college" });
        }}
      >
        <PillInput type="text" placeholder="Full name" autoComplete="name" />
        <PillInput type="email" placeholder="Email" autoComplete="email" />
        <PillPasswordInput placeholder="Password" autoComplete="new-password" />

        <PillButton type="submit" className="mt-4">
          Sign Up
        </PillButton>
      </form>

      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
