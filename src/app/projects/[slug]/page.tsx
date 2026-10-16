import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import CaseStudyContent from "@/components/CaseStudyContent";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((project) => project.slug === slug);

  if (!project) notFound();

  const study = caseStudies[slug];

  return (
    <article className="mx-auto w-full max-w-[1500px]">
      {/* Hero */}
      <header className="grid gap-10 pb-24 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)] lg:items-center lg:gap-16 xl:gap-24">
        <div className="min-w-0">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            All projects
          </Link>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle sm:text-xs">
            Selected project / Engineering case study
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-7xl xl:text-[6.5rem]">
            {project.title}
          </h1>
        </div>

        <div className="min-w-0 lg:pt-16">
          <p className="max-w-xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {project.tagline}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-2 font-mono text-[10px] text-muted transition-colors hover:border-foreground/30 hover:text-foreground sm:text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-6 text-sm">
            {project.repos?.map((repo) => (
              <a
                key={repo.href}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
              >
                {repo.label}
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            ))}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
              >
                Live site
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Case study */}
      <div className="border-t border-border pt-12 sm:pt-16">
        {study ? (
          <CaseStudyContent study={study} />
        ) : (
          <p className="py-12 text-sm text-muted">Case study coming soon.</p>
        )}
      </div>
    </article>
  );
}
