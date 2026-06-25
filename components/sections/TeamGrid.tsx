import { Card } from "@/components/ui/Card";
import { team, teamIntro } from "@/content/team";

type TeamGridProps = {
  preview?: boolean;
};

export function TeamGrid({ preview = false }: TeamGridProps) {
  const members = preview ? team.slice(0, 3) : team;

  return (
    <div>
      <p className="max-w-3xl text-lg leading-8 text-charcoal/75">{teamIntro}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {members.map((member) => (
          <Card className="text-center" key={member.name}>
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-blue font-heading text-xl font-semibold text-white">
              {member.initials}
            </div>
            <h3 className="mt-5 font-heading text-xl font-medium text-ink">{member.name}</h3>
            <p className="mt-2 text-sm leading-6 text-charcoal/70">{member.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
