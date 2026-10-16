import { site } from "@/data/site";

const links = [
  { label: "GitHub", href: site.github, external: true },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "Résumé", href: site.resume, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-14">
      <div className="wrap py-16 sm:py-24">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Contact
        </h2>

        <p className="mt-8 max-w-xl text-xl leading-snug sm:text-2xl">
          Open to software engineering opportunities.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block break-all text-2xl font-semibold tracking-tight underline decoration-accent underline-offset-8 transition-colors hover:text-accent sm:text-4xl"
        >
          {site.email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="text-muted transition-colors hover:text-foreground"
              >
                {link.label} {link.external ? "↗" : "↓"}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
