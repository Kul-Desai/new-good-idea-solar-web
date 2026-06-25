import type { Metadata } from "next";
import Image from "next/image";
import { HandCoins, HeartHandshake, Leaf, Sprout } from "lucide-react";
import { LandFitChecklist } from "@/components/landing/LandFitChecklist";
import { PropertyAnalysisForm } from "@/components/landing/PropertyAnalysisForm";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { IconFeature } from "@/components/ui/IconFeature";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { landingFaqs } from "@/content/faqs";
import { landingContent } from "@/content/landing";
import { processSteps } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Partner Your Land",
  description:
    "Get a free property analysis from Good Idea Solar and explore whether responsible solar development could support your farm.",
  path: "/partner-your-land",
});

const benefitIcons = [HandCoins, Sprout, HeartHandshake, Leaf];

export default function PartnerYourLandPage() {
  return (
    <main id="main">
      <section className="bg-mist">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              {landingContent.hero.eyebrow}
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
              {landingContent.hero.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-charcoal/80">{landingContent.hero.body}</p>
            <Button className="mt-8" href="#property-analysis" size="lg">
              Get a Free Property Analysis
            </Button>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-lg shadow-soft">
            <Image
              alt="Productive farmland with sheep grazing in a rural landscape."
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/images/Sheep3.jpg"
            />
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader align="center" eyebrow="Why Partner" heading="A practical path to long-term farm income" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {landingContent.benefits.map((benefit, index) => (
              <IconFeature body={benefit.body} icon={benefitIcons[index]} key={benefit.title} title={benefit.title} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader eyebrow="Our Process" heading="How a property conversation becomes a responsible project" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <Card key={step.title}>
                <p className="font-heading text-sm font-semibold text-brand-blue">Step {index + 1}</p>
                <h3 className="mt-3 font-heading text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 leading-7 text-charcoal/75">{step.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="Land Fit"
            heading="A simple checklist before we walk the property"
            body="Not every farm is the right fit, and that is okay. The first conversation is about clarity."
          />
          <LandFitChecklist />
        </Container>
      </Section>

      <TrustStrip />

      <Section tone="mist">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="FAQ" heading="Questions farmers ask before taking the next step" />
          <FaqAccordion items={landingFaqs} />
        </Container>
      </Section>

      <Section id="property-analysis">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Free Property Analysis"
              heading="See whether solar may make sense for your farm"
              body="Share a few details and Good Idea Solar will review the property context. There is no cost to evaluate your property, and this is not a calculator or revenue estimate."
            />
          </div>
          <PropertyAnalysisForm />
        </Container>
      </Section>
    </main>
  );
}
