import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    "bg-brand-blue text-white shadow-soft hover:bg-brand-green border border-brand-blue hover:border-brand-green",
  secondary:
    "border border-brand-blue bg-white text-brand-blue hover:border-brand-green hover:text-brand-green",
  ghost: "text-brand-blue hover:bg-mist",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-4 text-lg",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-md font-heading font-medium leading-none transition-colors focus-visible:outline-focus",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link className={buttonClassName} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} type={type} {...props}>
      {children}
    </button>
  );
}
