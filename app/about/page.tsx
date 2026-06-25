import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, HeartHandshake, ShieldCheck } from "lucide-react";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { IconFeature } from "@/components/ui/IconFeature";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutFaqs } from "@/content/faqs";
import { processSteps } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn how Good Idea Solar began with a family farm and became a mission to help farms stay productive and economically viable.",
  path: "/about",
});

const timeline = [
  { year: "2013", body: "Justin inherits the family farm in rural Maryland." },
  { year: "2020", body: "After years of losses, the family decides to convert a portion to solar." },
  { year: "2021", body: "Neighbors hear about the idea and ask Good Idea Solar to help them too." },
  { year: "2022", body: "Good Idea Solar is founded." },
  { year: "2023", body: "First projects move ahead, including a signed 20-year power agreement in Tennessee." },
  { year: "Today", body: "Four projects are in development across Tennessee and Maryland." },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Service",
    body: "We exist to help farmers, landowners, and communities succeed.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    body: "We build lasting relationships through honesty, transparency, and follow-through.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    body: "We believe the best outcomes happen when everyone succeeds.",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <Section tone="mist">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              About Us
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Good Idea Solar was founded on a simple idea: solar should be another crop to support the farm.
            </h1>
            <div className="mt-6 space-y-5 text-lg leading-8 text-charcoal/80">
              <p>
                Our story began when founder Justin Aydelotte inherited his family&apos;s farm and faced a challenge familiar
                to many landowners: the farm was still actively farming but was operating at a loss. We realized we had
                to do something different in order to keep the family farm profitable.
              </p>
              <p>
                As we explored our options, we discovered that using a small portion of the farm for solar could create
                stable, long-term income while preserving the rest of the land for agriculture. What started as a
                solution for one family farm became a mission to help others.
              </p>
              <p>
                Today, Good Idea Solar partners with farmers and landowners to develop solar projects that create new
                sources of revenue while supporting local communities and expanding access to clean, locally generated
                energy. We believe successful projects are built on trust, transparency, and long-term partnerships.
              </p>
              <p>
                Our team brings together expertise in agriculture, engineering, community engagement, finance, and
                renewable energy development. While our backgrounds are diverse, we share a common goal: helping farms
                remain productive, profitable, and positioned for the future.
              </p>
            </div>
          </div>
          <div className="relative min-h-[440px] overflow-hidden rounded-lg shadow-soft">
            <Image alt="Working farmland with crops and solar integrated into the landscape." className="object-cover" fill priority sizes="(min-width: 1024px) 42vw, 100vw" src="/images/JSG_Crops1.jpeg" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Our Story Timeline" heading="From one family farm to a farmer-first mission" />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {timeline.map((item) => (
              <li className="rounded-lg border border-charcoal/10 bg-white p-6 shadow-soft" key={item.year}>
                <p className="font-heading text-2xl font-bold text-brand-blue">{item.year}</p>
                <p className="mt-3 leading-7 text-charcoal/75">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader align="center" eyebrow="Our Values" heading="Service, trust, and partnership guide every project" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <IconFeature body={value.body} icon={value.icon} key={value.title} title={value.title} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="How It Works" heading="A practical process for responsible development" />
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

      <Section tone="blue">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Why We're Different"
            heading="We partner with farmers instead of treating land like a transaction"
            body="Traditional developers often focus on acquiring land rights and maximizing project economics. Good Idea Solar focuses on preserving farms, creating long-term partnerships, and generating sustainable income for farming families."
            inverse
          />
          <Card>
            <ul className="space-y-4 leading-7 text-charcoal/80">
              <li>Local relationships within the communities we serve.</li>
              <li>Revenue share instead of only a flat lease.</li>
              <li>Landowner clarity from a team that sources land and develops projects in-house.</li>
              <li>A farmer-first philosophy: the farm wins, the community wins, and Good Idea Solar succeeds as a result.</li>
            </ul>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Meet the Team" heading="A team built around agriculture, development, and service" />
          <div className="mt-8">
            <TeamGrid />
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader eyebrow="FAQ" heading="Common questions from farmers and landowners" />
            <Button className="mt-8" href="/contact">
              Talk With Our Team
            </Button>
          </div>
          <FaqAccordion items={aboutFaqs} />
        </Container>
      </Section>

      <CtaBand
        body="We would be happy to walk through your questions and discuss whether solar makes sense for your farm."
        heading="Talk with a farmer-first development team."
        primaryHref="/contact"
        primaryLabel="Talk With Our Team"
        secondaryHref="/partner-your-land"
        secondaryLabel="Get a Free Property Analysis"
      />
    </main>
  );
}
