import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CtaBandProps = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({ heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CtaBandProps) {
  return (
    <section className="bg-brand-green py-14 text-white sm:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-lg leading-8 text-white/85">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref} variant="secondary">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button className="border-white bg-transparent text-white hover:bg-white hover:text-brand-green" href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
