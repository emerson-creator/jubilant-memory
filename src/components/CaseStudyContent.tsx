import type { ReactNode } from "react";
import ArchitectureImage from "@/components/ArchitectureImage";
import type { CaseStudy } from "@/data/case-studies";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Technical decisions" },
  { id: "production", label: "Production" },
  { id: "scope", label: "What's included" },
  { id: "tradeoffs", label: "Trade-offs" },
];

/** Pinta la última palabra del título con el color de acento. */
function AccentTitle({ text }: { text: string }) {
  const words = text.split(" ");
  const last = words.pop();

  return (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="text-accent-warm">{last}</span>
    </>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-border pt-10 first:border-t-0 first:pt-0 sm:pt-14"
    >
      <p className="label text-foreground/90">
        <span className="text-accent">{number}</span> /{" "}
        {sections.find((s) => s.id === id)?.label}
      </p>
      <h2
        id={`${id}-heading`}
        className="display-light mb-10 mt-5 text-4xl sm:mb-12 sm:text-5xl"
      >
        <AccentTitle text={title} />
      </h2>

      {children}
    </section>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="border-l-2 border-accent bg-accent-soft py-5 pl-5 pr-5 sm:pl-6">
      <p className="label text-accent-strong">{title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/80">
        {children}
      </p>
    </aside>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-accent">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Mobile index: horizontal pills, sticky under the site header.
 * Hidden from `lg` and up, where the desktop index takes over.
 */
function SectionNavigationMobile() {
  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 z-40 -mx-4 mb-8 border-y border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden"
    >
      <ul className="flex gap-2 overflow-x-auto">
        {sections.map((section, index) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <span className="text-accent-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Desktop index: lives in the left column of the grid and follows the scroll
 * thanks to `sticky`. It must be a direct child of the grid column (no
 * ancestor with overflow hidden/auto/clip) for sticky to work.
 */
function SectionNavigationDesktop() {
  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="label mb-5 text-foreground/90">On this page</p>

      <ol className="space-y-1 border-l border-border">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group -ml-px flex items-start gap-3 border-l border-transparent py-2 pl-3 text-xs leading-5 text-muted transition-colors hover:border-accent hover:text-foreground xl:pl-4 xl:text-sm"
            >
              <span className="font-mono text-[10px] text-subtle transition-colors group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.label}</span>
            </a>
          </li>
        ))}
      </ol>

      <a
        href="#case-study-top"
        className="label mt-8 inline-flex items-center gap-2 text-subtle transition-colors hover:text-accent"
      >
        <span aria-hidden="true">↑</span>
        Back to top
      </a>
    </nav>
  );
}

export default function CaseStudyContent({ study }: { study: CaseStudy }) {
  const { deployment } = study;

  return (
    <div id="case-study-top" className="scroll-mt-24">
      <SectionNavigationMobile />

      <div className="grid min-w-0 gap-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-16">
        {/* Desktop table of contents */}
        <div className="hidden lg:block">
          <SectionNavigationDesktop />
        </div>

        {/* Main reading column */}
        <div className="min-w-0 space-y-16 sm:space-y-24">
          <Section id="overview" number="01" title="What it is">
            {/* Facts: celdas pegadas con bordes compartidos */}
            <dl className="grid border-l border-t border-border sm:grid-cols-2 xl:grid-cols-3">
              {study.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="min-w-0 border-b border-r border-border p-5"
                >
                  <dt className="label text-subtle">{fact.label}</dt>
                  <dd className="mt-3 break-words text-sm font-medium leading-6">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 max-w-3xl space-y-5 text-base leading-7 text-foreground/80">
              {study.overview.map((paragraph, index) => (
                <p key={`${index}-${paragraph}`}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <Callout title="The hard part">{study.challenge}</Callout>
            </div>

            <dl className="mt-12 grid grid-cols-2 border-l border-t border-border sm:grid-cols-4">
              {study.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 border-b border-r border-border p-5 sm:p-6"
                >
                  <dt className="display-light break-words text-4xl tabular-nums text-accent-warm sm:text-5xl">
                    {stat.value}
                  </dt>
                  <dd className="label mt-4 leading-5 text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="architecture" number="02" title="How it fits together">
            <p className="mb-8 max-w-2xl text-base leading-7 text-muted">
              A look at the system architecture and how its components work
              together.
            </p>

            <div className="space-y-10">
              {study.diagrams.map((diagram) => (
                <figure
                  key={diagram.alt}
                  className="min-w-0 border border-border bg-surface/60 p-2 sm:p-3"
                >
                  <ArchitectureImage {...diagram} />
                </figure>
              ))}
            </div>
          </Section>

          <Section id="decisions" number="03" title="Key technical decisions">
            <div className="divide-y divide-border border-y border-border">
              {study.decisions.map((decision, index) => (
                <article
                  key={decision.title}
                  className="grid gap-4 py-7 transition-colors hover:bg-accent-soft sm:py-9 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8 md:px-4 xl:gap-12"
                >
                  <div className="flex items-start gap-4">
                    <span className="label mt-1 text-accent-strong">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-medium leading-7 tracking-tight">
                      {decision.title}
                    </h3>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm leading-7 text-muted">
                      {decision.body}
                    </p>

                    {decision.instead && (
                      <div className="mt-5 border-l border-accent/60 pl-4">
                        <p className="label text-subtle">
                          Alternative considered
                        </p>
                        <p className="mt-2 text-sm leading-6 text-foreground/70">
                          {decision.instead}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="production"
            number="04"
            title="How it runs in production"
          >
            <p className="max-w-3xl text-base leading-7 text-muted">
              {deployment.intro}
            </p>

            <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-12">
              <div className="min-w-0">
                <h3 className="label text-foreground/90">Deploy pipeline</h3>

                <ol className="mt-7">
                  {deployment.pipeline.map((step, index) => (
                    <li
                      key={step.step}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {index < deployment.pipeline.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-[11px] top-6 w-px bg-border"
                        />
                      )}

                      <span className="relative z-10 flex size-[23px] shrink-0 items-center justify-center border border-accent/60 bg-background font-mono text-[10px] text-accent-strong">
                        {index + 1}
                      </span>

                      <div className="min-w-0 pt-0.5">
                        <p className="text-sm font-medium leading-5">
                          {step.step}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8">
                  <Callout title="When a deploy fails">
                    {deployment.rollback}
                  </Callout>
                </div>
              </div>

              <div className="grid content-start border-l border-t border-border sm:grid-cols-2">
                {deployment.groups.map((group) => (
                  <div
                    key={group.title}
                    className="min-w-0 border-b border-r border-border p-6"
                  >
                    <h3 className="label text-accent-strong">{group.title}</h3>
                    <BulletList items={group.items} />
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="scope" number="05" title="What's included">
            <div className="grid border-l border-t border-border sm:grid-cols-2">
              {study.scope.map((group, index) => (
                <div
                  key={group.title}
                  className="min-w-0 border-b border-r border-border p-6 transition-colors hover:bg-accent-soft sm:p-8"
                >
                  <p className="label text-subtle">
                    Group{" "}
                    <span className="text-accent-strong">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </p>
                  <h3 className="display-light mt-4 text-2xl sm:text-3xl">
                    {group.title}
                  </h3>
                  <BulletList items={group.items} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="tradeoffs" number="06" title="Trade-offs and next steps">
            <div className="border-l border-t border-border">
              {study.tradeoffs.map((tradeoff, index) => (
                <article key={tradeoff.issue} className="grid md:grid-cols-2">
                  <div className="border-b border-r border-border p-6 sm:p-8">
                    <p className="label mb-3 text-subtle">
                      Constraint{" "}
                      <span className="text-accent-strong">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <p className="text-sm leading-7 text-muted">
                      {tradeoff.issue}
                    </p>
                  </div>

                  <div className="border-b border-r border-border bg-accent-soft/50 p-6 sm:p-8">
                    <p className="label mb-3 text-accent-strong">Next step</p>
                    <p className="text-sm leading-7 text-foreground/90">
                      {tradeoff.next}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <div className="border-t border-border pt-6">
            <a
              href="#case-study-top"
              className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
            >
              <span aria-hidden="true">↑</span>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
