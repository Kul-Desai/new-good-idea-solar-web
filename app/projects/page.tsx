import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsMap } from "@/components/projects/ProjectsMap";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import { projects } from "@/content/projects";
import { stats } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Explore Good Idea Solar projects in Maryland and Tennessee, including agrivoltaics, public-sector partnerships, and farm-community collaboration.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main id="main">
      <Section tone="mist">
        <Container>
          <div className="max-w-4xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Projects
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Current projects across Maryland and Tennessee
            </h1>
            <p className="mt-6 text-xl leading-9 text-charcoal/80">
              Our launch portfolio shows how responsible solar development can support farms, public partners, and local
              communities without replacing the larger agricultural story.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <ProjectsMap />
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader eyebrow="Project Portfolio" heading="Four projects in development" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} priority={index < 2} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Portfolio Proof"
            heading="A focused pipeline with a small solar footprint"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard featured={index === 3} key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        body="Interested in exploring whether solar is a good fit for your property?"
        heading="Discuss your property with Good Idea Solar."
        primaryHref="/partner-your-land"
        primaryLabel="Discuss Your Property"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </main>
  );
}
