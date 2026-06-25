import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Image
          alt={`Representative image for ${project.name}; site photography coming soon.`}
          className="object-cover"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={project.images[0]}
        />
        <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-charcoal">
          Representative image
        </span>
      </div>
      <div className="p-6">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-green">
          {project.city}, {project.state}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-medium text-ink">{project.name}</h3>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-charcoal/60">Capacity</dt>
            <dd className="font-heading font-medium text-brand-blue">{project.capacityLabel}</dd>
          </div>
          <div>
            <dt className="text-charcoal/60">Status</dt>
            <dd className="font-heading font-medium text-brand-blue">{project.status}</dd>
          </div>
        </dl>
        <Link
          className="mt-6 inline-flex items-center gap-2 rounded-md font-heading font-medium text-brand-blue hover:text-brand-green focus-visible:outline-focus"
          href={`/projects/${project.slug}`}
        >
          View Project <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </Card>
  );
}
