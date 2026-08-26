// Logo component — swap the gradient P mark for the parrot mascot here once design is finalised.
// Just update this single file: components/ui/Logo.tsx

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "default", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { mark: "w-7 h-7 text-base", wordmark: "text-lg" },
    md: { mark: "w-8 h-8 text-lg", wordmark: "text-xl" },
    lg: { mark: "w-10 h-10 text-xl", wordmark: "text-2xl" },
  };

  const inkColor = variant === "white" ? "text-white" : "text-brand-navy";
  const blueColor = variant === "white" ? "text-brand-yellow" : "text-brand-blue";

  return (
    <div className="flex items-center gap-2.5">
      {/* Gradient mark */}
      <div
        className={`${sizeMap[size].mark} rounded-xl bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center flex-shrink-0`}
      >
        <span className="font-display font-black text-white leading-none">P</span>
      </div>

      {/* Wordmark */}
      <span
        className={`font-display ${sizeMap[size].wordmark} font-extrabold leading-none tracking-tight`}
      >
        <span className={inkColor}>Politica</span>
        <span className={blueColor}>Learn</span>
      </span>
    </div>
  );
}
