import type { ReactNode } from "react";
import { site } from "@/data/site";

function IconLink({
  href,
  label,
  external = true,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex size-14 items-center justify-center border-b border-r border-border text-foreground/80 transition-colors hover:bg-accent-soft hover:text-accent sm:size-16"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section className="relative">
      <div className="wrap flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center py-24 text-center">
        <div className="label flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-foreground/90">
          <span className="size-2 rounded-full bg-success" />
          Open to full-time roles
          <span className="text-subtle">/ Remote · Colombia · UTC-5</span>
        </div>

        <h1 className="display mt-10 text-balance text-[clamp(3.25rem,10vw,9rem)]">
          Emerson Albornoz
        </h1>

        <p className="display-light mt-4 text-[clamp(1.75rem,4vw,3.25rem)] text-accent-warm">
          Software Engineer
        </p>

        <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          I&apos;m Emerson, a fullstack developer focused on backend and cloud.
          I design event-driven systems and run them myself: a hardened VPS,
          CI/CD with automatic rollback, and monitoring in production.
        </p>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          NestJS · Python · RabbitMQ · Postgres · Docker · CI/CD
        </p>

        <nav
          aria-label="Links"
          className="mt-14 flex border-l border-t border-border"
        >
          <IconLink href="#projects" label="See the projects" external={false}>
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </IconLink>

          <IconLink href={site.github} label="GitHub">
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </IconLink>

          <IconLink href={site.linkedin} label="LinkedIn">
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </IconLink>

          <IconLink href={site.resume} label="Résumé" external={true}>
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M9 13h6M9 17h6" />
            </svg>
          </IconLink>
        </nav>
      </div>
    </section>
  );
}
