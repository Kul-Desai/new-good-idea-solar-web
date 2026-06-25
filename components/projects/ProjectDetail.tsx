import Image from "next/image";
import { CalendarCheck, Leaf, MapPin, Sprout } from "lucide-react";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import type { Project } from "@/content/projects";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const remainingAcres = project.partnerAcres - project.solarAcres;
  const timeline = ["Site Identified", "Feasibility Review", "Development Underway", "Long-Term Operations"];

  return (
    <>
      <section className="bg-mist">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              {project.status}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">{project.name}</h1>
            <p className="mt-5 flex items-center gap-2 text-lg text-charcoal/75">
              <MapPin aria-hidden="true" className="size-5 text-brand-green" /> {project.city}, {project.state}
            </p>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft">
              <Image
                alt={`Representative image for ${project.name}; site photography coming soon.`}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                src={project.images[0]}
              />
            </div>
            <figcaption className="mt-3 text-sm text-charcoal/65">
              Representative image. Site photography coming soon.
            </figcaption>
          </figure>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Capacity" value={project.capacityLabel} />
            <StatCard label="Partner Farmland" value={`${project.partnerAcres} Acres`} />
            <StatCard label="Solar Footprint" value={`${project.solarAcres} Acres`} />
            <StatCard label="Agricultural Use" value={project.agUse} />
          </div>
        </Container>
      </Section>
      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="About the Project" heading={project.demonstrates} body={project.description} />
          </div>
          <div className="grid gap-5">
            <div className="rounded-lg bg-white p-6 shadow-soft">
              <Sprout aria-hidden="true" className="mb-4 size-8 text-brand-green" />
              <h2 className="font-heading text-2xl font-medium text-ink">Farm Impact</h2>
              <p className="mt-3 leading-7 text-charcoal/75">
                {project.partnerAcres} partner acres, {project.solarAcres} solar acres, and approximately {remainingAcres} acres
                remaining available for agricultural use around the project.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-soft">
              <Leaf aria-hidden="true" className="mb-4 size-8 text-brand-green" />
              <h2 className="font-heading text-2xl font-medium text-ink">Community Impact</h2>
              <p className="mt-3 leading-7 text-charcoal/75">
                The project supports local renewable energy while keeping the public story centered on farms, communities,
                and responsible development.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader eyebrow="Development Timeline" heading="A responsible path from evaluation to operations" />
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {timeline.map((step, index) => (
              <li className="rounded-lg border border-charcoal/10 bg-white p-5 shadow-soft" key={step}>
                <CalendarCheck aria-hidden="true" className="mb-4 size-7 text-brand-green" />
                <p className="font-heading text-sm font-semibold text-brand-blue">Step {index + 1}</p>
                <h3 className="mt-2 font-heading text-xl font-medium text-ink">{step}</h3>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <CtaBand
        body="Interested in exploring whether solar is a good fit for your property?"
        primaryHref="/partner-your-land"
        primaryLabel="Discuss Your Property"
        secondaryHref="/projects"
        secondaryLabel="View All Projects"
        heading="Let's talk about your land."
      />
    </>
  );
}
