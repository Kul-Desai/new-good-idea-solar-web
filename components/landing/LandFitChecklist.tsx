import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { landingContent } from "@/content/landing";

export function LandFitChecklist() {
  return (
    <Card className="bg-white">
      <h3 className="font-heading text-2xl font-medium text-ink">Is your farm a good fit?</h3>
      <p className="mt-3 leading-7 text-charcoal/75">
        This checklist is a starting point, not a calculator. There is no cost to evaluate your property.
      </p>
      <ol className="mt-8 grid gap-4">
        {landingContent.checklist.map((item, index) => (
          <li className="flex gap-4" key={item}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
              {index + 1}
            </span>
            <span className="leading-7 text-charcoal/80">{item}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex gap-3 rounded-lg bg-mist p-4 text-charcoal/80">
        <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-green" />
        <p>No estimates, no pressure, and no published financial projections.</p>
      </div>
    </Card>
  );
}
