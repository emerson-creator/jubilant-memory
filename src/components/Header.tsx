import Link from "next/link";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-14 w-fit max-w-full items-center justify-between gap-6 rounded-full border border-white/[0.09] bg-[#101112]/90 px-3 shadow-lg shadow-black/10 backdrop-blur-xl sm:gap-8 sm:px-4">
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden transition-colors hover:text-foreground sm:block"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#contact"
            className="rounded-full border border-white/15 px-3.5 py-2 font-mono text-[11px] text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-background sm:px-4"
          >
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
