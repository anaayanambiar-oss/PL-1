import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-coral text-white shadow-coral hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-brand-blue text-white shadow-blue hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
  ghost: "bg-transparent text-brand-navy hover:bg-brand-navy/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className = ""
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-bold",
    "transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .join(" ")
    .trim();
}

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: never };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Renders an anchor when `href` is given so CTAs are real links — keyboard
// focusable, middle-clickable, and crawlable — instead of buttons that push
// window.location in an onClick handler.
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = buttonClasses(variant, size, className);

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
