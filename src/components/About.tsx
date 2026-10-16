import Reveal from "@/components/ui/Reveal";
import { about } from "@/data/about";

export default function About() {
  return (
    <section id="about" className="scroll-mt-14">
      <div className="wrap py-12 sm:py-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          About
        </h2>

        <div className="mt-8 grid gap-12 md:grid-cols-5">
          <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/85 md:col-span-3">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <dl className="divide-y divide-border border-y border-border">
              {about.stack.map((group) => (
                <div
                  key={group.area}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5"
                >
                  <dt className="font-mono text-xs text-subtle">
                    {group.area}
                  </dt>
                  <dd className="font-mono text-xs leading-6 text-foreground/80">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
