"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function Footer() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <footer>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 font-mono text-xs text-muted">
        <span>
          © {year ?? ""} {site.name}
        </span>
      </div>
    </footer>
  );
}
