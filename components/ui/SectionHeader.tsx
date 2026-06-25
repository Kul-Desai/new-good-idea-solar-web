import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeader({ eyebrow, heading, body, align = "left", inverse = false }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 inline-flex rounded-full px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em]",
            inverse ? "bg-white/15 text-white" : "bg-mist text-brand-blue",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("font-heading text-3xl font-semibold leading-tight sm:text-4xl", inverse ? "text-white" : "text-ink")}>
        {heading}
      </h2>
      {body ? <p className={cn("mt-5 text-lg leading-8", inverse ? "text-white/85" : "text-charcoal/80")}>{body}</p> : null}
    </div>
  );
}
