import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-lg border border-charcoal/10 bg-white p-6 shadow-soft", className)}>{children}</div>;
}
