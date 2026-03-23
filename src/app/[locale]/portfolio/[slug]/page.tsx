import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { ProjectNav } from "@/components/portfolio/ProjectNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <div className="relative z-10 min-h-screen pb-20">
      <CaseStudy project={project} />
      <div className="mx-auto max-w-5xl px-6">
        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
}
