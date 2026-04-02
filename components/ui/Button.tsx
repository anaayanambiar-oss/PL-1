import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#FF8200] text-white shadow-[0_8px_30px_rgba(255,130,0,0.35)] hover:shadow-[0_10px_36px_rgba(255,130,0,0.45)] hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-[#0252C9] text-white shadow-[0_4px_16px_rgba(2,82,201,0.3)] hover:shadow-[0_6px_22px_rgba(2,82,201,0.4)] hover:-translate-y-px",
  outline:
    "bg-transparent border border-black/10 text-[#0F1023] hover:border-[#0252C9] hover:text-[#0252C9]",
  ghost:
    "bg-transparent text-[#0F1023] hover:bg-black/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
          "transition-all duration-200 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-[#0252C9] focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ]
          .join(" ")
          .trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
