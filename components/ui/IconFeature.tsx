import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type IconFeatureProps = {
  icon: LucideIcon;
  title: string;
  body: string;
  compact?: boolean;
};

export function IconFeature({ icon: Icon, title, body, compact = false }: IconFeatureProps) {
  return (
    <Card className={cn(compact ? "p-5" : "p-6")}>
      <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
        <Icon aria-hidden="true" className="size-6" strokeWidth={2.2} />
      </div>
      <h3 className="font-heading text-xl font-medium text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-charcoal/75">{body}</p>
    </Card>
  );
}
