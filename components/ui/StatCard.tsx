import { cn } from "@/lib/cn";

type StatCardProps = {
  value: string;
  label: string;
  note?: string;
  featured?: boolean;
};

export function StatCard({ value, label, note, featured = false }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6",
        featured
          ? "border-brand-green bg-brand-green text-white"
          : "border-charcoal/10 bg-white text-charcoal shadow-soft",
      )}
    >
      <p className={cn("font-heading text-3xl font-bold", featured ? "text-white" : "text-brand-blue")}>{value}</p>
      <p className="mt-2 font-heading text-base font-medium">{label}</p>
      {note ? <p className={cn("mt-3 text-sm", featured ? "text-white/80" : "text-charcoal/70")}>{note}</p> : null}
    </div>
  );
}
