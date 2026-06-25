import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Handshake, Leaf, Sprout, SunMedium, Tractor } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { IconFeature } from "@/components/ui/IconFeature";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import { featuredProjects } from "@/content/projects";
import { processSteps, stats } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Farmer-First Solar Development",
  description:
    "Good Idea Solar partners with family farms to create long-term income while preserving productive farmland and strengthening communities.",
});

const trustItems = [
  "Family Farm Roots",
  "Community-Focused Development",
  "Long-Term Partnerships",
  "Renewable Energy Expertise",
];

const whyUs = [
  {
    icon: Tractor,
    title: "Farmer First",
    body: "We build projects that support farms and landowners, and we share revenue rather than offering a flat lease.",
  },
  {
    icon: Sprout,
    title: "Long-Term Thinking",
    body: "We focus on lasting partnerships and sustainable outcomes for the land, the family, and the community.",
  },
  {
    icon: Handshake,
    title: "Community Focused",
    body: "We believe local communities should benefit from local energy and responsible development.",
  },
  {
    icon: BadgeCheck,
    title: "Proven Development",
    body: "We source land and develop projects in-house, combining agricultural understanding with solar development expertise.",
  },
];

export default function Home() {
  return (
    <main id="main">
      <section className="bg-mist">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Built by Farmers for Farmers
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Solar for the Farm, Not the Farm for Solar
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-charcoal/80">
              Good Idea Solar partners with family farms to create long-term income through solar development while
              preserving productive farmland and strengthening local communities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects" size="lg">
                View Our Projects
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg shadow-soft">
            <Image
              alt="Sheep grazing on productive farmland with solar panels integrated into the landscape."
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/images/JSG_Sheep1.jpeg"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-heading text-xl font-semibold text-brand-blue">Built by Farmers for Farmers</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => (
                <li className="flex items-center gap-2 text-charcoal/75" key={item}>
                  <Leaf aria-hidden="true" className="size-5 text-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section tone="mist">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="By The Numbers"
            heading="A focused pipeline that keeps most partner farmland in agriculture"
            body="These figures come from the four active launch projects and show the difference between partner farmland and the smaller solar footprint."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard featured={index === 0} key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              heading="Built by Farmers for Farmers"
              body="Good Idea Solar began with a family farm. After watching a working farm struggle to stay profitable, we discovered that using a small portion of the land for solar could create stable, long-term income while preserving the rest for agriculture. What started as a solution for one family farm became a mission to help others."
            />
            <Button className="mt-8" href="/about" variant="secondary">
              Learn Our Story
            </Button>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-soft">
            <Image alt="Crops growing on a working farm." className="object-cover" fill sizes="(min-width: 1024px) 48vw, 100vw" src="/images/JSG_Crops2.jpeg" />
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Card>
            <SectionHeader
              eyebrow="The Problem"
              heading="Family Farms Need New Revenue Streams"
              body="Being a small farmer is harder than ever. Between volatile crop and commodity prices, unpredictable weather, and rising costs, the average small family farm operates at a loss even though small family farms own most of the country's farmland. Families want an alternative that lets them keep farming and keep their land."
            />
          </Card>
          <Card>
            <SectionHeader
              eyebrow="Our Solution"
              heading="A Different Approach to Solar Development"
              body='We work alongside farmers to convert a small portion of their land to solar, keeping most of the farm in agriculture and sharing the revenue the solar produces. It is a way for a farm to "harvest the sun": a new, stable, long-term source of income, at no cost to the farmer, while delivering clean, locally generated energy to the surrounding community.'
            />
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Why Good Idea Solar"
            heading="A farmer-first partner with development expertise"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <IconFeature body={item.body} icon={item.icon} key={item.title} title={item.title} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Featured Projects" heading="Proof that solar and agriculture can work together" />
            <Link className="rounded-md font-heading font-medium text-brand-blue hover:text-brand-green focus-visible:outline-focus" href="/projects">
              View All Projects
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Meet the Team" heading="Experienced people with a shared farm-first mission" />
          <div className="mt-8">
            <TeamGrid preview />
          </div>
          <Button className="mt-8" href="/about" variant="secondary">
            Learn More About Our Team
          </Button>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader align="center" eyebrow="How We Help" heading="Productive farmland comes first" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {processSteps.slice(0, 3).map((step) => (
              <Card key={step.title}>
                <SunMedium aria-hidden="true" className="mb-4 size-8 text-brand-green" />
                <h3 className="font-heading text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 leading-7 text-charcoal/75">{step.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <TrustStrip />
      <CtaBand
        body="Whether you are a farmer, landowner, or community partner, we would be happy to start a practical conversation."
        heading="Let's start the conversation."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/partner-your-land"
        secondaryLabel="Get a Free Property Analysis"
      />
    </main>
  );
}
