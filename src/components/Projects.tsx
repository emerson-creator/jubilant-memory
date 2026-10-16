import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

const MAX_TECH = 6;

export default function Projects() {
  const visible = projects.filter((p) => !p.draft);

  return (
    <section className="scroll-mt-16">
      <div id="projects" className="wrap py-24 sm:py-32">
        <p className="label text-foreground/90">
          <span className="text-accent">01</span> / Selected work
        </p>

        <div className="mt-20 grid border-l border-t border-border md:grid-cols-2">
          {visible.map((project, i) => {
            const extra = project.stack.length - MAX_TECH;
            const caseStudy = `/projects/${project.slug}`;

            return (
              <Reveal key={project.slug} delay={i * 0.06} className="h-full">
                <article className="group flex h-full flex-col border-b border-r border-border p-6 transition-colors duration-300 hover:bg-accent-soft sm:p-8">
                  {/* Etiqueta superior */}
                  <div className="label flex items-center gap-4 text-muted">
                    <span className="text-accent-strong">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{project.stack.slice(0, 2).join(" / ")}</span>
                    {project.live && (
                      <span className="ml-auto flex items-center gap-1.5 text-foreground">
                        <span className="size-1.5 rounded-full bg-success" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Vista previa */}
                  <Link
                    href={caseStudy}
                    aria-label={`Read the ${project.title} case study`}
                    className="relative mt-8 block aspect-[16/10] overflow-hidden border border-border bg-background"
                  >
                    {project.video ? (
                      <video
                        src={project.video}
                        poster={project.image?.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : project.image ? (
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        width={1280}
                        height={800}
                        unoptimized
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-mono text-xs text-muted">
                        Preview coming soon
                      </div>
                    )}
                  </Link>

                  {/* Contenido */}
                  <div className="mt-8 flex flex-1 flex-col">
                    <h3 className="display-light text-3xl sm:text-4xl">
                      <Link
                        href={caseStudy}
                        className="transition-colors hover:text-accent-strong"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-muted">
                      {project.tagline}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-sm leading-6 text-foreground/80"
                        >
                          <span aria-hidden="true" className="text-accent">
                            —
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-7 flex flex-wrap items-center gap-1.5 border-t border-border pt-5">
                      {project.stack.slice(0, MAX_TECH).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-foreground/90"
                        >
                          {tech}
                        </li>
                      ))}
                      {extra > 0 && (
                        <li className="px-1 py-1 font-mono text-[11px] text-subtle">
                          +{extra}
                        </li>
                      )}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
                      <Link
                        href={caseStudy}
                        className="font-medium underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
                      >
                        Case study
                      </Link>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted transition-colors hover:text-foreground"
                        >
                          Live demo ↗
                        </a>
                      )}

                      {project.repos?.map((repo) => (
                        <a
                          key={repo.href}
                          href={repo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted transition-colors hover:text-foreground"
                        >
                          {repo.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
