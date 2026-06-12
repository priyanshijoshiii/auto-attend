import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

interface PillInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function PillInput({ label, className, ...props }: PillInputProps) {
  return (
    <label className="block">
      {label && (
        <span className="sr-only">{label}</span>
      )}
      <input
        {...props}
        className={
          "w-full h-14 px-6 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition " +
          (className ?? "")
        }
      />
    </label>
  );
}

export function PillPasswordInput({
  label = "Password",
  placeholder = "Password",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <span className="sr-only">{label}</span>
      <input
        {...props}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full h-14 pl-6 pr-14 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
