"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 70,
  delay = 400,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      const t = setTimeout(() => setCount(text.length), 0);
      return () => clearTimeout(t);
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        <span className="ml-0.5 inline-block w-2 animate-pulse bg-accent">
          &nbsp;
        </span>
      </span>
    </>
  );
}
