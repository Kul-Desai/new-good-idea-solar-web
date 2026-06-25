import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "blue" | "green";
  id?: string;
};

const tones = {
  white: "bg-white text-charcoal",
  mist: "bg-mist text-charcoal",
  blue: "bg-brand-blue text-white",
  green: "bg-brand-green text-white",
};

export function Section({ children, className, tone = "white", id }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)} id={id}>
      {children}
    </section>
  );
}
