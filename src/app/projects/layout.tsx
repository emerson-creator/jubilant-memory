import type { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pt-32 xl:px-12">
      {children}
    </main>
  );
}
