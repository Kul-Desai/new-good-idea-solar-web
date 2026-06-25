import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ProjectsMap() {
  return (
    <Card className="bg-mist">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
            Where We Operate
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-ink">Active in Maryland and Tennessee</h2>
          <p className="mt-4 leading-7 text-charcoal/75">
            Exact project coordinates are not published. This static map view shows the current state-level footprint while
            preserving project privacy.
          </p>
        </div>
        <div className="relative min-h-72 rounded-lg border border-charcoal/10 bg-white p-6">
          <div className="absolute left-[26%] top-[34%] flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-soft">
            <MapPin aria-hidden="true" className="size-4" /> Maryland
          </div>
          <div className="absolute bottom-[24%] right-[20%] flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-soft">
            <MapPin aria-hidden="true" className="size-4" /> Tennessee
          </div>
          <div className="absolute inset-x-8 top-1/2 h-px bg-charcoal/10" />
          <div className="absolute inset-y-8 left-1/2 w-px bg-charcoal/10" />
        </div>
      </div>
    </Card>
  );
}
