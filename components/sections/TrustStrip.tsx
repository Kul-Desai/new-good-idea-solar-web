import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export function TrustStrip() {
  return (
    <section className="border-y border-charcoal/10 bg-white py-8">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Built by Farmers for Farmers
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Image alt="Service-Disabled Veteran-Owned Small Business badge" className="h-12 w-auto" height={1513} src="/badges/SDVOSB.png" width={1210} />
              <Image alt="TenneSEIA member badge" className="h-10 w-auto" height={396} src="/badges/TenneSEIA.jpg" width={1195} />
              <span className="rounded-md border border-charcoal/10 px-3 py-2 text-sm text-charcoal/70">Bethesda Green TODO</span>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {siteConfig.trustSignals.slice(0, 4).map((signal) => (
              <li className="flex gap-3 text-charcoal/80" key={signal}>
                <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-green" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
